const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const Student = require('../models/student');

passport.use(new LocalStrategy(
    function(username, password, done) {
        Student.findUsernameByID(username).then(function(user) {
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
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //Use first line for development (always goes to next page regardless of authentication status) and second line for production (actually requires authentication)
        //return next();
        res.redirect('/users/login');
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
    res.render('login');
};

//NOT USED AT THE MOMENT BECAUSE IT DOESN'T RUN UNLESS IT'S IN THE USERS.JS ROUTER
exports.login_post = function(){
    console.log('Login post start');
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' + req.user.username,
        failureFlash: true })
};

//NOT USED AT THE MOMENT BECAUSE IT DOESN'T RUN UNLESS IT'S IN THE USERS.JS ROUTER
exports.logout_get = function(res, req){
    req.logOut();
    res.redirect('/');
};