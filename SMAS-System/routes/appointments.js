var express = require('express');
var router = express.Router();

var appointment_controller = require('../controllers/appointmentController');

// routes //

//GET appointment home page
router.get('/', appointment_controller.index);

//GET request for bookings
router.get('/bookings', appointment_controller.bookings_get);

//POST request for bookings
router.post('/bookings', appointment_controller.bookings_post);

//GET request for appointment creation
router.get('/create', appointment_controller.appointment_create_get);

//POST request for appointment creation
router.post('/create', appointment_controller.appointment_create_post);

//GET request for appointment deletion
router.get('/cancel', appointment_controller.appointment_cancel_get);

//POST request for appointment deletion
router.post('/cancel', appointment_controller.appointment_cancel_post);

router.get('/times/:id', appointment_controller.appointment_times_get);

router.post('/times/:id', appointment_controller.appointment_times_post);

//POST request for existing appointments
router.post('/bookings/:id', appointment_controller.existing_appointments_post);

//POST request for deleting an appointment
router.post('/delete', appointment_controller.delete_appointment_post);

//POST request for editing an appointment
router.post('/edit', appointment_controller.edit_appointment_post);


module.exports = router;
