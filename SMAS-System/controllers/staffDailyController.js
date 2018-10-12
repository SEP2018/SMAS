const  Staff = require('../models/staff');

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