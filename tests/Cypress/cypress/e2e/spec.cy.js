describe('Travel Booking System', () => {
    describe('Login Functionality', () => {
        it('should show error message with invalid credentials', () => {

            cy.login({
                email: 'xyz@gmail.com',
                  password: 'mypassword'
                })
            // Assert error message
            cy.contains('These credentials do not match our records.')
                .should('be.visible');
        });
    });
});
