/// <reference types="Cypress" />

describe("candidates", () => {
  it("should add/edit/remove a candidate", () => {
    cy.visit("/");
    cy.get('[data-cy="candidates-logo"]');

    // Add
    cy.get('[data-cy="add-candidate-btn"]').click();
    cy.get('[data-cy="submit-btn"]').as("submitButton");
    cy.get('[data-cy="candidate-name"]').as("candidateName");
    cy.get("@candidateName").type("John Doe");
    cy.get('[data-cy="candidate-date-of-birth"]').type("2000-12-12");
    cy.get('[data-cy="candidate-contact-number"]').type("+123123123123");
    cy.get('[data-cy="candidate-email"]').type("test@example.com");
    cy.get('[data-cy="candidate-skills"]').type("Photoshop,");
    cy.get("@submitButton").should("be.enabled");
    cy.get("@submitButton").click();
    cy.get('[data-cy="John Doe"]').should("contain", "John Doe");

    // Edit
    cy.get('[data-cy="John Doe"] [data-cy="edit-candidate-btn"]').click();
    cy.get("@submitButton").should("be.enabled");
    cy.get("@candidateName").clear();
    cy.get("@candidateName").type("Jane Doe");
    cy.get("@submitButton").click();
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
    cy.get('[data-cy="no-results-placeholder"]').should("not.exist");

    cy.get("@searchCandidatesInput").clear();
    cy.get("@searchCandidatesInput").type("maggie");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Ruby Elliott"]').should("not.exist");
    cy.get('[data-cy="no-results-placeholder"]').should("not.exist");

    // Search by skills
    cy.get("@searchCandidatesInput").clear();
    cy.get("@searchCandidatesInput").type("php");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Ruby Elliott"]').should("not.exist");
    cy.get('[data-cy="no-results-placeholder"]').should("not.exist");

    // Combine skills and name
    cy.get("@searchCandidatesInput").clear();
    cy.get("@searchCandidatesInput").type("frank php");
    cy.get('[data-cy="Maggie Frank"]').should("contain", "Maggie Frank");
    cy.get('[data-cy="Rob Frank"]').should("not.exist");
    cy.get('[data-cy="no-results-placeholder"]').should("not.exist");

    // No results message
    cy.get("@searchCandidatesInput").clear();
    cy.get("@searchCandidatesInput").type("lalalalalala");
    cy.get('[data-cy="no-results-placeholder"]').should("exist");

    // Persist search params when editing filtered candidate
    cy.get("@searchCandidatesInput").clear();
    cy.get("@searchCandidatesInput").type("frank php");
    cy.get('[data-cy="Maggie Frank"] [data-cy="edit-candidate-btn"]').click();
    cy.get('[data-cy="candidate-name"]').as("candidateName");
    cy.get("@candidateName").clear();
    cy.get("@candidateName").type("Jane Doe");
    cy.get('[data-cy="submit-btn"]').click();
    cy.get("@searchCandidatesInput").should("have.value", "frank php");
    cy.get('[data-cy="no-results-placeholder"]').should("exist");
  });

  it("should not allow adding a candidate if the list of candidates is not loaded from the main page", () => {
    cy.visit("/#/new-candidate");
    cy.get('[data-cy="candidates-logo"]').should("exist");
  });

  it("should not allow editing a candidate if candidate is not selected from the main page", () => {
    cy.visit("/#/edit-candidate");
    cy.get('[data-cy="candidates-logo"]').should("exist");
  });

  it("should validate the inputs on New Candidate page and not allow adding a candidate", () => {
    cy.visit("/");
    cy.get('[data-cy="add-candidate-btn"]').click();

    cy.get('[data-cy="submit-btn"]').as("submitButton");
    cy.get('[data-cy="candidate-name"]').as("candidateName");
    cy.get('[data-cy="candidate-date-of-birth"]').as("candidateDateOfBirth");
    cy.get('[data-cy="candidate-contact-number"]').as("candidateContactNumber");
    cy.get('[data-cy="candidate-email"]').as("candidateEmail");
    cy.get('[data-cy="candidate-skills"]').as("candidateSkills");

    cy.get("@submitButton").click();

    // // Validation errors
    cy.get('[data-cy="candidate-name-error"]').as("invalidName");
    cy.get('[data-cy="candidate-date-of-birth-error"]').as("invalidDate");
    cy.get('[data-cy="candidate-contact-number-error"]').as("invalidPhone");
    cy.get('[data-cy="candidate-email-error"]').as("invalidEmail");
    cy.get('[data-cy="candidate-skills-error"]').as("invalidSkills");
    cy.get("@invalidName").should("contain", "Name is required");
    cy.get("@invalidDate").should("contain", "Date of Birth is required");
    cy.get("@invalidPhone").should("contain", "Contact Number is required");
    cy.get("@invalidEmail").should("contain", "E-mail is required");
    cy.get("@invalidSkills").should("contain", "Skills are required");

    cy.get("@candidateName").type("John");
    cy.get("@candidateDateOfBirth").type("2000-12-12");
    cy.get("@candidateContactNumber").type("+123123123123");
    cy.get("@candidateEmail").type("test@example.com");
    cy.get("@candidateSkills").type("Photoshop");
    cy.get("@candidateSkills").blur();

    cy.get("@invalidName").should("not.exist");
    cy.get("@invalidDate").should("be.empty");
    cy.get("@invalidPhone").should("be.empty");
    cy.get("@invalidEmail").should("be.empty");
    cy.get("@invalidSkills").should("be.empty");
  });
});
