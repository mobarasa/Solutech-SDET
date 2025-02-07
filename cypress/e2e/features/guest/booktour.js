const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let guestData;

before(() => {
    cy.fixture("guests").then((data) => {
        guestData = data;
    });
});

afterEach(function () {
    cy.reload();
})

Given('I am a guest visiting the website', () => {
    cy.visit('');
});

When('I select a tour to book', () => {
    cy.get(':nth-child(2) > .relative > .flex > [data-cy="book-tour-button"]').click();
});

When('I enter my booking details', () => {
    cy.get('[data-cy="input-slots"]').type(guestData.book_tour_slots);
    cy.get('[data-cy="input-user-name"]').type(guestData.guest_name);
    cy.get('[data-cy="input-email-address"]').type(guestData.guest_email);
});

When('I confirm my booking', () => {
    cy.get('[data-cy="book-tour-modal"] > .ivu-modal-content > .ivu-modal-footer > .ivu-btn-primary > span').click();
});

Then('I should see my booking confirmation with correct details', () => {
    cy.get('[data-cy="ticket-modal"] > .ivu-modal-content').should('be.visible');
    cy.get('[data-cy="ticket-holder"]').should('contain.text', `Ticket Holder: ${guestData.guest_name}`);
    cy.get('[data-cy="ticket-email"]').should('contain.text', `Email Address: ${guestData.guest_email}`);
});
