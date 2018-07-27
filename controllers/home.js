projectModel = require('../model/projects');
userModel = require('../model/users');
var rest = require('rest');

exports.home = (req, res, next ) => {

	// var s = res;
	// var re = projectModel.records.getRecordsById(1).then(function(res){
		
	// }).catch(error => {
	// 	console.log(error);
	// })
	console.log('Home calling. ');
	var sess = req.session
	console.log(req.session);
	console.log('---------- Just cookie -                  --------');
	console.log(req.session.username);
	if(sess.userid && sess.email) {
		try{
			res.render('main',{
				'title': 'Home'
			});
		}catch(e){
			console.log(e);
		}
	}
	else {
	    res.writeHead(302, {
			"Location": "/login"
		});
		res.end();
	}
	

}

exports.viewLoginPage = (req, res, next) => {
	sess = req.session;
	
	if(sess.userid && sess.email){
		res.writeHead(302, {
			'Location': '/'
		});
		res.end();
	}else{
		res.render('login',{});
	}
}


exports.verifyLogin = (req, res, next) => {
	sess = req.session;
	userModel.records.verifyLogin(req.body).then(function(result){
		sess.email = result.email;
		sess.userid = result.id;
		res.writeHead(302, {
			"Location": "/"
		});
		res.end();
	}).catch(function(err){
		console.log('Error while Verifying login hours. '+ err)
		res.writeHead(302, {
			"Location": "/login"
		});
		res.end();
	});

}

exports.logout = (req, res, next) => {
	console.log('log out tri');
	req.session.destroy();
	res.writeHead(302, {
		"Location": "/login"
	});
	res.end();

}