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

        Given('a user has logged in to SMAS', function () {
            return this.driver.get("http://localhost:3000/users/login")
                .then(() => this.driver.findElement(By.name('username')).sendKeys('12876049'))
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => this.driver.findElement(By.name('submitLogin')).click())
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                .then(() => console.log('Login successful'));
        });

        Given('the user has booked at least one appointment', function (callback) {
            callback();
        });


        When("they select the 'Bookings' button", function () {
            return this.driver.findElement(By.name('bookingsLink')).click()
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                .then(() => console.log('Bookings page loaded'));
        });

        Then('a list of existing appointments is displayed on the screen', function (callback) {
            return expect(this.driver.wait(Until.elementLocated(By.id('existingAppointments'))).then(() => console.log('Page loaded successfully'))
                .then(() => callback()));
        });
    });