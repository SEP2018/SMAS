const Sequelize = require('sequelize');
const orm = require('./orm');
const Student = require('./student');
const Staff = require('./staff');
const Room = require('./room');
const Service = require('./service');
const Moment = require('moment-timezone');
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
    makeAppointment : function(description, studentID, staffID, startTime, endTime, appointmentDate, serviceID){
        let staffAvailability;
        if (Moment(appointmentDate + " " + startTime, "YYYY-MM-DD HH:mm:ii Z").tz("Australia/Sydney").format() > Moment().tz("Australia/Sydney").format()) {
            staffAvailability = isStaffAvailableForDayAndTimeOfService(staffID, appointmentDate, startTime, serviceID);
            staffAvailability.then(async function () {
                if (await staffAvailability) {
                    Appointment.create({
                        description: description,
                        notes: null,
                        cancellationFlag: null,
                        studentID: studentID,
                        staffID: staffID,
                        roomID: null,
                        startTime: startTime,
                        endTime: endTime,
                        appointmentDate: appointmentDate,
                        serviceID: serviceID
                    }).then(function () {
                        console.log("Appointment created.");
                    }).catch(function (err) {
                        throw err;
                    });
                }
                else {
                    console.log("Create Appointment Failed: Staff member is not available at this time.");
                    return "Staff member is not available at this time.";
                }
            });
        }
        else {
            console.log("Create Appointment Failed: Appointment must be booked in the future.");
            return "Appointments must be booked in the future.";
        }
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

    findAppointmentsByDoctor : async function(staffID) {
        return new Promise(function(resolve, reject) {
            return Appointment.findAll({
                attributes: ['appointmentID', 'serviceID', 'studentID', 'appointmentDate', 'startTime', 'description'],
                where: {
                    staffID: staffID
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
    },

    getAvailabilityByDayForService: function(serviceID, appointmentDate){
        return new Promise(function(resolve, reject) {
            sequelize.query('SELECT * FROM availableTimeSlotsByService(:serviceID, :appointmentDate);',
                {
                    replacements: {serviceID: serviceID, appointmentDate: appointmentDate},
                    type: Sequelize.QueryTypes.SELECT
                }).catch(function(err) {
                reject(err);
                throw err;
            }).then(result => {
                resolve(result);
            });
        });
    },

    getAvailableStaffByServiceAndDayAndTime: function(serviceID, appointmentDate, appointmentTime){
        return new Promise(function(resolve, reject) {
            sequelize.query('SELECT staffid FROM serviceProvider WHERE serviceid = :serviceID AND staffid NOT IN (SELECT staffid FROM Appointment WHERE starttime = :appointmentTime AND appointmentDate = :appointmentDate);',
                {
                    replacements: {serviceID: serviceID, appointmentDate: appointmentDate, appointmentTime: appointmentTime},
                    type: Sequelize.QueryTypes.SELECT
                }).catch(function(err){
                reject(err);
                throw err;
            }).then(result => {
                resolve(result);
            });
        });
    },

    findAppointmentByID: function(appointmentID) {
        return new Promise(function(resolve, reject) {
            return Appointment.findAll({
                attributes: ['appointmentID', 'serviceID', 'appointmentDate', 'startTime', 'endTime'],
                where: {
                    appointmentID: appointmentID
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

    updateAppointment: function(appointmentID, newDate, newStartTime, newEndTime, staffID, serviceID) {
        let staffAvailability;
        if (Moment(newDate + " " + newStartTime, "YYYY-MM-DD HH:mm:ii Z").tz("Australia/Sydney").format() > Moment().tz("Australia/Sydney").format()) {
            staffAvailability = isStaffAvailableForDayAndTimeOfService(staffID, newDate, newStartTime, serviceID);
            staffAvailability.then(async function () {
                if (await staffAvailability) {
                    return new Promise(function (resolve, reject) {
                        return Appointment.update({
                                appointmentDate: newDate,
                                startTime: newStartTime,
                                endTime: newEndTime
                            },
                            {
                                where: {
                                    appointmentID: appointmentID
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
                }
                else {
                    console.log("Update Appointment Failed: Staff member is not available at this time.");
                    return "Staff member is not available at this time.";
                }
            });
        }
        else {
            console.log("Update Appointment Failed: Appointment must be booked in the future.");
            return "Appointments must be booked in the future.";
        }
    },
};

async function isStaffAvailableForDayAndTimeOfService(staffID, appointmentDate, startTime, serviceID){
    return new Promise(function(resolve, reject) {
        sequelize.query('SELECT CASE WHEN :startTime IN (SELECT * FROM availableTimeSlots(:serviceID, :staffID, :appointmentDate)) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END',
            {
                replacements: {staffID: staffID, appointmentDate: appointmentDate, startTime: startTime, serviceID: serviceID},
                type: Sequelize.QueryTypes.SELECT
            }).catch(function(err) {
            reject(err);
            throw err;
        }).then(result => {
            resolve(result[0]['']);
        });
    });
}
