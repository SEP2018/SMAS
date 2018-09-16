#viewDoctors.feature
  Feature: View medical staff information
      I should be able to view medical staff information

  Scenario: User selects 'View Doctors'
    Given a user has opened SMAS
    When the user selects 'View Doctors'
    Then a list of medical staff information is visible on the screen