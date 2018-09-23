var express = require('express');
var router = express.Router();

var doctors_controller = require('../controllers/doctorsController');
var services_controller = require('../controllers/servicesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Medical Appointment System' });
});

//GET request for doctors
router.get('/doctors', doctors_controller.doctors_get);

//POST request for doctors
router.post('/doctors', doctors_controller.doctors_post);

//GET request for services
router.get('/services', services_controller.services_get);

//POST request for serivces
router.post('/services', services_controller.services_post);

module.exports = router;
