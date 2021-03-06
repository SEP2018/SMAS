const Appointment = require('../models/appointment')
    , Service = require('../models/service')
    , ServiceProvider = require('../models/serviceProvider')
    , Staff = require('../models/staff')
    , Event = require('../public/javascripts/event')
    , Moment = require('moment-timezone');
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


                            //Calendar event creation code if any doctors selected
                            /*
                            if(req.body.event){
                                console.log('Creating calendar event for appointment with any doctor.');
                                let service = await Service.findServiceByID(req.body.selectedService);
                                let serviceName = service.title;
                                let staff = await Staff.findStaffByID(doctors['0'].dataValues.staffid);
                                let staffLastName = staff.lastName;
                                let createdEvent = await Event.createEvent(serviceName, staffLastName, req.body.appointTime, endTime['0'].endTime);
                                console.log('Created Google Calendar Event: ' + createdEvent);
                            }
                            */


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

                        //Calendar event creation code if specific doctor selected
                        /*
                        if(req.body.event){
                            console.log('Creating calendar event for standard appointment');
                            var staff = Staff.findStaffByID(req.body.selectedStaff);
                            staff.then(async function () {
                                staff = await staff;
                                let staffLastName = staff[0].lastName;
                                console.log('Staff last name: ' + staffLastName);
                                var service = Service.findServiceByID(req.body.selectedService);
                                service.then(async function(){
                                    service = await service;
                                    let serviceName = service[0].title;
                                    console.log('Service Name: ' + serviceName);

                                    let date = req.body.time;
                                    console.log("date: " + date);
                                    let startTime = req.body.appointTime;
                                    let newStartTime = Moment(startTime).tz("Australia/Sydney").format("HH:mm:ss");
                                    console.log("startTime: " + newStartTime);
                                    let finishTime = endTime[0].endTime;
                                    let newEndTime = Moment(finishTime).tz("Australia/Sydney").format("HH:mm:ss");
                                    console.log("endTime: " + newEndTime);
                                    let startDateTime = date + 'T' + newStartTime;
                                    let endDateTime = date + 'T' + newEndTime;
                                    console.log('Start datetime: ' + startDateTime);
                                    console.log('End datetime: ' + endDateTime);

                                    Event.createEvent(serviceName, staffLastName, startDateTime, endDateTime);
                                    console.log('Created Google Calendar Event');
                                });
                            });
                        }
                        */


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