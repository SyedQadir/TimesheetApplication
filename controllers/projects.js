var userModel = require('../model/users');
var proejctModel = require('../model/projects');
var db = require('../db');
exports.getAll = (req, res, next) => {
	var rec = userModel.records.getAllRecords(function(err, result){
		if(err) 
			res.render('error', {});

		res.render('naya', {
			'rec': result
		});
		
	});
}

exports.getProjectsByUserId = (req, res, next) => {
	
	// proejctModel.records.getProjectsByUserId()
	console.log('now in project controller from ajax');
	res.render('naya', {});
	return ' returngin gfrom user id '; 
	// console.log('coming to controller = Project');
	// return 'Syed';
	// res.send('This data is from controller');
}
