const Service = require('../models/service');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

exports.services_get = function(req, res){
    if(currentUser == null)
        res.redirect('/users/login');
    else {
        var allService = Service.getAllServices();
        allService.then(async function () {
            allService = await allService;
            res.render('services', {title: 'Our Services', allService: allService});
        });
    }
};

exports.services_post = function(req, res){
    res.render('services', {title: 'Services'});
};