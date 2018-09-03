const Sequelize = require('sequelize');
const orm = require('./orm');
const Staff = require('./staff');
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
    staffID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'staffID'
        }
    }
});

// make a new Room object
const createRoom = {
    createRoom : function(type, staffID = null){// staffID) {
        Room.create({
            type: type,
            staffID: staffID
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