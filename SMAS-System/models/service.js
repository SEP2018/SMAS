const Sequelize = require('sequelize');
const orm = require('./orm');
sequelize = orm.seq;
const Service = sequelize.define('Service', {
    serviceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    daysAvailable: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.TIME
    }
}, {
 getterMethods: {
     serviceURL() {
         return '/services/' + this.serviceID;
     }
 }
});

//export functions
module.exports = {
    getAllServices: async function() {
        return new Promise(function(resolve, reject) {
            return Service.findAll().catch(function (err) {
                reject(err);
                throw err;
            }).then(services => {
                resolve(services);
            });
        }).then(services => {
            return services;
        });
    },

    findServiceByID: async function(serviceID) {
        return new Promise(function(resolve, reject) {
            return Service.findAll({
                attributes: ['title', 'description', 'daysAvailable', 'duration'],
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
    },

    getEndTime: async function(serviceID, startTime){
        let duration = findServiceByID(serviceID).duration;
        return startTime + duration;
        //I kinda doubt this will work sorry I was tired ahah. Might need to do it using promises
    }
};