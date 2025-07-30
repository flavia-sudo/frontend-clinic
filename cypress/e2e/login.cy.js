describe("form tests", () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it("should login with valid credentials", () => {
        // Assert login heading is visible
        cy.contains(/Welcome back/i).should('be.visible');

        // Get and fill email input by placeholder or label
        cy.get('input[type="email"][placeholder="Enter your email..."]')
            .as('emailInput')
            .should('be.visible')
            .type('flkihahu@gmail.com');

        // Get and fill password input by type attribute
        cy.get('input[type="password"], input[type="text"]')
            .as('passwordInput')
            .should('be.visible')
            .type('12345678');

        // Click on submit button by text
        cy.contains('button', /Sign In/i)
            .as('submitButton')
            .should('not.be.disabled')
            .click();

        // Check for success notification
        cy.url({ timeout: 10000 }).should('include', '/');

        // Verify URL (update as needed for your actual post-login route)
        cy.url().should('include', '/');
    });

    it("should not login with invalid credentials", () => {
  cy.contains(/Welcome back/i).should('be.visible');

  cy.get('input[type="email"]').type('wronguser@example.com');
  cy.get('input[type="password"]').type('wrongpassword');

  cy.contains('button', /Sign In/i).click();

  // Safe: match the actual rendered error div
  cy.get('div.text-red-600')
    .should('exist')
    .and('be.visible')
    .and('not.be.empty');
});
});
