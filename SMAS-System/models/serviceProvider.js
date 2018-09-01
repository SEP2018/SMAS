const Sequelize = require('sequelize');
var Service = require('./service');
var Staff = require('./staff');
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

//export functions
//module.exports = {
//};

/*
// shows all Service Provider objects
ServiceProvider.findAll().then(serviceProviders => {
    console.log(serviceProviders)
});
*/