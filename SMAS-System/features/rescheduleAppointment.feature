#rescheduleAppointment.feature
  Feature: Reschedule appointment
      I should be able to reschedule an existing appointment

  Scenario: Reschedule Appointment is selected
    Given a user logged in to SMAS
    And the user has at least one appointment
    When the user selects 'Reschedule Appointment'
    And the user selects a new time
    Then the appointment time is updated