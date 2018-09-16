#calendarReminder.feature
  Feature: Set Calendar Reminder
      I should be able to opt-in for calendar reminders

  Scenario: User opts to create a calendar event
    Given a user has scheduled an appointment
    When the user opts to create a calendar event
    And the Google account authentication is successful
    Then a Google Calendar reminder is created for the appointment