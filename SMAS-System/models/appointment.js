const Sequelize = require('sequelize');
var orm = require('./orm');
var Student = require('./student');
var Staff = require('./staff');
var Room = require('./room');
sequelize = orm.seq;
const Appointment = sequelize.define('Appointment', {
    appointmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: Sequelize.INTEGER,
        references: {
            model: Student,
            key: 'studentID'
        }
    },
    employeeID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'employeeID'
        }
    },
    roomID: {
        type: Sequelize.INTEGER,
        references: {
            model: Room,
            key: 'roomID'
        }
    },
});

// make a new Appointment object
var makeAppointment = {
    makeAppointment : function(time, description, studentID, notes = null, cancellationFlag = null, employeeID = null, roomID = null){
        Appointment.create({
            time: time,
            description: description,
            notes: notes,
            cancellationFlag: cancellationFlag,
            studentID: studentID,
            employeeID: employeeID,
            roomID: roomID
        });
    }
};

//export functions
module.exports = makeAppointment;

// shows all Appointment objects
/*Appointment.findAll().then(appointments => {
    console.log(appointments)
});
*/