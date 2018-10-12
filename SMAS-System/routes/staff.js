var express = require('express');
var router = express.Router();

var staff_daily_controller = require('../controllers/staffDailyController');
var staff_weekly_controller = require('../controllers/staffWeeklyController');

// GET daily appointments
router.get('/daily', staff_daily_controller.staff_daily_get);

// POST daily appointments
router.post('/daily', staff_daily_controller.staff_daily_post);

// GET weekly appointments
router.get('/weekly', staff_weekly_controller.staff_weekly_get);

// POST weekly appointments
router.post('/weekly', staff_weekly_controller.staff_weekly_post);

// POST to populate the daily bookings table
router.post('/dailyBookings/:id', staff_daily_controller.daily_bookings_post);

module.exports = router;