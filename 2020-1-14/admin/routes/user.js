const express = require('express'),
	route = express.Router(),
	jwt = require('jsonwebtoken'),
	secret = '小脾气';

const {
	handleMD5,
	success,
	getDepartInfo,
	getJobInfo,
	getUserInfo
} = require('../utils/tools');

const {
	writeFile
} = require('../utils/promiseFS');

//=>用户登录
route.post('/login', (req, res) => {
	let {
		account = '',
		password = ''
	} = req.body || {};

	// console.log('珠峰培训')

	password = handleMD5(password);

	const item = req.$userDATA.find(item => {
		return (item.name === account || item.email === account || item.phone === account) && item.password === password;
	});

	if (item) {
		const token = jwt.sign({
			name:item.name,
			jobId:item.jobId,
			id:item.id,
			departmentId:item.departmentId
		},secret,{expiresIn: 60*60});

		res.send(success(true, {
			power:{
				jobId:item.jobId,  //工号
				name:item.name, //名字
				sex:item.sex,  //性别
				departmentId:item.departmentId //权限
			},
			token
		}));


		return;
	}
	res.send(success(false, {
		codeText: 'user name password mismatch!'
	}));
});

//=>检测是否登录
route.get('/login', (req, res) => {
	// const userID = req.session.userID;
	const {authorization} = req.headers;
	jwt.verify(authorization, secret,(err,data)=>{
		if(err){
			res.send(success(false, {
				codeText: 'current user is not logged in!'
			}));
		}
		res.json({
			code:0,
			token:jwt.sign({
				name:data.name,
				jobId:data.jobId,
				id:data.id,
				departmentId:data.departmentId
			},secret,{expiresIn: 60*60})
		});
		return;
	});

	
});

//=>退出登录
route.get('/signout', (req, res) => {
	// req.session.userID = null;
	// req.session.power = null;
	res.send(success(true));
});

//=>获取用户通讯录
route.get('/list', (req, res) => {
	let data = req.$userDATA;
	// console.log(data,222);
	let {
		departmentId = 0,
		search = ''
	} = req.query;
	if (parseFloat(departmentId) !== 0) {
		data = data.filter(item => {
			return parseFloat(item.departmentId) === parseFloat(departmentId);
		});
	}
	if (search !== '') {
		data = data.filter(item => {
			return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search);
		});
	}
	data = data.map(item => {
		return {
			id: item.id,
			name: item.name,
			sex: item.sex,
			email: item.email,
			phone: item.phone,
			departmentId: item.departmentId,
			department: getDepartInfo(item.departmentId, req).name,
			jobId: item.jobId,
			job: getJobInfo(item.jobId, req).name,
			desc: item.desc
		}
	});
	if (data.length > 0) {
		res.send(success(true, {
			data: data
		}));
		return;
	}
	res.send(success(false, {
		codeText: 'no matching data was found!'
	}));
});



//=>获取用户详细信息
route.get('/info', async (req, res) => {
	let {
		userId = 0
	} = req.query;
	const {authorization} = req.headers;
	//如果不传获取当前用户信息
	if (parseFloat(userId) === 0) {
		try {
			userId = await jwt.verify(authorization, secret).id;
		} catch (error) {
			res.send(success(false, {
				codeText: 'no matching data was found!'
			}));
		}
	}
	let data = getUserInfo(userId, req);
	if ('name' in data) {
		res.send(success(true, {
			data: {
				id: data.id,
				name: data.name,
				sex: data.sex,
				email: data.email,
				phone: data.phone,
				departmentId: data.departmentId,
				department: getDepartInfo(data.departmentId, req).name,
				jobId: data.jobId,
				job: getJobInfo(data.jobId, req).name,
				desc: data.desc
			}
		}));
		return;
	}
	res.send(success(false, {
		codeText: 'no matching data was found!'
	}));
});

