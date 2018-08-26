const Sequelize = require('sequelize');
var orm = require('./orm');
sequelize = orm.seq;
const Appointment = sequelize.define('Appointment', {
    appointmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    time: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING
    },
    notes: {
        type: Sequelize.STRING
    },
    cancellationFlag: {
        type: Sequelize.BOOLEAN
    },
    studentID: {
        type: Sequelize.INTEGER
    },
    employeeID: {
        type: Sequelize.INTEGER
    },
    roomID: {
        type: Sequelize.INTEGER
    },
});

const test = sequelize.define('IncrementTest', {faveColour: {type: Sequelize.STRING}});
test.create({
        faveColour: 'green',
    });

// make a new Appointment object
module.exports = function makeAppointment(time, description, studentID){// notes, emoployeeID, studentID, roomID) {
    Appointment.create({
        time: time,
        description: description,
        studentID: studentID,
    });
};

// shows all Appointment objects
/*Appointment.findAll().then(appointments => {
    console.log(appointments)
});
*/