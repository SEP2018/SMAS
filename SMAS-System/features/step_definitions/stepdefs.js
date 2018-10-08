const assert = require('assert');
const { Given, When, Then, defineSupportCode } = require('cucumber');
const seleniumWebDriver = require('selenium-webdriver')


    function checkDoctor(doctor) {
        return 'Unsworth';
    }

    defineSupportCode(function ({When, Then, Given}) {

        Given('a user is logged in to SMAS', function (callback) {
            this.driver.get("https://www.google.com")
            callback(null, "Pending")
        });


        When('they select a preferred doctor', function (callback) {
            this.actualAnswer = checkDoctor('Unsworth');
            console.log("User logged in. thrice")
            callback(null, "Pending")
        });

        Then('the selected doctor is assigned to the appointment', function (callback) {
            assert.equal(this.actualAnswer, 'Unsworth');
            console.log("User logged in fourice.")
            callback(null, "Pending")
        });
    });