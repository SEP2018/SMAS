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

// make a new Appointment object
/*Appointment.sync({force: true}).then(() => {
    // Table created
    return Appointment.create({
        appointmentID: 1,
        time: Date.now(),
        description: 'Help I have a cold',
        notes: 'Help before it kills me',
        employeeID: 3,
        studentID: 12878765,
        roomID: 8
    });
});*/

// shows all Appointment objects
/*Appointment.findAll().then(appointments => {
    console.log(appointments)
});
*/