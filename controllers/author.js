var authorModel = require('../model/author');

// var getAuthors = function(req, res, next){
// 	res.send('From controllers');
// }

// exports.getAuthors = getAuthors;
  
exports.getAuthors = (req, res, next) => {
	// var listOfAuthors = authorModel.getAuthorList();
	
	res.send('Yahooo the controllrer is now workign.. Cool Syed. asdfhasjf <br>' + listOfAuthors);
	console.log('live from controller.. ')
}