#viewServices.feature
  Feature: View Available Services
      I should be able to see all available medical services

  Scenario: User selects 'Services'
    Given a user has opened SMAS
    When the user selects 'Services'
    Then a list of available medical services is visible on the screen