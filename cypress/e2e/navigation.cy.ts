/// <reference types="Cypress" />

describe("navigation", () => {
  it("should go back from Edit and Add new candidate page", () => {
    cy.visit("/");
    cy.get('[data-cy="candidates-logo"]');
    cy.get('[data-cy="add-candidate-btn"]').as("addCandidateButton");
    cy.get('[data-cy="Maggie Frank"] [data-cy="edit-candidate-btn"]').as(
      "editCandidateButton"
    );

    // Cancel button
    cy.get("@addCandidateButton").click();
    cy.get('[data-cy="cancel-btn"]').as("cancelButton");
    cy.get('[data-cy="heading"').as("heading");
    cy.get("@heading").should("contain", "New candidate");
    cy.get("@cancelButton").click();

    // Back
    cy.get("@addCandidateButton").click();
    cy.go("back");

    // Cancel button
    cy.get("@editCandidateButton").click();
    cy.get("@heading").should("contain", "Edit candidate");
    cy.get("@cancelButton").click();

    // Back
    cy.get("@editCandidateButton").click();
    cy.go("back");
  });
});
