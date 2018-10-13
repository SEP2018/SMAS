'use strict';

var {defineSupportCode} = require('cucumber');
var webDriver = require('selenium-webdriver');
require("chromedriver");

/*var buildChromeDriver = function() {
    return new Builder().forBrowser("chrome").build();
};
*/

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(30 * 1000);
});

function CustomWorld() {

    this.driver = new webDriver.Builder()
        .withCapabilities(['--no-sandbox', '--headless', '--disable-gpu']).
        forBrowser("chrome").build();

};

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(CustomWorld);
});