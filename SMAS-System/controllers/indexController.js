const Appointment = require('../models/appointment')
    , Staff = require('../models/staff')
    , Service = require('../models/service');
// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display home page
exports.index = function(req, res){
    //if(currentUser == null)
    //    res.redirect('/users/login');
    //else {
        var allService = Service.getAllServices();
        allService.then(async function () {
            allService = await allService;
            res.render('index', {title: 'Student Medical Appointment System', allService: allService, username: req.user[0].username, type: req.user[0].type});
        });
    //}
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
            var allService = Service.getAllServices();
            allService.then(async function() {
                allService = await allService;
                res.render('index', { title: 'Student Medical Appointment System', allService: allService, errors: errors.array() });
            });
        }
        else {
            var successful = true;
            Appointment.makeAppointment(req.body.description, '12876797', req.body.selectedStaff, req.body.appointTime, req.body.time, req.body.selectedService);
            var allService = Service.getAllServices();
            allService.then(async function() {
                allService = await allService;
                res.render('index', { title: 'Student Medical Appointment System', allService: allService, successful: successful });
            });
        }
    }
];