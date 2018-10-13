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
            sequelize.query('SELECT staffID, lastName FROM Staff WHERE staffID IN (SELECT staffID FROM serviceProvider WHERE serviceID = :serviceID);',
                {
                    replacements: {serviceID: serviceID},
                    type: Sequelize.QueryTypes.SELECT
                }).catch(function(err) {
                reject(err);
                throw err;
            }).then(result => {
                resolve(result);
            });
        });
    }
};


/*
// shows all Service Provider objects
ServiceProvider.findAll().then(serviceProviders => {
    console.log(serviceProviders)
});
*/