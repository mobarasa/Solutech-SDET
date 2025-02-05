describe('Travel Booking System', () => {
    describe('Login Functionality', () => {
        it('should show error message with invalid credentials', () => {
            cy.visit('/login');

            // Enter invalid credentials
            cy.get('#email').type('invalid@email.com');
            cy.get('#password').type('wrongpassword');
            cy.contains('Log in').click();
            // cy.get('[data-cy=login-button]').click();

            // Assert error message
            cy.contains('These credentials do not match our records.')
                .should('be.visible');
        });
    });
});
