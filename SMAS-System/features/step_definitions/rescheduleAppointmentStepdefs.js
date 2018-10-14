const assert = require('assert');
const { Given, When, Then, defineSupportCode } = require('cucumber');
const seleniumWebDriver = require('selenium-webdriver');
const By = seleniumWebDriver.By;
const Until = seleniumWebDriver.until;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


    defineSupportCode(function ({When, Then, Given}) {

        Given('a user logged in to SMAS', function () {
            return this.driver.get("http://localhost:3000/users/login")
                .then(() => this.driver.findElement(By.name('username')).sendKeys('12876049'))
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => this.driver.findElement(By.name('submitLogin')).click())
                    .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                        .then(() => console.log('Login successful'));
        });

        Given('the user has at least one appointment', function () {
            return this.driver.findElement(By.name('bookingsLink')).click()
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                    .then(() => console.log('Bookings page loaded'));
        });


        When("the user selects 'Reschedule Appointment'", function () {
            return this.driver.wait(Until.elementLocated(By.id('editButton')))
                .then(() => this.driver.findElement(By.id('editButton')).click())
                    .then(() => console.log('Edit button selected'));
        });

        When("the user selects a new time", function() {
            return this.driver.findElement(By.id('time_dropdown')).click()
                .then(() => this.driver.findElement(By.id('9:15am')).click())
                .then(() => console.log('Time selected'));
        });

        Then('the appointment time is updated', function (callback) {
            const time = this.driver.findElement(By.id('time_dropdown'));
            time.getAttribute('value').then(function(selected)
            {
                if (selected === '1970-01-01T09:15:00.000Z') {
                    console.log(selected);
                    console.log('Correct date changed');
                    callback();
                }
                else
                    callback('Wrong date value');
            });
        });
    });