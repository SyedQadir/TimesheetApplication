/* app.js */

// require and instantiate express
var express = require('express')
const app = require('express')()
const fileUpload = require('express-fileupload');
var session = require('express-session');

var db = require('./db');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
app.use(express.static(__dirname));

util = require('util');
app.use(fileUpload());


var index = require('./routes/index');

bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs 
app.set('view engine', 'ejs')
app.use( express.static( "public" ) );

// app.use(session({secret: 'ssshhhhh'}));
app.use(session({
  cookie : {
    maxAge : 40 * 60 * 1000
  },
  secret: '007'
}));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (!module.parent) {
  app.listen(8080, function() {
    console.log(`app is listening at http://localhost:8080`);
  });
}

module.exports = app;


console.log('listening on port 8080')