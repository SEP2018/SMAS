const Sequelize = require('sequelize');
const Staff = require('./staff');
const orm = require('./orm');
sequelize = orm.seq;
const Student = sequelize.define('Student', {
    studentID: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    DOB: {
        type: Sequelize.DATEONLY
    },
    gender: {
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
    setPreferredDoctor: function() {

    }
};