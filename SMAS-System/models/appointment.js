const Sequelize = require('sequelize');
require('dotenv').config({path: '../.env'});
const sequelize = new Sequelize('SMASDatabase', 'smasadmin', process.env['ADMIN_PASS'], {
    dialect: 'mssql',
    operatorsAliases: false,
    server: 'smas.database.windows.net',
    port: 8080,
    options: {
        encrypt: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });