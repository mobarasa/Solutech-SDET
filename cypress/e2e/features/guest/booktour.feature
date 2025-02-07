Feature: Guest Book Tour

  Scenario: A guest books a tour successfully
    Given I am a guest visiting the website
    When I select a tour to book
    And I enter my booking details
    And I confirm my booking
    Then I should see my booking confirmation with correct details
