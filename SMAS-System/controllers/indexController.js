const Appointment = require('../models/appointment')
    , Service = require('../models/service')
    , ServiceProvider = require('../models/serviceProvider');
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
            res.render('index', {title: 'Student Medical Appointment System', allService: allService});
        });
    //}
};


exports.service_chosen_post = function(req, res) {
    var allStaff = ServiceProvider.getStaffByService(req.body.service);
    allStaff.then( async function() {
        allStaff = await allStaff;
        var duration = Service.getDuration(req.body.service);
        duration.then( async function() {
            duration = await duration;
            res.send({allStaff: allStaff, duration: duration});
        });
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
            //popups
            var successful = true;

            //get end time of appointment
            var endTime = Service.getEndTime(req.body.selectedService, req.body.appointTime);
            endTime.then(async function () {
                endTime = await endTime;

                // get doctor if any doctor selected
                if(req.body.selectedStaff == '0') {
                    var doctors = Appointment.getAvailableStaffByServiceAndDayAndTime(req.body.selectedService, req.body.time, req.body.appointTime);
                    doctors.then(async function () {
                        doctors = await doctors;
                        Appointment.makeAppointment(req.body.description, '12876797', doctors['0'].dataValues.staffid, req.body.appointTime, endTime['0'].endTime, req.body.time, req.body.selectedService);

                    });
                }
                else {
                    Appointment.makeAppointment(req.body.description, '12876797', req.body.selectedStaff, req.body.appointTime, endTime['0'].endTime, req.body.time, req.body.selectedService);
                }
                var allService = Service.getAllServices();
                allService.then(async function () {
                    allService = await allService;
                    res.render('index', {
                        title: 'Student Medical Appointment System',
                        allService: allService,
                        successful: successful
                    });
                });
            });
        }
    }
];