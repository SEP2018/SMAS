const serviceprovider = require('../models/serviceProvider.js');

describe('In the serviceProvider model,', function() {
    it('the getStaffByService() function should return all staff that are able to give a particular service', function() {
        serviceprovider.getStaffByService('1')
            .then(result => {
                expect(result.length).toBeGreaterThan(1);
            });
    });
});