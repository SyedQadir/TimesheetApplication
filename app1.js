'use strict';

/* app.js */

// require and instantiate express
var express = require('express')
// const app = require('express')()
const fileUpload = require('express-fileupload');
// var session = require('express-session');

var db = require('./db');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
const index = require('./routes/index');

class Server {

  constructor(){
    this.app = require('express')();
    this.session = require('express-session');
    this.bodyParser = require('body-parser');
  }

  appConfig(){
      this.app.use(express.static(__dirname));
      this.app.use( express.static( "public" ) );

      // set the view engine to ejs 
      this.app.set('view engine', 'ejs')
      // app.use(session({secret: 'ssshhhhh'}));
      this.app.use(this.session({
        cookie : {
          maxAge : 40 * 60 * 1000
        },
        secret: '007'
      }));
      this.app.use(fileUpload());
      this.app.use(this.bodyParser.json());
      this.app.use(this.bodyParser.urlencoded({extended: true}));
      
      new index(this.app).route();
      
      
      // catch 404 and forward to error handler
      this.app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });
      
      // error handler
      this.app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
      
  }

  start(){
      if (!module.parent) {
        this.app.listen(8080, function() {
          console.log(`app is listening at http://localhost:8080`);
        });
      }
  }

}

const server = new Server();
server.appConfig();
server.start();

