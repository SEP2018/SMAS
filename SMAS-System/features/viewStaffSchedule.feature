#viewStaffSchedule.feature
  Feature: View Staff Schedule
      I should be able to see my appointments for the day

  Scenario: Staff member selects 'My Schedule'
    Given a staff member logs in to SMAS
    When they select the 'login' button
    Then a list of appointments for the day is displayed on screen