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
        cy.get('[data-cy="login-email"]').type(userData.adminUser.email);
        cy.get('[data-cy="login-password"]').clear();
        cy.get('[data-cy="login-password"]').type(userData.adminUser.password);
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('As admin I should successfully view all tickets for a tour', function() {
        cy.visit('/dashboard');
        cy.get('[data-cy="tickets-navigation-link"]').click();
        cy.get('[data-cy="tickets-table"]').should('be.visible');
    });

    it('should successfully logout', function() {
        cy.get('[data-cy="dashboard-link"]').click();
        cy.get('span.inline-flex > .inline-flex').click();
        cy.get('[data-cy="logout-navigation-link"] > .block').click();
    });
});
