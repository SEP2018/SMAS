const Sequelize = require('sequelize');
var Service = require('./service');
var Staff = require('./staff')
var orm = require('./orm');
sequelize = orm.seq;
const ServiceProvider = sequelize.define('ServiceProvider', {
    serviceID: {
        type: Sequelize.INTEGER,
        references: {
            model: Service,
            key: 'serviceID'
        }
    },
    employeeID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'employeeID'
        }
    }
});

// make a new Service Provider object
var createServiceProvider = {
    createServiceProvider : function(serviceID, employeeID){
        ServiceProvider.create({
            serviceID: serviceID,
            staffID: employeeID,
        });
    }
};

//export functions
module.exports = createServiceProvider;

/*
// shows all Service Provider objects
ServiceProvider.findAll().then(serviceProviders => {
    console.log(serviceProviders)
});
*/