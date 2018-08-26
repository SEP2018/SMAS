var Appointment = require('../models/appointment')
// Validation of form data
const {body,validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')

// Display home page
exports.index = function(req, res) {
    res.send('To be implemented');
};

// Display Appointment creation form on GET
exports.appointment_create_get = function(req, res){
    res.render('createAppointment', { title: 'Create an Appointment' });
};

// Handle Appointment creation form on POST
exports.appointment_create_post = [
     //Field Validation
    body('student_id').isLength({ min: 8, max: 8 }).trim().withMessage('Enter valid Student ID'),
    body('description').isLength({ max: 200 }).trim().withMessage('Description must be specified'),
    body('time').isISO8601(),

        // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('description').trim().escape(),
    sanitizeBody('time').toDate(),

        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.render('createAppointment', { title: 'Create an Appointment', errors: errors.array() });
                return;
            }
            else {
                res.redirect('/');
            }
        }


];

// Display Appointment deletion form on GET
exports.appointment_cancel_get = function(req, res){
    res.render('cancelAppointment', { title: 'Cancel an Appointment' });
};

// Handle Appointment deletion on POST
exports.appointment_cancel_post = function(req, res){
    res.send('To be implemented');
};