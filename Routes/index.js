var express = require('express');
//路由
var router = express.Router();

router.get('/', function(req, res){
	res.send('hello 51code');
});

router.get('/login', function(req, res){
	//res.send('route page');
	//渲染视图
	res.render('login');
});

router.post('/login', function(req, res){
	// res.send(req.body.username);
	var session = req.session;
	//第N次登陆
	if (session.uniqueId) {
		//交由专门方法处理
		res.redirect('/redirects');
	} else {
		////第一次登陆
		session.uniqueId = req.body.username;
		//交由专门方法处理
		res.redirect('/redirects');
	}
});

router.get('/redirects', function(req, res) {
	// res.send('我是操作重定向的方法');
	var session = req.session;
	if (session.uniqueId == 'admin') {
		res.redirect('/home');
	} else {
		// res.redirect('login');
		res.send('登录出错, <a href="login"> 重新登录</a>');
	}
})

router.get('/home', function(req, res){

	var session = req.session;
	if (session.uniqueId == 'admin') {
		//展示HTML文件
		res.render('home');
		// res.send('我是首页, , <a href="loginout"> 退出登录</a>');
	} else {
		// res.redirect('login');
		res.send('登录出错, <a href="login"> 重新登录</a>');
	}
})


router.get('/loginout', function(req, res){
//销毁session
	req.session.destroy();
	res.redirect('/login');
})




//公开接口
module.exports = router;