#SelectDoctor.feature
  Feature: Select Preferred Doctor
      I should be able to select a preferred doctor

  Scenario: Doctor is selected
    Given a user is logged in to SMAS
    And they navigate to the bookings screen
    When they select a preferred doctor
    Then the selected doctor is assigned to the appointment