var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


// GET request for login
router.get('/login', login_controller.login_get);

// POST request for login
router.post('/login',
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureFlash: false
    })
);

router.get('/logout',(req,res,next) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;
