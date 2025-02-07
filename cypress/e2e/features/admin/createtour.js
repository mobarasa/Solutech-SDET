const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let tours;

before(() => {
    // Load the fixture data before tests
    cy.fixture('users.json').then((userData) => {
        users = userData;
    });

    cy.fixture('tours.json').then((toursData) => {
        tours = toursData;
    });
});

Given('I am logged in as an admin', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@account.com');
    cy.get('[data-cy=login-password]').type('password');
    cy.get('[data-cy=login-submit]').click();
});

When('I navigate to the tour creation page', () => {
    cy.visit('/tours/create'); // Adjust the URL as needed
});

When('I create a new tour using {string} data', (tourDataPath) => {
    // Get nested object using path (e.g., "validTours.basicTour")
    const tourData = tourDataPath.split('.').reduce((obj, key) => obj[key], tours);

    // Fill in the form fields using the correct data-cy attributes
    cy.get('[data-cy=tour-name-input] input').type(tourData.name);
    cy.get('[data-cy=tour-description-input] input').type(tourData.description);

    // Handle the destination select
    cy.get('[data-cy=tour-destination-select]').click();
    cy.get('[data-cy=tour-destination-option]')
        .contains(tourData.destination)
        .click();

    cy.get('[data-cy=tour-price-input] input').type(tourData.price);
    cy.get('[data-cy=tour-slots-input] input').type(tourData.slots);

    // Submit the form (add the submit button data-cy attribute)
    cy.get('[data-cy=tour-submit]').click();
});

Then('the tour should be created successfully', () => {
    // Adjust these assertions based on your success indicators
    cy.get('[data-cy=success-message]').should('be.visible');
    // Add any additional success verifications
});

Then('I should see validation error for tour name', () => {
    cy.get('[data-cy=tour-name-input]')
        .parent()
        .should('have.class', 'ivu-form-item-error');
});

Then('I should see validation error for tour price', () => {
    cy.get('[data-cy=tour-price-input]')
        .parent()
        .should('have.class', 'ivu-form-item-error');
});

Then('I should see validation error for tour slots', () => {
    cy.get('[data-cy=tour-slots-input]')
        .parent()
        .should('have.class', 'ivu-form-item-error');
});
