describe('Travel Booking System', () => {
    beforeEach(() => {
        // Load users fixture data
        cy.fixture("users").then(function (userData) {
            globalThis.userData = userData;
        });
        // Load tours fixture data
        cy.fixture("tours").then(function (tourData) {
            globalThis.tourData = tourData;
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

    it('create_tour', function () {
        cy.visit('/dashboard');
        cy.get('[data-cy="tours-navigation-link"]').click();
        cy.get('[data-cy="create-tour-button"] > span').click();
        cy.get('[data-cy="tour-name-input"]').type(tourData.validTours.name);
        cy.get('[data-cy="tour-description-input"]').type(tourData.validTours.description);
        cy.get('.ivu-select-placeholder').click();
        cy.get('.ivu-select-dropdown-list > :nth-child(1)').click();
        cy.get('[data-cy="tour-price-input"]').type(tourData.validTours.price);
        cy.get('[data-cy="tour-slots-input"]').type(tourData.validTours.slots);
        cy.get('[data-cy="submit-button"] > span').click();
    });

});
