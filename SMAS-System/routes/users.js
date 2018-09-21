var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');

/* GET login page. */
router.get('/login', login_controller.login_get);

module.exports = router;
