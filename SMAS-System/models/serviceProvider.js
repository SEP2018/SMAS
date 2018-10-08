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

// export functions
module.exports = {
    getStaffByService: async function(serviceID) {
        return new Promise(function(resolve, reject) {
            return ServiceProvider.findAll({
                attributes: ['staffID'],
                where: {
                    serviceID: serviceID
                }
            }).catch(function (err) {
                reject(err);
                throw err;
            }).then(result => {
                resolve(result);
            });
        }).then(result => {
            return result;
        });
    }
};

/*
// shows all Service Provider objects
ServiceProvider.findAll().then(serviceProviders => {
    console.log(serviceProviders)
});
*/