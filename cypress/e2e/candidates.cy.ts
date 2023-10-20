/// <reference types="Cypress" />

describe("candidates", () => {
  it("should add/edit/remove a candidate", () => {
    cy.visit("/");
    cy.get('[data-cy="add-candidate-btn"]').click();

    // Add
    cy.get('[data-cy="candidate-name"]').as("candidateName");
    cy.get("@candidateName").type("John Doe");
    cy.get('[data-cy="candidate-date-of-birth"]').type("2000-12-12");
    cy.get('[data-cy="candidate-contact-number"]').type("+381123123");
    cy.get('[data-cy="candidate-email"]').type("test@example.com");
    cy.get('[data-cy="candidate-skills"]').type("Photoshop,");
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="John Doe"]').should("contain", "John Doe");

    // Edit
    cy.get('[data-cy="John Doe"] [data-cy="edit-candidate-btn"]').click();
    cy.get("@candidateName").clear();
    cy.get("@candidateName").type("Jane Doe");
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="Jane Doe"]').should("contain", "Jane Doe");

    // Remove
    cy.get('[data-cy="Jane Doe"] [data-cy="remove-candidate-btn"]').click();
    cy.get('[data-cy="Jane Doe"]').should("not.exist");
  });
});
