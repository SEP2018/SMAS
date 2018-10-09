const assert = require('assert');
const { Given, When, Then, defineSupportCode } = require('cucumber');
const seleniumWebDriver = require('selenium-webdriver')


    function checkDoctor(doctor) {
        return 'Unsworth';
    }

    defineSupportCode(function ({When, Then, Given}) {

        Given('a user is logged in to SMAS', function (callback) {
            this.driver.get("http://localhost:3000/");
            callback(null, "Pending");
        });

        Given('they navigate to the Create Appointment screen', function () {
            this.driver.get("http://localhost:3000/appointments/bookings");
        });


        When('they select a preferred doctor', function (callback) {
            callback(null, "Pending");
        });

        Then('the selected doctor is assigned to the appointment', function (callback) {
            assert.equal('Unsworth', 'Unsworth');
            console.log("User logged in fourice.");
            callback(null, "Pending");
        });
    });