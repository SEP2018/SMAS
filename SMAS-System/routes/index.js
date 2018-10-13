var express = require('express');
var router = express.Router();

var doctors_controller = require('../controllers/doctorsController');
var services_controller = require('../controllers/servicesController');
var index_controller = require('../controllers/indexController');
var login_controller = require('../controllers/loginController');

/* GET home page. */
router.get('/', login_controller.ensureAuthenticatedStudent, index_controller.index);

//POST home page
router.post('/', login_controller.ensureAuthenticatedStudent, index_controller.home_post);

//GET request for doctors
router.get('/doctors', login_controller.ensureAuthenticatedStudent, doctors_controller.doctors_get);

//POST request for doctors
router.post('/doctors', login_controller.ensureAuthenticatedStudent, doctors_controller.doctors_post);

//GET request for services
router.get('/services', login_controller.ensureAuthenticatedStudent, services_controller.services_get);

//POST request for serivces
router.post('/services', login_controller.ensureAuthenticatedStudent, services_controller.services_post);

module.exports = router;
