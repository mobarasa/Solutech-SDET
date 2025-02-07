const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let users;

before(() => {
    // Load the fixture data before tests
    cy.fixture('users.json').then((userData) => {
        users = userData;
    });
});

Given('I am on the login page', () => {
    cy.visit('/login');
});

When('I login as {string}', (userType) => {
    // Get the user data from the fixtures
    const user = users[userType];
    if (!user) {
        throw new Error(`User type "${userType}" not found in fixtures`);
    }

    // Type email and password
    cy.get('[data-cy=login-email]').type(user.email);
    cy.get('[data-cy=login-password]').type(user.password);
    cy.get('[data-cy=login-submit]').click();
});

When('I enter username {string}', (username) => {
    cy.get('[data-cy=login-email]').type(username);
});

When('I enter password {string}', (password) => {
    cy.get('[data-cy=login-password]').type(password);
});

When('I click the login button', () => {
    cy.get('[data-cy=login-submit]').click();
});

Then('I should be logged in successfully', () => {
    cy.url().should('include', '/dashboard');
});

Then('I should see an error message', () => {
    // Adjust the selector based on your error message element
    cy.get('[data-cy=login-email-error]').should('be.visible');
});
