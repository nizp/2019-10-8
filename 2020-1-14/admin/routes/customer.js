const express = require('express'),
	route = express.Router(),
	jwt = require('jsonwebtoken'),
	secret = '小脾气';

const {
	success,
	getUserInfo,
	getCustomerInfo
} = require('../utils/tools');

const {
	writeFile
} = require('../utils/promiseFS');

//=>增加客户信息
route.post('/add', (req, res) => {
	let $customerDATA = req.$customerDATA,
		passDATA = null;
	passDATA = Object.assign({
		id: $customerDATA.length === 0 ? 1 : (parseFloat($customerDATA[$customerDATA.length - 1]['id']) + 1),
		name: '',
		sex: 0,
		email: '',
		phone: '',
		QQ: '',
		weixin: '',
		type: '重点客户',
		address: "北京市昌平区回龙观东大街03号东",
		userId: req.session.userID,
		departmentId: getUserInfo(req.session.userID, req).departmentId,
		time: new Date().getTime(),
		state: 0
	}, (req.body || {}));
	$customerDATA.push(passDATA);

	writeFile('./json/customer.json', $customerDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>修改客户信息
route.post('/update', (req, res) => {
	req.body = req.body || {};
	let $customerDATA = req.$customerDATA,
		customerId = req.body.customerId,
		flag = false;
	delete req.body.customerId;
	$customerDATA = $customerDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(customerId)) {
			flag = true;
			return {
				...item,
				...req.body
			};
		}
		return item;
	});
	if (!flag) {
		res.send(success(false));
		return;
	}
	writeFile('./json/customer.json', $customerDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>删除客户信息
route.get('/delete', (req, res) => {
	let $customerDATA = req.$customerDATA,
		flag = false;
	let {
		customerId = 0
	} = req.query;
	$customerDATA = $customerDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(customerId)) {
			flag = true;
			return {
				...item,
				state: 1
			};
		}
		return item;
	});
	if (!flag) {
		res.send(success(false));
		return;
	}
	writeFile('./json/customer.json', $customerDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>获取客户详细信息
route.get('/info', (req, res) => {
	let {
		customerId = 0
	} = req.query;
	let data = getCustomerInfo(customerId, req);
	if ('name' in data) {
		res.send(success(true, {
			data: {
				id: data.id,
				name: data.name,
				sex: data.sex,
				email: data.email,
				phone: data.phone,
				QQ: data.QQ,
				weixin: data.weixin,
				type: data.type,
				address: data.address,
				userId: data.userId,
				userName: getUserInfo(data.userId, req).name
			}
		}));
		return;
	}
	res.send(success(false, {
		codeText: 'no matching data was found!'
	}));
});



route.get('/power', (req, res) => {

	const powerList = {
		'1':'userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword',
		'6':'userhandle|departhandle|jobhandle|departcustomer|resetpassword',
		'3':'',
		'4':'departcustomer',
		'7':'userhandle',
		'5':'',
		'2':'departcustomer'
	}
	const {authorization} = req.headers;
	jwt.verify(authorization, secret,(err,data)=>{
		if(err){
			res.json({
				code:1,
				msg:'重新登录'
			});
		}
		const power = powerList[data.jobId];

		let pList = [
			{
				name:'客户管理',
				id:1,
				children:[
					{
						name:'我的客户',
						id:'1-1',
						path:'/customer/list/my'
					},
					{
						name:'新增客户',
						id:'1-2',
						path:'/add/customer'
					}
				]
			}
		];

		let flag = false;

		if(power.includes('allcustomer') || power.includes('departcustomer')){
			pList[0].children.unshift({
				name:'全部客户',
				id:'1-0',
				path:'/customer/list/all'
			})
			flag = true;
		}


		//如果没有权限进行客户管理，那么pList就是一个空的
		if(!flag){
			pList.length = 0;
		}
		
	
		res.send(success(true, {
			flag,
			code:0,
			pList:pList
		}));
	})
	
});


/*
	/customer/list
		type
		search
		lx -> all || my
		limit = 10,
		page = 1

*/

//=>获取客户列表信息
route.get('/list', (req, res) => {
	let data = req.$customerDATA;
	//=>筛选处理
	let {
			type = '',
			search = '',
			lx = 'all'
	} = req.query;
	if (search !== '') {
		data = data.filter(item => {
			return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search) || item.QQ.includes(search) || item.weixin.includes(search);
		});
	}
	if (type !== '') {
		data = data.filter(item => {
			return item.type === type;
		});
	}
	//=>权限校验
	const {authorization} = req.headers;
	jwt.verify(authorization, secret,(err,data2)=>{
		let power = data2.power,
		userID = data2.id;

		if (lx === 'my') {
			data = data.filter(item => {
				return parseFloat(item.userId) === parseFloat(userID);
			});
		} else {
			if (!power.includes('departcustomer') && !power.includes('allcustomer')) {
				data = data.filter(item => {
					return parseFloat(item.userId) === parseFloat(userID);
				});
			} else if (power.includes('departcustomer') && !power.includes('allcustomer')) {
				data = data.filter(item => {
					return parseFloat(item.departmentId) === parseFloat(getUserInfo(userID, req).departmentId);
				});
			}
		}

		console.log(data,lx,1111)


		//=>分页处理
		let {
			limit = 10,
			page = 1
		} = req.query;
		let totalPage = Math.ceil(data.length / limit),
			total = data.length,
			result = [];
		if (page <= totalPage) {
			for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
				let item = data[i];
				if (!item) break;
				result.push({
					id: item.id,
					name: item.name,
					sex: item.sex,
					email: item.email,
					phone: item.phone,
					QQ: item.QQ,
					weixin: item.weixin,
					type: item.type,
					address: item.address,
					userId: item.userId,
					userName: getUserInfo(item.userId, req).name
				});
			}
		}
		if (result.length > 0) {
			res.send(success(true, {
				page: page,
				limit: limit,
				total: total,
				totalPage: totalPage,
				data: result
			}));
			return;
		}
		res.send(success(false, {
			codeText: 'no matching data was found!'
		}));
	})
	
});

module.exports = route;