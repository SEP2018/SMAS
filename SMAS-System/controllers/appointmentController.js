const Appointment = require('../models/appointment')
    , Staff = require('../models/staff')
    , Service = require('../models/service');
// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display home page
exports.index = function(req, res) {
    res.send('To be implemented');
};

//week 11 test
// Display Appointment creation form on GET
exports.appointment_create_get = function(req, res){
    var allStaff = Staff.getAllStaff();
    allStaff.then( async function() {
        allStaff = await allStaff;
        for (var i = 0; i < allStaff.length; i++) {
            console.log("Staff:");
            console.log(allStaff[i].lastName);
            res.render('createAppointment', { title: 'Create an Appointment', allStaff: allStaff });
        }
    });
};

//Loads bookings page
exports.bookings_get = function(req, res) {
    //if(currentUser == null)
    //    res.redirect('/../users/login');
    //else {
        res.render('bookings', {title: 'Manage Bookings'});
    //}
};

//POST request for bookings page
exports.bookings_post = function(req, res) {
    res.render('bookings', {title: 'Manage Bookings'})
};


exports.appointment_times_get = function(req, res) {
    res.send("To be implemented");
};

exports.appointment_times_post = function(req, res) {
    if(req.body.doctor != '0') {
        var allTimes = Appointment.getAvailabilityByStaffAndDayForService(req.body.service, req.body.doctor, req.body.date);
        allTimes.then(async function () {
            allTimes = await allTimes;
            res.send(allTimes);
        })
    }
    else
    {
        var allTimes = Appointment.getAvailabilityByDayForService(req.body.service, req.body.date);
        allTimes.then( async function () {
            allTimes = await allTimes;
            res.send(allTimes);
        })
    }
};

exports.existing_appointments_post = function(req, res) {
    var allAppointments = Appointment.findAppointmentsByStudent(req.body.id);
    allAppointments.then( async function() {
        allAppointments = await allAppointments;
        var allServices = Service.getAllServices();
        allServices.then( async function() {
            allServices = await allServices;
            var allStaff = Staff.getAllStaff();
            allStaff.then( async function() {
                allStaff = await allStaff;
                for (var i = 0, len = allAppointments.length; i < len; i++) {
                    allAppointments[i].dataValues.serviceTitle = allServices[allAppointments[i].dataValues.serviceID - 1].dataValues.title;
                    allAppointments[i].dataValues.duration = allServices[allAppointments[i].dataValues.serviceID - 1].dataValues.duration;
                    allAppointments[i].dataValues.staffName = allStaff[parseInt(allAppointments[i].dataValues.staffID.toString().substr(0, 1)) - 1].dataValues.lastName;
                }
                res.send(allAppointments);
            });
        });
    });
};

exports.delete_appointment_post = function(req, res) {
    Appointment.cancelAppointment(req.body.id);
    res.send(true);
};

exports.edit_appointment_post = function(req, res) {
    res.send(true);
};

exports.update_appointment_post = function(req, res) {
    var appointment = Appointment.findAppointmentByID(req.body.appointmentID);
    appointment.then( async function() {
        appointment = await appointment;
        var service = Service.findServiceByID(appointment[0].dataValues.serviceID);
        service.then( async function() {
            service = await service;
            var endTime = new Date(new Date(req.body.time).getTime() + service[0].dataValues.duration*60000);
            Appointment.updateAppointment(req.body.appointmentID, req.body.date, req.body.time, endTime);
            res.send(true);
        });
    });
};

exports.amend_appointment_format_post = function(req, res) {
    var appointment = Appointment.findAppointmentByID(req.body.appointmentID);
    appointment.then( async function() {
        appointment = await appointment;
        res.send(appointment);
    });
};

// Handle Appointment creation form on POST
exports.appointment_create_post = [
     //Field Validation
    body('student_id').isLength({ min: 8, max: 8 }).trim().withMessage('Enter valid Student ID'),
    body('description').isLength({ max: 200 }).trim().withMessage('Description must be specified'),
    body('time').optional().isISO8601(),
    body('appointTime').trim(),
    body('selectedStaff').trim(),

        // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('description').trim().escape(),

        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.render('createAppointment', { title: 'Create an Appointment', errors: errors.array() });
                return;
            }
            else {
                Appointment.makeAppointment(req.body.description, req.body.student_id, req.body.selectedStaff, req.body.time, req.body.appointTime);
                res.render('createAppointmentSuccess', {title: 'Success!', studentid: req.body.student_id, date: req.body.time});
            }
        }
];

// Display Appointment deletion form on GET
exports.appointment_cancel_get = function(req, res){
    res.render('cancelAppointment', { title: 'Cancel an Appointment', appointments: []});
};

// Handle Appointment deletion on POST
exports.appointment_cancel_post = [
    //Field Validation
    body('student_id').isLength({ min: 8, max: 8 }).trim().withMessage('Enter valid Student ID'),
    // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('cancelAppointment', { title: 'Cancel an Appointment', errors: errors.array() });
            return;
        }
        else if(req.body.button === 'find') {
            var appointmentsResults = Appointment.findAppointmentsByStudent(req.body.student_id);
            appointmentsResults.then(async function () {
                appointmentsResults = await appointmentsResults;
            });
            res.render('cancelAppointment', {title: 'Cancel an Appointment', appointments: appointmentsResults})
        }
        else if(req.body.button === 'cancel') {
            Appointment.cancelAppointment(req.body.row_id);
            res.render('cancelAppointment', {title: 'Cancel an Appointment', appointments: []})
        }
    }
];