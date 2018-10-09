'use strict';

var {defineSupportCode} = require('cucumber');
var webDriver = require('selenium-webdriver');
var chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service)
var fs = require('fs');
var platform = process.env.PLATFORM || "CHROME";

/*var buildChromeDriver = function() {
    return new Builder().forBrowser("chrome").build();
};
*/

var buildDriver = function() {
            return new webDriver.Builder().withCapabilities(webDriver.Capabilities.chrome()).build();
    }

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

var World = function World() {

    var screenshotPath = "screenshots";

    this.driver = buildDriver();

    if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }

};

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(World);
});