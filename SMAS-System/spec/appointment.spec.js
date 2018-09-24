let appointment = require("../models/appointment.js");

describe("Test", function () {
   it("should pass", function () {
       expect(0).toEqual(0);
   }) ;
});

/*describe("Find Appointment that exists", function() {
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
});*/

/*describe("Make Appointment", function() {
    it("should make an appointment", async function () {
        let results1 = await appointment.findAppointmentsByStudent('99999998');
        expect(results1.length).toEqual(0);

        appointment.makeAppointment('test', '99999998', 3, new Date(), new Date(), 2);

        let results2 = await appointment.findAppointmentsByStudent('99999998');
        expect(results2.length).toBeGreaterThan(0);

        appointment.cancelAppointment(results2.appointmentID);

        let results3 = await appointment.findAppointmentsByStudent('99999998');
        expect(results3.length).toEqual(0);
    });
});*/

/*
describe("Cancel Appointment", function(){
    it("should delete an appointment", async function() {
        /!*appointment.findAppointmentsByStudent('99999999')
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done()
            });
        appointment.cancelAppointment(
            appointment.findAppointmentsByStudent('99999999')
                .then(result => {
                    return result[0].appointmentID;
                }));
        appointment.findAppointmentsByStudent('99999999')
            .then(result => {
                expect(result.length).toEqual(0);
                done()
            });*!/

    });
});*/
