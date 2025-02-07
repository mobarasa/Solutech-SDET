Feature: View All Tickets

  Scenario: View current month's tickets
    Given I am logged in as an admin
    When I navigate to the tickets page
    Then I should see all tickets for the current month
    And the tickets table should have the correct columns
