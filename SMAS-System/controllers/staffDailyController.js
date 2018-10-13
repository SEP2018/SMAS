const Staff = require('../models/staff');
const Appointment = require('../models/appointment');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.staff_daily_get = function(req, res){
    //if(currentUser == null)
    //    res.redirect('/login');
    //else {
        res.render('staffDaily', {title: 'Appointments', username: req.user[0].username});
    //}
};

exports.staff_daily_post = function(req, res){
    res.render('staffDaily', {title: 'Appointments'});
};

exports.daily_bookings_post = function(req, res){
    var mockDate = new Date();
    mockdate.setFullYear(1972);
    var allTimes = Appointment.getAvailabilityByStaffAndDayForService('1', req.body.id, mockDate);
    allTimes.then( async function(){
        allTimes = await allTimes;
        console.log(allTimes);
        res.send(allTimes);
    });
};