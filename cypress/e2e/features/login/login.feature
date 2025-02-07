Feature: Login Functionality

  Scenario: Failed login with invalid user
    Given I am on the login page
    When I login as "invalidUser"
    Then I should see an error message

  Scenario: Successful login as admin
    Given I am on the login page
    When I login as "adminUser"
    Then I should be logged in successfully
