const  Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.doctors_get = function(req, res){
    res.render('doctors', {title: 'Doctors'});
};

exports.doctors_post = function(req, res){
    res.render('doctors', {title: 'Doctors'});
};