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

        Given('a user has appropriate access credentials', function () {
            return this.driver.get("http://localhost:3000/").then(() => console.log("Bookings screen found"));
        });

        When('they enter their access credentials into SMAS', function () {
            return this.driver.findElement(By.name('username')).sendKeys('12876049')
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => console.log("Details entered"));
        });


        Then('they are successfully logged in to the system', function () {
            return this.driver.findElement(By.name('submitLogin')).click().then(() => console.log("Login button clicked"));
        });

        Then('they can view the landing page', function (callback) {
            return expect(this.driver.wait(Until.elementLocated(By.name('selectedService'))).then(() => console.log('Page loaded successfully'))
                .then(() => callback()));
        });
    });