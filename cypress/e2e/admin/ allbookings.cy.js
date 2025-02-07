describe('Travel Booking System', () => {
    beforeEach(() => {
        // Load users fixture data
        cy.fixture("users").then(function (userData) {
            globalThis.userData = userData;
        });
        cy.visit('');
    });

    it('should successfully login', () => {
        cy.get('[data-cy="login-link"]').click();
        cy.get('[data-cy="login-email"]').clear();
        cy.get('[data-cy="login-email"]').type('admin@account.com');
        cy.get('[data-cy="login-password"]').clear();
        cy.get('[data-cy="login-password"]').type('password');
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('view_booking', function() {
        cy.visit('/dashboard');
        cy.get('[data-cy="bookings-navigation-link"]').click();
        cy.get('.ivu-table-row > .ivu-table-column-EEgsmS > .ivu-table-cell > span').click();
    });
});
