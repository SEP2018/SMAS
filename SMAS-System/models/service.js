const Sequelize = require('sequelize');
var orm = require('./orm');
sequelize = orm.seq;
const Service = sequelize.define('Service', {
    serviceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
});

//export functions
module.exports = {
    getAllServices: async function() {
        return new Promise(function(resolve, reject) {
            return Service.findAll().then(services => {
                if (error){
                    reject(error);
                }
                else{
                    resolve(services);
                }
            });
        }).then(services => {
            return services;
        });
    }
};

/*
// shows all Room objects
Service.findAll().then(services => {
    console.log(services)
});
*/