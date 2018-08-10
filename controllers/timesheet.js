// var timeSheetModel = require('model/timesheet');
var userModel = require('../model/users');
var taskModel = require('../model/task');
var hoursModel = require('../model/hours');
var promise = require('promise');


exports.loadCalendar = (req, res, next) => {

	var params = req.query;
	sess = req.session;
	
	var request = req;
	var response = res;

	userModel.records.getProjectsByUserId(1).then(function(result){
		if(result){
			taskModel.tasks.getAllTask().then(function(tasks){
				console.log('-------------- ');
				console.log(tasks);		
				console.log(result);
				if(params.loadFullPage == undefined){
					res.render('main', {
						'title': 'Timesheet',
						'task': tasks,
						'projects': result,
						'id': sess.userid

					});
				}else{
					res.send('Ajax operation');	
				}
			})
			 
		}
		
	}).catch(function(err){
		console.log(err);
		res.send('<p> Something went wrong </p>');
	});


}

exports.addHours = (req, res, next) => {
	var requestData = req.body;
	
	hoursModel.records.addHours(requestData, req.session.userid).then(function(result){
		res.send('successfully added');
	}).catch(function(err){
		res.send('Error while adding hours. '+ err)
		// throw(err);
	});

}

exports.getHours = (req, res, next) => {
	var requestData = req.query;
	sess = req.session; 
	var response = res;
	// TODO: 1 is user id  below.. Need to replace this. 
	hoursModel.records.getHours(requestData.date, sess.userid).then(function(result){
		
		response.render('timesheet/loggedhours', {
			'hours': result
		});
	}).catch(function(err){
		res.send('Invalid user. Please login. ');
	});
}