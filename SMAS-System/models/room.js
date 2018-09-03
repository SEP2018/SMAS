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

//export functions
module.exports = {
    getRoomByStaff: function(staffID) {

    }
};