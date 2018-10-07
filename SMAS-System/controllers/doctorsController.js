const  Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.doctors_get = function(req, res){
    var allDoctors = Staff.getAllStaff();
    allDoctors.then(async function() {
        allDoctors = await allDoctors;
        res.render('doctors', { title: 'Doctors', allDoctors: allDoctors });
    });
};

exports.doctors_post = function(req, res){
    res.render('doctors', {title: 'Doctors'});
};