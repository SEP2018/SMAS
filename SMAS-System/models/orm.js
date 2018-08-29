const Sequelize = require('sequelize');
dotenvLocation = "../";
require('dotenv').load(dotenvLocation+".env");

const sequelize = new Sequelize('SMASDatabase', 'smasadmin', process.env['ADMIN_PASS'], {
    dialect: 'mssql',
    host: 'smas.database.windows.net',
    operatorsAliases: false,
    dialectOptions: {
        encrypt: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true,
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//exports sequelize object
module.exports.seq = sequelize;
