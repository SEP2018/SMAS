const Appointment = require('../models/appointment')
    , Service = require('../models/service')
    , ServiceProvider = require('../models/serviceProvider')
    , Staff = require('../models/staff');
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
            var allStaff = Staff.getAllStaff();
            allStaff.then(async function () {
                allStaff = await allStaff;
                if (req.user[0].type == 'student') {
                    res.render('index', {title: 'Student Medical Appointment System', allService: allService, allStaff: allStaff, username: req.user[0].username, type: req.user[0].type});
                }
                else if (req.user[0].type == 'staff'){
                    res.redirect('/staff/daily');
                }
                else{
                    console.log('Error: User not staff or student.');
                }
            });
        });
    //}
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
                        var make = Appointment.makeAppointment(req.body.description, req.user[0].username, doctors[0].staffid, req.body.appointTime, endTime[0].endTime, req.body.time, req.body.selectedService);
                        make.then(async function() {
                            var allService = Service.getAllServices();
                            allService.then(async function () {
                                allService = await allService;
                                var allStaff = Staff.getAllStaff();
                                allStaff.then(async function () {
                                    allStaff = await allStaff;
                                    res.render('index', {
                                        title: 'Student Medical Appointment System',
                                        allService: allService,
                                        successful: successful,
                                        username: req.user[0].username,
                                        allStaff: allStaff
                                    });
                                });
                            });
                        });
                    });
                }
                else {
                    var make = Appointment.makeAppointment(req.body.description, req.user[0].username, req.body.selectedStaff, req.body.appointTime, endTime[0].endTime, req.body.time, req.body.selectedService);
                    make.then(async function() {
                        var allService = Service.getAllServices();
                        allService.then(async function () {
                            allService = await allService;
                            var allStaff = Staff.getAllStaff();
                            allStaff.then(async function () {
                                allStaff = await allStaff;
                                res.render('index', {
                                    title: 'Student Medical Appointment System',
                                    allService: allService,
                                    username: req.user[0].username,
                                    successful: successful,
                                    allStaff: allStaff
                                });
                            });
                        });
                    });
                }
            });
        }
    }
];