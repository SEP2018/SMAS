const Sequelize = require('sequelize');
var orm = require('./orm');
var Staff = require('./staff');
sequelize = orm.seq;
const Room = sequelize.define('Room', {
    roomID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.STRING
    },
    employeeID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'staffID'
        }
    }
});

// make a new Room object
var createRoom = {
    createRoom : function(type, employeeID = null){// employeeID) {
        Room.create({
            type: type,
            employeeID: employeeID
        });
    }
};

//export functions
module.exports = createRoom;

/*
// shows all Room objects
Room.findAll().then(rooms => {
    console.log(rooms)
});
*/