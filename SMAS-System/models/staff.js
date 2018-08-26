const Sequelize = require('sequelize');
var orm = require('./orm');
sequelize = orm.seq;
const Staff = sequelize.define('Staff', {
    staffID: {
        type: Sequelize.INTEGER,
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
    abstract: {
        type: Sequelize.STRING
    },
    specialisation: {
        type: Sequelize.STRING
    }
});

// make a new Room object
var createStaff = {
    createStaff : function(firstName, lastName, DOB, gender, abstract = null, specialisation = null){
        Staff.create({
            firstName: firstName,
            lastName: lastName,
            DOB: DOB,
            gender: gender,
            abstract: abstract,
            specialisation: specialisation
        });
    }
};

//export functions
module.exports = createStaff;

/*
// shows all Staff objects
Staff.findAll().then(staff => {
    console.log(staff)
});
*/