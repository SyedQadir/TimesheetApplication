var connection = require('../db');
var records = {

	getRecordsById: function(id){

		console.log('Fetching the resord with id - ' + id);

			return new Promise(function(resolve, reject){
				connection.connection.query('SELECT *FROM users where id=1',function(err, result){
					if(err){
						reject(err);
					}

					resolve(result);
				});
			});
		
	},

	returnSomething: function(){
		try{
			console.log('before Fetching');
			return new Promise(
        function (resolve, reject) {
            
            resolve('result');
            
            // reject('error');
        });
			connection.connection.query('SELECT *FROM projects where id=1',function(err, result){

				if(err){
					// console.log('returning errrr');
					// callback(1, null);
				}
				console.log('now returning');
				return result;
				// callback(false, result);

			});
		}catch(ex){
			console.log('Exception ');
			console.log(ex);
		}
	},


	
}

exports.records = records;

