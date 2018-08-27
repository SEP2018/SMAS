const Sequelize = require('sequelize');
var Staff = require('./staff');
var orm = require('./orm');
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
    employeeID: {
        type: Sequelize.INTEGER,
        references: {
            model: Staff,
            key: 'staffID'
        }
    }
});

// make a new Student object
var createStudent = {
    createStudent : function(firstName, lastName, DOB, gender, employeeID = null){
        Student.create({
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            gender: gender,
            employeeID: employeeID
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