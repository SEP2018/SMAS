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
    }
});

// make a new Service object
var createService = {
    createService : function(description, daysAvailable){
        Service.create({
            description: description,
            daysAvailable: daysAvailable
        });
    }
};

//export functions
module.exports = createService;

/*
// shows all Room objects
Service.findAll().then(services => {
    console.log(services)
});
*/