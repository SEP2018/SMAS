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
module.exports = {

    getAllStaffForService: async function(serviceID) {
        return new Promise(function(resolve, reject) {
            return ServiceProvider.findAll({
                where: {serviceID: serviceID},
                include: [{
                        association: Staff,
                        through: {where: {serviceID: serviceID}}
                    }]
            }).then(function (staff) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(staff);
                }
            });
        }).then(staff => {
            return staff;
        });
    }
};

/*
// shows all Service Provider objects
ServiceProvider.findAll().then(serviceProviders => {
    console.log(serviceProviders)
});
*/