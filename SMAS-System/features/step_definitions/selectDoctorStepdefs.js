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

        Given('a user is logged in to SMAS', function () {
            return this.driver.get("http://localhost:3000/users/login")
                .then(() => this.driver.findElement(By.name('username')).sendKeys('12876049'))
                .then(() => this.driver.findElement(By.name('password')).sendKeys('password1'))
                .then(() => this.driver.findElement(By.name('submitLogin')).click())
                    .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                        .then(() => console.log('Login successful'));
        });

        Given('they navigate to the Create Appointment screen', function () {
            return this.driver.findElement(By.name('bookingsLink')).click()
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                .then(() => this.driver.wait(Until.elementLocated(By.name('selectedService'))))
                    .then(() => console.log('Bookings page loaded'));
        });


        When('they select a preferred doctor', function () {
            return this.driver.findElement(By.name('selectedService')).click()
                .then(() => this.driver.findElement(By.id('3')).click())
                    .then(() => console.log('Service 3 selected'))
                    .then(() => this.driver.findElement(By.name('selectedStaff')).click())
                        .then(() => this.driver.findElement(By.id('12345678')).click())
                            .then(() => console.log('Doctor selected'));
        });

        Then('the selected doctor is assigned to the appointment', function (callback) {
            const staff = this.driver.findElement(By.name('selectedStaff'));
            staff.getAttribute('value').then(function(selected)
            {
                if (selected === '12345678') {
                    console.log('Correct doctor assigned');
                    callback();
                }
                else
                    done(new Error('Wrong doctor'));
            });
        });
    });