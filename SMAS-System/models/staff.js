const Sequelize = require('sequelize');
var orm = require('./orm');
sequelize = orm.seq;
const Staff = sequelize.define('Staff', {
    employeeID: {
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
module.exports = {
    getAllStaff: async function() {
        return new Promise(function(resolve, reject) {
            return Staff.findAll().then(staff => {
                resolve(staff);
            });
        }).then(staff => {
            return staff;
        });
    }
};

/*
// shows all Staff objects
Staff.findAll().then(staff => {
    console.log(staff)
});
*/