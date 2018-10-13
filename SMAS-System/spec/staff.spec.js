const staff = require('../models/staff.js');

describe("In the staff model,", function() {
    it("the getAllStaff() function should return an array of length greater than 0", function(){
        staff.getAllStaff()
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe("In the staff model,", function() {
    it("the findStaffByID() function should return one staff record given a valid staff ID", function() {
        staff.findStaffByID('12345678')
            .then(result => {
                expect(result.length).toEqual(1);
                done();
            });
    })
});

describe("In the staff model,", function() {
    it("the findStaffByID() function should return no staff records given a invalid staff ID", function() {
        staff.findStaffByID('1')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    })
});
