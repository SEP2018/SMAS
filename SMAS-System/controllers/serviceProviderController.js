var Appointment = require('../models/serviceProvider');
var staffForService = Appointment.getAllStaffForService(3);
staffForService.then(async function(){
    staffForService = await staffForService;
    console.log("waiting");
    console.log(staffForService);
});