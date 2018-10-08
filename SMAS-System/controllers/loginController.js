const Student = require('../models/student')
    , Staff = require('../models/staff');

// Validation of form data
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const password1 = "password1";
const password2 = "password1";

const user1 = "Dr. McGraw";
const user2 = "John Smith";
const user1StaffNo = "12345678";
const user2StudentNo = "09876543";

global.currentUser = null;

// Log out
exports.logout = function(req, res){
    global.currentUser = null;
};

exports.login_get = function(req, res){
    res.render('login', {title: 'login'});
};

// Log in with student or staff
exports.login_post = function(req, res){
    // Get test input
    var loginNumber = req.body.loginNumber;
    var password = req.body.password;
    // check for users "in database"
    if (loginNumber === user1StaffNo){
        if (password === password1){
            global.currentUser = user1;
        }
    }
    if (loginNumber === user2StudentNo){
        if (password === password2){
            global.currentUser = user2;
        }
    }

};