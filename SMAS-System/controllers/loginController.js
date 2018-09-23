const Student = require('../models/student')
    , Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.login_get = function(req, res){
    res.render('login', {title: 'login'});
};

exports.login_post = function(req, res){
    res.render('login', {title: 'login'});
};