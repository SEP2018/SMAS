const Sequelize = require('sequelize');
const orm = require('./orm');
const Student = require('./student');
const Staff = require('./staff');
const Room = require('./room');
const Service = require('./service');
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
        type: Sequelize.INTEGER,
        references: {
            model: Service,
            key: 'serviceID'
        }
    }
}, {
    getterMethods: {
        appointmentURL() {
            return '/appointments/' + this.appointmentID;
        }
    }
});

// make a new Appointment object
module.exports = {
    makeAppointment : function(description, studentID, staffID, startTime, appointmentDate, serviceID){
        Appointment.create({
            description: description,
            notes: null,
            cancellationFlag: null,
            studentID: studentID,
            staffID: staffID,
            roomID: null,
            startTime: startTime,
            appointmentDate: appointmentDate,
            serviceID: serviceID
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
                attributes: ['appointmentID', 'serviceID', 'staffID', 'appointmentDate', 'startTime'],
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
    getAvailabilityByStaffAndDayForService: function(serviceID, staffID, appointmentDate){
        return new Promise(function(resolve, reject) {
            sequelize.query('SELECT * FROM availableTimeSlots(:serviceID, :staffID, :appointmentDate);',
                {
                    replacements: {serviceID: serviceID, staffID: staffID, appointmentDate: appointmentDate},
                    type: Sequelize.QueryTypes.SELECT
                }).catch(function(err) {
                reject(err);
                throw err;
            }).then(result => {
                resolve(result);
            });
        });
    }
};
