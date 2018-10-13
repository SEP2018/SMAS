const serviceProvider = require('../models/serviceProvider.js');

describe('In the serviceProvider model,', function() {
    it('the getStaffByService() function should return all staff that are able to give a particular service', function() {
        serviceProvider.getStaffByService('1')
            .then(result => {
                expect(result.length).toBeGreaterThan(1);
                done();
            });
    });
});

describe('In the serviceProvider model,', function() {
    it('the getStaffByService() function should return no staff for an invalid service ID', function() {
        serviceProvider.getStaffByService('1111')
            .then(result => {
                expect(result.length).toEqual(0);
                done();
            });
    });
});