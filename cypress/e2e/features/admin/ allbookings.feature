Feature: View All Bookings

  Scenario: View current month's bookings
    Given I am logged in as an admin
    When I navigate to the bookings page
    Then I should see all bookings for the current month
    And the bookings table should have the correct columns
