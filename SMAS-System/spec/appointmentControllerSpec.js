let appointment = require("../models/appointment.js");

describe("Find Appointment that exists", function() {
    it("should return appointments for a student", function(done) {
        appointment.findAppointmentsByStudent('12876969')
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done()
            });

    });
});

describe("Find Appointment that doesn't exit", function() {
    it("should return and array of length 0", function(done) {
        appointment.findAppointmentsByStudent('99999999')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    });
});