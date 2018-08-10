
var express = require('express');
var router = express.Router();
// var sessionHandler = require('mid');
// All controllers are defined below
var author = require('../controllers/author');
var users = require('../controllers/users');
var projects = require('../controllers/projects');
var homeController = require('../controllers/home');
var timesheetController = require('../controllers/timesheet');
var webServices = require('../webservices/webservices');

// router.use(sessionHandler.sessionExists);
class Routingfunction{

	constructor(app){
		this.app = app;
	}

	route(){
		this.app.get('/', homeController.home);

		/*task list*/
		this.app.get('/author', author.getAuthors);

		// /* User calls */
		this.app.get('/users', users.getAll);
		this.app.get('/users/create', users.create);
		this.app.get('/users/:id', users.getProjectsByUserId);

		// // Calendar operations goes here. 
		this.app.get('/timesheet', timesheetController.loadCalendar);

		this.app.post('/hours', timesheetController.addHours);
		this.app.get('/hours', timesheetController.getHours);

		this.app.get('/login', homeController.viewLoginPage);
		this.app.post('/login', homeController.verifyLogin);   

		this.app.post('/logout', homeController.logout);
		this.app.get('/logout', homeController.logout);
		
		
		// For rest Webservices
		this.app.get('/rest/users/:id', webServices.getProjectsByUserId);
	}

}

module.exports = Routingfunction;