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
    startTime: {
        type: Sequelize.TIME
    },
    endTime: {
        type: Sequelize.TIME
    },
    appointmentDate: {
        type: Sequelize.DATEONLY
    }
});

// make a new Appointment object
module.exports = {
    makeAppointment : function(description, studentID, employeeID, startTime, appointmentDate){
        Appointment.create({
            description: description,
            notes: null,
            cancellationFlag: null,
            studentID: studentID,
            employeeID: employeeID,
            roomID: null,
            startTime: startTime,
            appointmentDate: appointmentDate
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
                attributes: ['appointmentID', 'studentID', 'description', 'startTime', 'appointmentDate'],
                where: {
                    studentID: studentID
                }
            }).catch(function (err) {
                reject(err);
                throw err;
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