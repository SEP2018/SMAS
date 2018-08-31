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
        type: Sequelize.STRING,
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
module.exports = {
    makeAppointment : function(time, description, studentID){
        Appointment.create({
            time: time,
            description: description,
            notes: null,
            cancellationFlag: null,
            studentID: studentID,
            employeeID: null,
            roomID: null
        });
    },
    cancelAppointment : function(appointmentID){
        Appointment.destroy({
            where: {
                appointmentID: appointmentID
            }
        });
    },

    findAppointmentsByStudent : async function(studentID) {
        return new Promise(function(resolve, reject) {
            return Appointment.findAll({
                attributes: ['appointmentID', 'studentID', 'description', 'time'],
                where: {
                    studentID: studentID
                }
            }).then(result => {
                resolve(result);
            });
        }).then(result => {
            return result;
        });

    },
    getUnavailableTimesByStaff: function(staffID){
        Appointment.findAll({
            attributes : {time},
            where : {
                staffID: staffID,
            }
        });
    }
};

// shows all Appointment objects
/*Appointment.findAll().then(appointments => {
    console.log(appointments)
});
*/