//=>增加用户信息
route.post('/add', (req, res) => {
	let $userDATA = req.$userDATA,
		passDATA = null;
	passDATA = Object.assign({
		id: $userDATA.length === 0 ? 1 : (parseFloat($userDATA[$userDATA.length - 1]['id']) + 1),
		name: '',
		password: handleMD5('e807f1fcf82d132f9bb018ca6738a19f'),
		sex: 0,
		email: '',
		phone: '',
		departmentId: 1,
		jobId: 1,
		desc: '',
		time: new Date().getTime(),
		state: 0
	}, (req.body || {}));
	$userDATA.push(passDATA);

	writeFile('./json/user.json', $userDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>修改用户信息
route.post('/update', (req, res) => {
	req.body = req.body || {};
	let $userDATA = req.$userDATA,
		userId = req.body.userId,
		flag = false;
	delete req.body.userId;
	$userDATA = $userDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(userId)) {
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
	writeFile('./json/user.json', $userDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>删除用户信息
route.get('/delete', (req, res) => {
	let $userDATA = req.$userDATA,
		flag = false;
	let {
		userId = 0
	} = req.query;
	$userDATA = $userDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(userId)) {
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
	writeFile('./json/user.json', $userDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>修改（重置）用户密码
route.post('/resetpassword', (req, res) => {
	let $userDATA = req.$userDATA;
	let {
		userId = 0,
			password
	} = req.body;
	if (parseFloat(userId) === 0) {
		//=>修改登录者的密码
		userId = req.session.userID;
		password = handleMD5(password);
	} else {
		password = handleMD5('e807f1fcf82d132f9bb018ca6738a19f');
	}
	$userDATA = $userDATA.map(item => {
		if (parseFloat(item.id) === parseFloat(userId)) {
			return {
				...item,
				password: password
			};
		}
		return item;
	});
	writeFile('./json/user.json', $userDATA).then(() => {
		res.send(success(true));
	}).catch(() => {
		res.send(success(false));
	});
});

//=>获取用户权限
/*
	userhandle:员工管理(一套)
	departhandle:部门管理(一套)
	jobhandle:职位管理(一套)

	allcustomer:可以获取所有客户，也都可以新增
	departcustomer:可以获取部门客户，也都可以新增
	resetpassword:修改密码
*/
route.get('/power', (req, res) => {
	// console.log('power')
	const powerList = {
		'1':'userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword',
		'2':'userhandle|departhandle|jobhandle|departcustomer|resetpassword',
		'3':'userhandle|departhandle',
		'4':'departcustomer',
		'5':'userhandle',
		'6':''
	}
	const {authorization} = req.headers;
	jwt.verify(authorization, secret,(err,data)=>{
		if(err){
			res.json({
				code:1,
				msg:'重新登录'
			});
		}
		const createObj = powerList[data.departmentId].split('|');
		
		let pList = [];

		createObj.forEach(ele=>{
			if(ele === 'userhandle'){
				pList.push({
					name:'员工管理',
					id:1,
					children:[{
						name:'员工列表',
						id:'1-1',
						path:'/userhandle/list'
					}]
				})
				if(data.departmentId <= 3){
					pList[0].children.push({
						name:'新增员工',
						id:'1-2',
						path:'/userhandle/add'
					})
				}
			}
			if(ele === 'departhandle'){
				pList.push({
					name:'部门管理',
					id:2,
					children:[
						{
							name:'部门列表',
							id:'2-1',
							path:'/departhandle/list'
						},
					]
				});

				if(data.departmentId <= 3){
					pList[1].children.push({
						name:'新增部门',
						id:'2-2',
						path:'/departhandle/add'
					})
				}
			}
			if(ele === 'jobhandle'){
				pList.push({
					name:'职务管理',
					id:3,
					children:[
						{
							name:'职务列表',
							id:'3-1',
							path:'/jobhandle/list'
						}
					]
				})
				console.log(data.departmentId,33333)
				if(data.departmentId <= 3){
					pList[2].children.push({
						name:'新增职务',
						id:'3-2',
						path:'/jobhandle/add'
					})
				}
			}
		})

		res.send(success(true, {
			code:0,
			pList:pList
		}));
	})
	
});

module.exports = route;