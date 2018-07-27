
var express = require('express');
var router = express.Router();
// var sessionHandler = require('mid');
// All controllers are defined below
var author = require('../controllers/author');
var users = require('../controllers/users');
var projects = require('../controllers/projects');
var homeController = require('../controllers/home');
var timesheetController = require('../controllers/timesheet');


// router.use(sessionHandler.sessionExists);



/*task list*/
router.get('/author', author.getAuthors);

/* User calls */
router.get('/users', users.getAll);
router.get('/users/create', users.create);
router.get('/users/:id', users.getProjectsByUserId);

//  Home Call
router.get('/', homeController.home);

// Calendar operations goes here. 
router.get('/timesheet', timesheetController.loadCalendar);


router.post('/hours', timesheetController.addHours);
router.get('/hours', timesheetController.getHours);


router.get('/login', homeController.viewLoginPage);
router.post('/login', homeController.verifyLogin);   

router.post('/logout', homeController.logout);
router.get('/logout', homeController.logout);

module.exports = router; 