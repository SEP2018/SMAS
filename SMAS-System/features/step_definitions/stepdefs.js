const assert = require('assert');
const { Given, When, Then } = require('cucumber');

    function checkDoctor(doctor) {
        return 'Unsworth';
    }

    Given('a user is logged in to SMAS', function () {

    });

    Given('they navigate to the Create Appointment screen', function () {

    });

    When('they select a preferred doctor', function () {
        this.actualAnswer = checkDoctor('Unsworth');
    });

    Then('the selected doctor is assigned to the appointment', function () {
        assert.equal(this.actualAnswer, 'Thiccsworth');
    });
