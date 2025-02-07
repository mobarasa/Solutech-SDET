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

afterEach(function () {
    // cy.get('[data-cy="dashboard-link"]').click();
    cy.get('span.inline-flex > .inline-flex').click();
    cy.get('[data-cy="logout-navigation-link"] > .block').click();
});

Given('I am logged in as an admin', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-email]').type('admin@account.com');
    cy.get('[data-cy=login-password]').type('password');
    cy.get('[data-cy=login-submit]').click();
    cy.url().should('include', '/dashboard');
});

When('I navigate to the tour creation page', () => {
    cy.visit('/dashboard');
    cy.get('[data-cy="tours-navigation-link"]').click();
    cy.get('[data-cy="create-tour-button"] > span').click();
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

    cy.get('[data-cy="submit-button"] > span').click();
});

Then('the tour should be created successfully', () => {
    cy.get('.ivu-message-notice-content-success').should('be.visible');
});

Then('I should see validation error for tour name', () => {
    cy.get('.ivu-message-notice-content-error').should('be.visible');
});

