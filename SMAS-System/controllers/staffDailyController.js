const Staff = require('../models/staff');
const Appointment = require('../models/appointment');
const Service = require('../models/service');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.staff_daily_get = function(req, res){
    //if(currentUser == null)
    //    res.redirect('/login');
    //else {
        res.render('staffDaily', {title: 'Appointments'});
    //}
};

exports.staff_daily_post = function(req, res){
    res.render('staffDaily', {title: 'Appointments'});
};

exports.daily_bookings_post = function(req, res){
    var mockDate = new Date();
    mockDate.setFullYear(1973);
    var allTimes = Appointment.getAvailabilityByStaffAndDayForService('3', req.body.id, mockDate);
    allTimes.then( async function(){
        allTimes = await allTimes;
        res.send(allTimes);
    });
};

exports.doctor_appointments_post = function(req, res){
    var allAppointments = Appointment.findAppointmentsByDoctor(req.body.id);
    allAppointments.then( async function() {
        allAppointments = await allAppointments;
        var allServices = Service.getAllServices();
        allServices.then( async function() {
            allServices = await allServices;
            for (var i = 0, len = allAppointments.length; i < len; i++) {
                allAppointments[i].dataValues.serviceTitle = allServices[allAppointments[i].dataValues.serviceID - 1].dataValues.title;
                allAppointments[i].dataValues.duration = allServices[allAppointments[i].dataValues.serviceID - 1].dataValues.duration;
            }
            res.send(allAppointments);
        });
    });
};