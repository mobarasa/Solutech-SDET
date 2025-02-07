describe('Guest - Book Tour', () => {
    beforeEach(() => {
        // Load guests fixture data
        cy.fixture("guests").then(function (guestData) {
            globalThis.guestData = guestData;
        });
        cy.visit('');
    });

    it('As a guest I should successfully book a tour', function () {
        cy.visit('');
        cy.get(':nth-child(2) > .relative > .flex > [data-cy="book-tour-button"]').click();
        cy.get('[data-cy="input-slots"]').type(guestData.book_tour_slots);
        cy.get('[data-cy="input-user-name"]').type(guestData.guest_name);
        cy.get('[data-cy="input-email-address"]').type(guestData.guest_email);
        cy.get('[data-cy="book-tour-modal"] > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary > span').click();
        cy.get('[data-cy="ticket-modal"] > .ivu-modal-content').should('be.visible');
        cy.get('[data-cy="ticket-holder"]').should('contain.text', `Ticket Holder: ${guestData.guest_name}`);
        cy.get('[data-cy="ticket-email"]').should('contain.text', `Email Address: ${guestData.guest_email}`);
    });
});
