const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

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

When('I navigate to the bookings page', () => {
    cy.visit('/bookings');
});

Then('I should see all bookings for the current month', () => {
    cy.get('.ivu-table-body tr').should('exist');
    cy.get('.ivu-table-body').within(() => {
        cy.contains('pending');
    });
});

Then('the bookings table should have the correct columns', () => {
    const expectedColumns = [
        'Booked By',
        'Tour Name',
        'Status',
        'Ticket Number',
        'Created At',
    ];
    expectedColumns.forEach(column => {
        cy.get('.ivu-table-header').should('contain', column);
    });
});
