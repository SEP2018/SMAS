var express = require('express');
var router = express.Router();

var appointment_controller = require('../controllers/appointmentController');

// routes //

//GET appointment home page
router.get('/', appointment_controller.index)

//GET request for appointment creation
router.get('/create', appointment_controller.appointment_create_get);

//POST request for appointment creation
router.post('/create', appointment_controller.appointment_create_post);

//GET request for appointment deletion
router.get('/cancel', appointment_controller.appointment_cancel_get);

//POST request for appointment deletion
router.post('/cancel', appointment_controller.appointment_cancel_post);


module.exports = router;
