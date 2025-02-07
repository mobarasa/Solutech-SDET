// ***********************************************
// Custom commands to overwrite existing commands.
// ***********************************************

/*-- Login --*/
Cypress.Commands.add('login', (userCredentials) => {
    cy.session("Auth Access", () => {
        cy.visit('/login');

        cy.get('[data-cy=login-form]').within(() => {
            cy.get('[data-cy=login-email]').type(userCredentials.email);
            cy.get('[data-cy=login-password]').type(userCredentials.password);
            cy.get('[data-cy=login-submit]').click();
        });
    },
        {
            cacheAcrossSpecs: true,
        });
});

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
