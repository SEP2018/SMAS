const  Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.staff_weekly_get = function(req, res){
    res.render('staffWeekly', {title: 'Appointments'});
};

exports.staff_weekly_post = function(req, res){
    res.render('staffWeekly', {title: 'Appointments'});
};