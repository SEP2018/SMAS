#viewServices.feature
  Feature: View Available Services
      I should be able to see all available medical services

  Scenario: User selects 'View Services'
    Given a user has opened SMAS
    When the user selects 'View Services'
    Then a list of available medical services is visible on the screen 