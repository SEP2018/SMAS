const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const Student = require('../models/student');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Student.findUsernameByID(username).then(function(user) {
            console.log('User is: ' + user);
            console.log('User is: ' + user.valueOf());
            console.log('User.username is: ' + user.username);
            console.log('User.username is: ' + user.studentID);
            console.log('username is: ' + username);
            console.log('password is: ' + password);
            if (!user.studentID === username) {
                console.log('Incorrect username.');
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.password === password) {
                console.log('Incorrect password.');
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('Successfully authenticated with user: ' + user.studentID + ' and password: ' + user.password);
            done(null, user);
        });
    }
));

//check if user is logged in
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
};

passport.serializeUser(function(user, done) {
    console.log('User is: ' + user);
    console.log('User is: ' + Object.values(user));
    console.log('User.username is: ' + user.username);
    console.log('User.username is: ' + user.studentID);

    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    Student.findUsernameByID(username).then(function(user) {
        done(null, user);
    }).catch(function(err){
        done(err,false);
    });
});

exports.login_get = function(req, res){
    res.render('login');
};

//NOT USED AT THE MOMENT BECAUSE IT DOESN'T RUN UNLESS IT'S IN THE USERS.JS ROUTER
exports.login_post = function(){
    console.log('Login post start');
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
};


