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

	password = handleMD5(password);

	const item = req.$userDATA.find(item => {
		return (item.name === account || item.email === account || item.phone === account) && item.password === password;
	});

	if (item) {
		const power = req.$jobDATA.find(key=>key.id == item.jobId);

		const token = jwt.sign({
			name:item.name,
			jobId:item.jobId,
			id:item.id,
			power:power.power,
			departmentId:item.departmentId
		},secret,{expiresIn: 60*60});

		res.send(success(true, {
			power:{
				power:power.power, //权限
				jobId:item.jobId,  //级别
				name:item.name, //名字
				sex:item.sex,  //性别
				departmentId:item.departmentId //部门
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
			return;
		}

		// console.log(data,'看看name')

		res.json({
			code:0,
			power:{
				name:data.name,
				jobId:data.jobId,
				id:data.id,
				power:data.power,
				departmentId:data.departmentId
			},
			token:jwt.sign({
				name:data.name,
				jobId:data.jobId,
				id:data.id,
				power:data.power,
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
	let len = data.length;
	// console.log(data,222);
	let {
		departmentId = 0,
		search = '',
		pagenum = 0,
		count = 5
	} = req.query;

	let pageData = [];
	console.log('从'+pagenum*count+'到'+((pagenum*1+1)*count))
	for(let i=pagenum*count;i<(pagenum*1+1)*count;i++){
		if(data[i]){
			pageData.push(data[i]);
		}
	}

	// console.log(pageData,'看看数据')

	// data = data.slice(pagenum*count,(pagenum+1)*count);
	data = pageData;
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
			data: data,
			total:len
		}));
		return;
	}else{
		res.send(success(true, {
			data: [],
			total:len
		}));
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
/*
	session


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
*/
route.post('/resetpassword', async(req, res) => {
	const {authorization} = req.headers;
	let $userDATA = req.$userDATA;
	let {
		userId = 0,
		password
	} = req.body;
	// if (parseFloat(userId) === 0) {
	// 	//=>修改登录者的密码
	// 	userId = await jwt.verify(authorization, secret).id;
	// 	password = handleMD5(password);
	// } else {
	password = handleMD5(password);
	// }
	//如果用户没有传userId，那么就说明参数错误
	if(userId === 0){
		res.json({
			code:4,
			msg:'参数错误'
		});
		return;
	}

	//拿到管理员权限
	const userPowerId = await jwt.verify(authorization, secret).id;
	const user = $userDATA.find(item=>item.id*1 === userPowerId*1);//管理员
	
	//只有总裁办的管理员 和 后勤部的经理才能重置别人的密码
	if(user.departmentId*1 === 1 && user.jobId*1 === 1 || user.departmentId*1 === 4 && user.jobId*1 === 6){
			//如果有权限修改，那么找到要修改密码的用户
			const user2 = $userDATA.find(item=>item.id*1 === userId*1);
			if(user2.password == password){
				res.json({
					code:1,
					msg:'不能使用原密码'
				});
			}else{
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
					res.send(success(true,{code:0,msg:'修改成功'}));
				}).catch(() => {
					res.send(success(false));
				});
		}
	}else{
		res.json({
			code:2,
			msg:'权限不够!'
		});
	}
	
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

		// console.log(power,'看看权限')

		let pList = [
			{
				name:'员工管理',
				id:1,
				children:[{
					name:'员工列表',
					id:'1-1',
					path:'/userhandle/list'
				}]
			},
			{
				name:'部门管理',
				id:2,
				children:[
					{
						name:'部门列表',
						id:'2-1',
						path:'/departhandle/list'
					},
				]
			}
		];
		
		//只要带userhandle就有新增员工
		if(power.includes('userhandle')){
			pList[0].children.push({
				name:'新增员工',
				id:'1-2',
				path:'/userhandle/add'
			})
		}

		//只要带departhandle就有新增部门
		if(power.includes('departhandle')){
			pList[1].children.push({
				name:'新增部门',
				id:'2-2',
				path:'/departhandle/add'
			})
		}

		//只要带jobhandle就能添加职务
		if(power.includes('jobhandle')){
			pList.push({
				name:'职务管理',
				id:3,
				children:[
					{
						name:'职务列表',
						id:'3-1',
						path:'/jobhandle/list'
					},
					{
						name:'新增职务',
						id:'3-2',
						path:'/jobhandle/add'
					}
				]
			});
		}
	
		res.send(success(true, {
			code:0,
			pList:pList
		}));
	})
	
});

module.exports = route;