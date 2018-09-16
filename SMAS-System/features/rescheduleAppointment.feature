#rescheduleAppointment.feature
  Feature: Reschedule appointment
      I should be able to reschedule an existing appointment

  Scenario: Reschedule Appointment is selected
    Given a user is logged in to SMAS
    And the user has booked at least one appointment
    When the user selects 'Reschedule Appointment'
    And the user selects a new date/time
    Then the appointment date/time is updated in the system