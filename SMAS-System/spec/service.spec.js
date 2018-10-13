let service = require('../models/service');

describe('In the service model,', function() {
    it('the getAllServices() function should return an array of length greater than 0', function() {
        service.getAllServices()
            .then(result => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
    });
});

describe('In the service model,', function() {
    it('the findServiceByID() function should return one service for a given valid service ID', function() {
        service.findServiceByID('1')
            .then(result => {
                expect(result.length).toEqual(1);
            });
    });
});

describe('In the service model,', function() {
    it('the findServiceByID() function should return no services for a given invalid service ID', function() {
        service.findServiceByID('0')
            .then(result => {
                expect(result.length).toEqual(0);
            });
    });
});

describe("In the service model,", function() {
    it('the getEndTime() function should return the entered start time + the service duration', function() {
        var startTime = new Date('1970-00-00T09:15:00.000Z');
        var expectedEndTime = new Date('1970-00-00T10:00:00.000Z');
        service.getEndTime('1', startTime)
            .then(result => {
                expect(result).toBe(expectedEndTime);
            });
    });
});
