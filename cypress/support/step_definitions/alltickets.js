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

When('I navigate to the tickets page', () => {
    cy.visit('/tickets');
});

Then('I should see all tickets for the current month', () => {
    cy.get('.ivu-table-body tr').should('exist');
    cy.get('.ivu-table-body').within(() => {
        cy.contains('pending');
    });
});

Then('the tickets table should have the correct columns', () => {
    const expectedColumns = [
        'Ticket Holder Name',
        'Ticket Email Address',
        'Ticket Number',
        'Created At',
    ];
    expectedColumns.forEach(column => {
        cy.get('.ivu-table-header').should('contain', column);
    });
});
