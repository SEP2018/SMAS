const Appointment = require('../models/appointment')
    , Staff = require('../models/staff')
    , Service = require('../models/service');
// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display home page
exports.index = function(req, res){
    var allService = Service.getAllServices();
    allService.then(async function() {
        allService = await allService;
        var allStaff = Staff.getAllStaff();
        allStaff.then( async function() {
            allStaff = await allStaff;
            res.render('index', { title: 'Student Medical Appointment System', allService: allService });
        });
    })
};

exports.doctors_chosen_get = function(req, res) {
    var allStaff = Staff.getAllStaff();
    allStaff.then( async function() {
        allStaff = await allStaff;
        return allStaff;
    });
}

exports.doctors_chosen_post = function(req, res) {
    var allStaff = Staff.getAllStaff();
    allStaff.then( async function() {
        allStaff = await allStaff;
        return allStaff;
    });
}

exports.service_chosen_get = function(req, res) {
    var allStaff = Staff.getAllStaff();
    allStaff.then( async function() {
        allStaff = await allStaff;
        res.send(allStaff);
    });
};

exports.service_chosen_post = function(req, res) {
    var allStaff = Staff.getAllStaff();
    allStaff.then( async function() {
        allStaff = await allStaff;
        res.send(allStaff);
    });
};

// Handle Appointment creation form on POST
exports.home_post = [
    //Field Validation
    body('student_id').isLength({ min: 8, max: 8 }).trim().withMessage('Enter valid Student ID'),
    body('description').isLength({ max: 200 }).trim().withMessage('Description must be specified'),
    body('time').optional().isISO8601(),
    body('appointTime').trim(),
    body('selectedStaff').trim(),
    body('selectedService').trim(),

    // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('description').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('index', { title: 'Student Medical Appointment System', errors: errors.array() });
            return;
        }
        else {
            Appointment.makeAppointment(req.body.description, req.body.student_id, req.body.selectedStaff, req.body.time, req.body.appointTime, req.body.selectedService);
            res.redirect('/');
            //res.render('index', {title: 'Student Medical Appointment System', });
        }
    }
];