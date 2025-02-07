Feature: Tour Creation

  Scenario: Create a basic tour successfully
    Given I am logged in as an admin
    When I navigate to the tour creation page
    And I create a new tour using "validTours.basicTour" data
    Then the tour should be created successfully

  Scenario: Create a local tour successfully
    Given I am logged in as an admin
    When I navigate to the tour creation page
    And I create a new tour using "validTours.localTour" data
    Then the tour should be created successfully

