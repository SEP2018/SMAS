const Sequelize = require('sequelize');
var orm = require('./orm');
sequelize = orm.seq;
const Appointment = sequelize.define('Appointment', {
    appointmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

// make a new Appointment object
var makeAppointment = {
        makeAppointment : function(time, description, studentID){// notes, emoployeeID, studentID, roomID) {
        Appointment.create({
            time: time,
            description: description,
            studentID: studentID,
        });
    }
};
module.exports = makeAppointment;


// shows all Appointment objects
/*Appointment.findAll().then(appointments => {
    console.log(appointments)
});
*/