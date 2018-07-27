var connection = require('../db');
var model = require('../model/record');
var records = {

	getBillableTask: function(){

	},

	getNonBillableTask: function(){

	},

	getAllTask: function(){
		var query = 'SELECT * FROM task order by tasktype';
		return new Promise(function(resolve, reject){

			connection.connection.query(query,function(err, result){
				if(err)
					reject(err);
			
				var resultList = []; 
				for(var i=0; i < result.length; i++){
					resultList.push(new model.recordModel(result[i]));
				}
				resolve(resultList);
			});
		});
	}
}

exports.tasks = records; 