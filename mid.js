
var sessionExists = function (req, res, next) {
	console.log('Session handler function called');
  	var sess = req.session;
  	if(sess.userid && sess.email){
		next();
	}else{
		res.render('login',{});
	} 
}
