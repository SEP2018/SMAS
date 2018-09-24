let appointment = require("../models/appointment.js");

describe("Test", function () {
   it("should pass", function () {
       expect(0).toEqual(0);
   }) ;
});

describe("In the appointment model,", function() {
    it("the findAppointmentByStudent() function finds appointments for a real student ID", function(done) {
        appointment.findAppointmentsByStudent('12876969')
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done()
            });

    });
});

describe("In the appointment model,", function() {
    it("the findAppointmentByStudent() function doesn't find appointments for a fake student ID", function(done) {
        appointment.findAppointmentsByStudent('99999999')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    });
});
