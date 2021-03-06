const  Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.doctors_get = function(req, res){
    //if(currentUser == null)
    //    res.redirect('/users/login');
    //else {
        var allDoctors = Staff.getAllStaff();
        allDoctors.then(async function () {
            allDoctors = await allDoctors;
            res.render('doctors', {title: 'Doctors', allDoctors: allDoctors, username: req.user[0].username});
        });
    //}
};

exports.doctors_post = function(req, res){
    res.render('doctors', {title: 'Doctors'});
};
