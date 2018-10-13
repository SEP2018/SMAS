var express = require('express');
var router = express.Router();

var staff_daily_controller = require('../controllers/staffDailyController');
var staff_weekly_controller = require('../controllers/staffWeeklyController');
var login_controller = require('../controllers/loginController');

// GET daily appointments
router.get('/daily', login_controller.ensureAuthenticated, staff_daily_controller.staff_daily_get);

// POST daily appointments
router.post('/daily', login_controller.ensureAuthenticated, staff_daily_controller.staff_daily_post);

// GET weekly appointments
router.get('/weekly', login_controller.ensureAuthenticated, staff_weekly_controller.staff_weekly_get);

// POST weekly appointments
router.post('/weekly', login_controller.ensureAuthenticated, staff_weekly_controller.staff_weekly_post);

// POST to populate the daily bookings table
router.post('/dailyBookings/:id', login_controller.ensureAuthenticated, staff_daily_controller.daily_bookings_post);

module.exports = router;