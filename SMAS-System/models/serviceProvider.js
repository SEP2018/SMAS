const Sequelize = require('sequelize');
const Service = require('./service');
const Staff = require('./staff');
const orm = require('./orm');
sequelize = orm.seq;
const ServiceProvider = sequelize.define('ServiceProvider', {
    serviceID: {
        type: Sequelize.INTEGER,
        references: {
            model: Service,
            key: 'serviceID'
        }
    },
    staffID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'staffID'
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