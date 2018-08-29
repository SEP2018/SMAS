var Appointment = require('../models/appointment');
// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

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
    body('time').optional().isISO8601(),
    body('appointTime').trim(),

        // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('description').trim().escape(),

        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.render('createAppointment', { title: 'Create an Appointment', errors: errors.array() });
                return;
            }
            else {
                Appointment.makeAppointment(req.body.time.toString().concat(' ' + req.body.appointTime + ' +00:00'), req.body.description, req.body.student_id);
                res.render('createAppointmentSuccess', {title: 'Success!', studentid: req.body.student_id, date: req.body.time});
            }
        }
];

// Display Appointment deletion form on GET
exports.appointment_cancel_get = function(req, res){
    res.render('cancelAppointment', { title: 'Cancel an Appointment' });
};

// Handle Appointment deletion on POST
exports.appointment_cancel_post = [
    //Field Validation
    body('student_id').isLength({ min: 8, max: 8 }).trim().withMessage('Enter valid Student ID'),
    // Field sanitisation
    sanitizeBody('student_id').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.render('cancelAppointment', { title: 'Cancel an Appointment', errors: errors.array() });
            return;
        }
        else {
            var appointmentsResults = Appointment.findAppointments(req.body.student_id);
            var appointments = [];
            for (var i = 0; i < appointmentsResults.length; i++) {
                // Create an object to save current row's data
                var appointment = {
                    'studentID':rows[i].studentID,
                    'description':rows[i].description,
                    'time':rows[i].time
                };
                // Add object into array
                appointments.push(appointment);
            }
            res.render('cancelAppointment', {appointments: appointments});
        }
    }

];