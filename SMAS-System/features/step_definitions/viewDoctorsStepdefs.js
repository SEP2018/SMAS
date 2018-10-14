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

        Given('a user opened SMAS', function () {
            return this.driver.get("http://localhost:3000/users/login")
                .then(() => this.driver.findElement(By.name('username')).sendKeys('12876049'))
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => this.driver.findElement(By.name('submitLogin')).click())
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                .then(() => console.log('Login successful'));
        });

        When("the user selects 'Doctors'", function () {
            return this.driver.findElement(By.name('doctorsLink')).click()
                .then(() => console.log('Doctors page loaded'));
        });

        Then('a list of medical staff information is visible on the screen', function (callback) {
            return expect(this.driver.wait(Until.elementLocated(By.name('itemDiv'))).then(() => console.log('Page loaded successfully'))
                .then(() => callback()));
        });
    });