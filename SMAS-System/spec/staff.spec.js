const staff = require('../models/staff.js');

describe("In the staff model,", function() {
    it("the getAllStaff() function should return an array of length greater than 0", async function(){
        staff.getAllStaff()
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});
