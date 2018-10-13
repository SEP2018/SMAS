let appointment = require("../models/appointment.js");

describe("Test", function () {
   it("should pass", function () {
       expect(0).toEqual(0);
   }) ;
});

describe("In the appointment model,", function() {
    it("the findAppointmentsByStudent() function finds appointments for a real student ID", function() {
        appointment.findAppointmentsByStudent('12876969')
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the findAppointmentsByStudent() function doesn't find appointments for a fake student ID", function() {
        appointment.findAppointmentsByStudent('99999999')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the findAppointmentsByDoctor() function finds appointments for a real staff ID", function() {
        appointment.findAppointmentsByDoctor('12345678')
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the findAppointmentsByDoctor() function doesn't find appointments for a fake staff ID", function() {
        appointment.findAppointmentsByDoctor('1')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the getAvailabilityByDayForService() function finds available appointment times given a service and a date", function() {
        var date = new Date();
        appointment.getAvailabilityByDayForService('1', date)
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the getAvailableStaffByServiceAndDayAndTime() function finds available staff given a service, a date, and a time", function() {
        var date = new Date();
        var time = new Date('1970-00-00T09:15:00.000Z');
        appointment.getAvailableStaffByServiceAndDayAndTime('1', date, time)
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the getAvailabilityByStaffAndDayForService() function finds available appointment times given a service, a date, and a staff ID", function() {
        var date = new Date();
        appointment.getAvailabilityByStaffAndDayForService('1', '12345678', date)
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the appointment model,", function() {
    it("the findAppointmentByID() function finds an appointment given a valid appointment ID", function() {
        appointment.findAppointmentsByDoctor('12345678')
            .then(result => {
                appointment.findAppointmentByID(result[0].dataValues.appointmentID)
                    .then(result2 => {
                        expect(result2.length).toEqual(1);
                        done();
                    });
                done();
            });
    });
});

















