
require('../db');
var model = require('../model/record');

var mysql = require('mysql');
var Promise = require('promise');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
})

var records = {
	getAllRecords: function(callback){
		connection.query("SELECT * FROM users",function(err, result){
			if(err)
				callback(1, null)

			callback(false, result);
		});
	},

	createUser: function(req, res, callback){
		console.log('----------------------Printing request ======================');
		console.log(req);
	},

	getProjectsByUserId: function(id){
		
		var selectQuery = 'select *from projects where id IN(SELECT projectid from userprojects where userid=' +id + ')';
		
		// var selectQuery = 'SELECT projects.id as projectId, projects.name as projectName, description, users.* FROM users INNER JOIN projects ON users.projects=projects.id WHERE users.id='+ id;
		return new Promise(function(resolve, reject){
			connection.query(selectQuery,function(err, result){
				if(err)
					reject(err);
				
				var resultList = []; 
				for(var i=0; i < result.length; i++){
					resultList.push(new model.recordModel(result[i]));
				}
				resolve(resultList);
			});
		});
	}, 


	verifyLogin: function(requestData){
		console.log('In user Model =--------------------');
		console.log(requestData.username);
		var selectQuery = "SELECT id FROM users where email='"+requestData.username +"'"; // + "and password="+ requestData.password ;
		console.log(selectQuery);
		return new Promise(function(resolve, reject){
			connection.query(selectQuery, function(err, result){
				if(err)
					reject(err);

				resolve({"id": result[0].id, 'email': requestData.username});
			});
		});
	}
	// getUserProjects: function(id){
	// 	console.log('somethign ');
	// 	var query = 'select *from projects where id IN(SELECT projectid from userprojects where userid=' +id + ')';
	// 	return new Promise(function(resolve, reject){
	// 		connection.query(query,function(err, result){
	// 			if(err)
	// 				reject(err);
				
	// 			var resultList = []; 
	// 			for(var i=0; i < result.length; i++){
	// 				resultList.push(new recordModel(result[i]));
	// 			}
	// 			resolve(resultList);
	// 		});
	// 	});
	// }


}


exports.records = records;

// exports.getAlls = (req, res, next, cb) => {
	
// 	connection.query('SELECT * FROM users', function (err, result) {
// 		console.log(' ------------- get all ----------------');
// 		var response = [];
// 		if(result.length){
// 	    	for(var i = 0; i<result.length; i++ ){     
//             	response.push(response[i]);
// 	        }
// 	     }
// 		   console.log("Inside npm");
// 		   console.log(response);
// 		   return response;

// 		return result;
  //   	if (err) throw err;
  //   	console.log('Prsah');
  //   	console.log(result);
  		// cb(res, result);
		// return result;
//   	});
  	
// }


exports.getByUserId = (req, res, next) => {

}

exports.delete = (req, res, next) => {

}

exports.update = (req, res, next) => {
	
}
