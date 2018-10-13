var express = require('express');
var router = express.Router();

var appointment_controller = require('../controllers/appointmentController');
var login_controller = require('../controllers/loginController');

// routes //

//GET appointment home page
router.get('/', login_controller.ensureAuthenticated, appointment_controller.index);

//GET request for bookings
router.get('/bookings', login_controller.ensureAuthenticated, appointment_controller.bookings_get);

//POST request for bookings
router.post('/bookings', login_controller.ensureAuthenticated, appointment_controller.bookings_post);

//GET request for appointment creation
router.get('/create', login_controller.ensureAuthenticated, appointment_controller.appointment_create_get);

//POST request for appointment creation
router.post('/create', login_controller.ensureAuthenticated, appointment_controller.appointment_create_post);

//GET request for appointment deletion
router.get('/cancel', login_controller.ensureAuthenticated, appointment_controller.appointment_cancel_get);

//POST request for appointment deletion
router.post('/cancel', login_controller.ensureAuthenticated, appointment_controller.appointment_cancel_post);

router.get('/times/:id', login_controller.ensureAuthenticated, appointment_controller.appointment_times_get);

router.post('/times/:id', login_controller.ensureAuthenticated, appointment_controller.appointment_times_post);

//POST request for existing appointments
router.post('/bookings/:id', login_controller.ensureAuthenticated, appointment_controller.existing_appointments_post);

//POST request for deleting an appointment
router.post('/delete', login_controller.ensureAuthenticated, appointment_controller.delete_appointment_post);

//POST request for editing an appointment
router.post('/edit', login_controller.ensureAuthenticated, appointment_controller.edit_appointment_post);

//POST request for updating an appointment
router.post('/update', login_controller.ensureAuthenticated, appointment_controller.update_appointment_post);

//POST request to return specific appointment for formatting
router.post('/amendFormat', login_controller.ensureAuthenticated, appointment_controller.amend_appointment_format_post);


module.exports = router;
