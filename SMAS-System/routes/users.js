var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');

// GET request for login
router.get('/login', login_controller.login_get);

// POST request for login
router.post('/login', login_controller.login_post);

module.exports = router;
