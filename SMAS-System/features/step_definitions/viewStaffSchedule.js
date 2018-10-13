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

        Given('a staff member logs in to SMAS', function () {
            return this.driver.get("http://localhost:3000/users/login")
                .then(() =>this.driver.findElement(By.name('username')).sendKeys('12345678'))
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => console.log("Staff details entered"));
        });

        When("they select the 'login' button", function () {
            return this.driver.findElement(By.name('submitLogin')).click().then(() => console.log("Login button clicked"));
        });

        Then('a list of appointments for the day is displayed on screen', function (callback) {
            return expect(this.driver.wait(Until.elementLocated(By.id('dailyAppointments'))).then(() => console.log('Page loaded successfully'))
                .then(() => callback()));
        });
    });