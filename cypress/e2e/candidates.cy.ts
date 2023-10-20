/// <reference types="Cypress" />

describe("candidates", () => {
  it("should add/edit/remove a candidate", () => {
    cy.visit("/");

    // Add
    cy.get('[data-cy="add-candidate-btn"]').click();
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

  it("should filter a list of candidates", () => {
    cy.visit("/");

    // Search by name
    cy.get('[data-cy="search-candidates"]').as("searchCandidatesInput");
    cy.get("@searchCandidatesInput").type("ruby");
    cy.get('[data-cy="Ruby Elliott"]').should("contain", "Ruby Elliott");
    cy.get('[data-cy="Maggie Frank"]').should("not.exist");
    cy.get('[data-cy="no-results"]').should("not.exist");

    cy.get('[data-cy="clear-btn"]').click();
    cy.get("@searchCandidatesInput").type("maggie");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Ruby Elliott"]').should("not.exist");
    cy.get('[data-cy="no-results"]').should("not.exist");

    // Search by skills
    cy.get('[data-cy="clear-btn"]').click();
    cy.get("@searchCandidatesInput").type("php");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Ruby Elliott"]').should("not.exist");
    cy.get('[data-cy="no-results"]').should("not.exist");

    // Combine skills and name
    cy.get('[data-cy="clear-btn"]').click();
    cy.get("@searchCandidatesInput").type("frank php");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Rob Frank"]').should("not.exist");
    cy.get('[data-cy="no-results"]').should("not.exist");

    // Persist search params when editing filtered candidate
    cy.get('[data-cy="clear-btn"]').click();
    cy.get("@searchCandidatesInput").type("frank php");
    cy.get('[data-cy="Maggie Frank"] [data-cy="edit-candidate-btn"]').click();
    cy.get('[data-cy="candidate-name"]').as("candidateName");
    cy.get("@candidateName").clear();
    cy.get("@candidateName").type("Jane Doe");
    cy.get('[data-cy="submit-btn"]').click();
    cy.get("@searchCandidatesInput").should("have.value", "frank php");
    cy.get('[data-cy="no-results"]').should("exist");
  });
});
