const Sequelize = require('sequelize');
const orm = require('./orm');
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
}, {
    getterMethods: {
        staffURL() {
            return '/doctors/' + this.staffID;
        }
    }
});

//export functions
module.exports = {
    getAllStaff: async function() {
        return new Promise(function(resolve, reject) {
            return Staff.findAll().catch(function (err) {
                reject(err);
                throw err;
            }).then(staff => {
                resolve(staff);
            });
        }).then(staff => {
            return staff;
        });
    },

    findStaffByID: async function(staffID) {
        return new Promise(function(resolve, reject) {
            return Staff.findAll({
                attributes: ['firstName', 'lastName', 'DOB', 'gender', 'abstract', 'specialisation'],
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
    }
};