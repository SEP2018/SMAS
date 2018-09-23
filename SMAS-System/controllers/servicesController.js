const Service = require('../models/service');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.services_get = function(req, res){
    res.render('services', {title: 'Services'});
};

exports.services_post = function(req, res){
    res.render('services', {title: 'Services'});
};