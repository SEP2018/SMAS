const staff = require('../models/staff.js')

describe("Staff tests", function() {
    it("get all staff", async function(){
       test = await staff.getAllStaff();
       expect(test).toBe(null);
    });
});