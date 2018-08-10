var connection = require('../db');
var model = require('../model/record');
var records = {

	addHours: function(requestData, userid){
		

		var date = records.generateDate(requestData.logging_date);
		var query = "INSERT INTO hours(userid, logging_date, task_id, task_description, project_id, hours)"+
		 "values("+userid+",'"+date+"',"+requestData.task_id+",'"+requestData.task_description +"',"+requestData.project_id+","+requestData.hours+")";

		 

		if(requestData.isUpdate){
			console.log('Update is defind');
		}
		return new Promise(function(resolve, reject){
			connection.connection.query(query,function(err, result){
				if(err){
					reject(err);
				}

				resolve(result);
			});
		});

	},

	generateDate: function(date){

		var splitDate = date.split(",");
		var dd = splitDate[0];
		var monthYearSplit = splitDate[1].trim().split(' ');
		var finalDate = monthYearSplit[1]+'-'+records.getMonth(monthYearSplit[0])+'-'+dd;
		return finalDate;
		// console.log(finalDate);
	},

	getMonth: function(val){
		switch(val){
			case 'Jan': return '01';
				break;
			case 'Feb': return '02';
				break;
			case 'Mar': return '03';
				break;
			case 'Apr': return '04';
				break;
			case 'May': return '05';
				break;
			case 'Jun': return '06';
				break;
			case 'Jul': return '07';
				break;
			case 'Aug': return '08';
				break;

		}
	}, 

	getHours: function(date, userid){
		var date = records.generateDate(date);
		console.log('date ===='+date);


		var query = "SELECT hours.*, projects.name as project_name, task.taskname as taskname FROM hours INNER JOIN task ON task.id=hours.task_id INNER JOIN projects on projects.id=hours.project_id WHERE logging_date='"+date+"' and userid=" + userid;
		console.log(query);

		return new Promise(function(resolve, reject){
			connection.connection.query(query,function(err, result){
				if(err){
					reject(err);
				} 
				var resultList = []; 
				for(var i=0; i < result.length; i++){
					resultList.push(new model.recordModel(result[i]));
				}
				resolve(resultList);
			});
		});
	}


}

exports.records = records; 