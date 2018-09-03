const Sequelize = require('sequelize');
const orm = require('./orm');
const Student = require('./student');
const Staff = require('./staff');
const Room = require('./room');
const Service = require('./service')
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
    staffID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'staffID'
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
    },
    serviceID: {
        type: Sequelize.INTEGER
        references: {
            model: Service,
            key: ''
        }
    }
});

// make a new Appointment object
module.exports = {
    makeAppointment : function(description, studentID, staffID, startTime, appointmentDate){
        Appointment.create({
            description: description,
            notes: null,
            cancellationFlag: null,
            studentID: studentID,
            staffID: staffID,
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