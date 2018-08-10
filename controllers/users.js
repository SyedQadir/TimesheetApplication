var userModel = require('../model/users');

exports.getAll = (req, res, next) => {
	var rec = userModel.records.getAllRecords(function(err, result){
		if(err) 
			res.render('error', {});

		res.render('naya', {
			'rec': result
		});
		
	});
}


exports.create = (req, res, next) => {
	res.render('createUser', {
		'title' : 'Create new user'
	});
}

exports.createUser = (req, res, next) => {
	userModel.records.createUser
}


exports.getProjectsByUserId = (req, res, next) => {
	var response = res;
	sess = req.session;
	//TODO replace the user id below. 
	userModel.records.getProjectsByUserId(sess.userid).then(function(result){
		if(result){
			response.render('projects/activeprojects', {'model':result});
		}
	}).catch(function(err){
		response.send('<p> Something went wrong </p>');
	});

	
}