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

// make a new Student object
const createStudent = {
    createStudent : function(firstName, lastName, DOB, gender, staffID = null){
        Student.create({
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            gender: gender,
            staffID: staffID
        });
    }
};

//export functions
module.exports = createStudent;

/*
// shows all Staff objects
Student.findAll().then(students => {
    console.log(students)
});
*/