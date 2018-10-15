const Appointment = require('../models/appointment')
    , Staff = require('../models/staff')
    , Service = require('../models/service')
    , ServiceProvider = require('../models/serviceProvider');
// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.bookings_get = function(req, res) {
    var allService = Service.getAllServices();
    allService.then(async function () {
        allService = await allService;
        res.render('bookings', {title: 'Manage Bookings', username: req.user[0].username, allService: allService, username: req.user[0].username, type: req.user[0].type});
    });
};

//POST request for bookings page
exports.bookings_post = [
    //Field Validation
    body('description').isLength({ max: 200 }).trim().withMessage('Description must be specified'),
    body('time').isISO8601(),
    body('appointTime').trim(),
    body('selectedStaff').trim(),
    body('selectedService').trim(),

    // Field sanitisation
    sanitizeBody('description').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            var allService = Service.getAllServices();
            allService.then(async function() {
                allService = await allService;
                res.render('bookings', {title: 'Manage Bookings', username: req.user[0].username, allService: allService, successful: successful, username: req.user[0].username, type: req.user[0].type, errors: errors.array() });
            });
        }
        else {
            //popups
            var successful = true;

            //get end time of appointment
            var endTime = Service.getEndTime(req.body.selectedService, req.body.appointTime);
            endTime.then(async function () {
                endTime = await endTime;

                // get doctor if any doctor selected
                if(req.body.selectedStaff == '0') {
                    var doctors = Appointment.getAvailableStaffByServiceAndDayAndTime(req.body.selectedService, req.body.time, req.body.appointTime);
                    doctors.then(async function () {
                        doctors = await doctors;
                        var make = Appointment.makeAppointment(req.body.description, req.user[0].username, doctors[0].staffid, req.body.appointTime, endTime[0].endTime, req.body.time, req.body.selectedService);
                        make.then(async function() {
                            var allService = Service.getAllServices();
                            allService.then(async function () {
                                allService = await allService;
                                res.render('bookings', {title: 'Manage Bookings', username: req.user[0].username, allService: allService, successful: successful, username: req.user[0].username, type: req.user[0].type});
                            });
                        });
                    });
                }
                else {
                    var make = Appointment.makeAppointment(req.body.description, req.user[0].username, req.body.selectedStaff, req.body.appointTime, endTime['0'].endTime, req.body.time, req.body.selectedService);
                    make.then(async function() {
                        var allService = Service.getAllServices();
                        allService.then(async function () {
                            allService = await allService;
                            res.render('bookings', {title: 'Manage Bookings', username: req.user[0].username, allService: allService, successful: successful, username: req.user[0].username, type: req.user[0].type});
                        });
                    });
                }
            });
        }
    }
];


exports.appointment_times_get = function(req, res) {
    res.send("To be implemented");
};

exports.service_chosen_post = function(req, res) {
    var allStaff = ServiceProvider.getStaffByService(req.body.service);
    allStaff.then( async function() {
        allStaff = await allStaff;
        var duration = Service.getDuration(req.body.service);
        duration.then( async function() {
            duration = await duration;
            res.send({allStaff: allStaff, duration: duration});
        });
    });
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
//Final review
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
            var update = Appointment.updateAppointment(req.body.appointmentID, req.body.date, req.body.time, endTime, appointment[0].dataValues.staffID, appointment[0].dataValues.serviceID);
            update.then( async function() {
                var newAppointment = Appointment.findAppointmentByID(req.body.appointmentID);
                newAppointment.then( async function() {
                    newAppointment = await newAppointment;
                    res.send(newAppointment);
                });
            });
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