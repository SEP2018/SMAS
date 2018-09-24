let service = require('../models/service');

describe('In the Service model,', function() {
    it('The getAllServices function should return an array of length greater than 0', async function() {
        let allServices = await service.getAllServices();
        expect(allServices.length).toBeGreaterThan(0);
    })
});
