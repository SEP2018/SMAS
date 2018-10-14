const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const Student = require('../models/student');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Student.findUsernameByID(username).then(function(user) {
            if(user[0] === undefined ){
                return done(null, false, { message: 'User does not exist.' })
            }
            if (!(user[0].username == username)) {
                console.log('Incorrect username console.');
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!(user[0].password == password)) {
                console.log('Incorrect password console.');
                return done(null, false, { message: 'Incorrect username.' });
            }
            console.log('Successfully authenticated.');
            done(null, user);
        });
    }
));

//check if user is logged in
exports.ensureAuthenticatedStudent = function(req, res, next) {
    if (typeof req.user !== "undefined"){
        if (req.user[0].type == 'staff')
            res.redirect('/staff/daily');
    }
    if (req.isAuthenticated()) {
        return next();
    } else {
        //Use first line for development (always goes to next page regardless of authentication status) and second line for production (actually requires authentication)
        //return next();
        res.redirect('/users/login/');
    }
};

exports.ensureAuthenticatedStaff = function(req, res, next) {
    if (req.user[0].type == 'student')
        res.redirect('/');
    if (req.isAuthenticated()) {
        return next();
    } else {
        //Use first line for development (always goes to next page regardless of authentication status) and second line for production (actually requires authentication)
        //return next();
        res.redirect('/users/login/');
    }
};

passport.serializeUser(function(user, done) {
    done(null, user[0].username);
});

passport.deserializeUser(function(username, done) {
    Student.findUsernameByID(username).then(function(user) {
        done(null, user);
    }).catch(function(err){
        done(err,false);
    });
});

exports.login_get = function(req, res){
    res.render('login', {failure: req.query.error});
};