##userLogin.feature
Feature: Login to the system
#      I should be able to access the system
#
 Scenario: Doctor is selected
   Given a user has appropriate access credentials
    When they enter their access credentials into SMAS
    Then they are successfully logged in to the system
    And they can view the landing page