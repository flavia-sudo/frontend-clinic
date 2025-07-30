describe("User Registration Flow", () => {
  const randomSuffix = Math.floor(Math.random() * 100000);
  const testUser = {
    firstName: "Test",
    lastName: "User",
    email: `testuser${randomSuffix}@example.com`,
    phoneNumber: "0712345678",
    address: "123 Test Street",
    password: "testpass123",
  };

  beforeEach(() => {
    cy.visit("/register");
    cy.contains("Sign Up").should("be.visible");
  });

  it("should register a new user and display verification form", () => {
    cy.intercept("POST", "**/auth/register").as("registerRequest");

    cy.get('input[id="firstName"]').type(testUser.firstName);
    cy.get('input[id="lastName"]').type(testUser.lastName);
    cy.get('input[id="phoneNumber"]').type(testUser.phoneNumber);
    cy.get('input[id="email"]').type(testUser.email);
    cy.get('input[id="address"]').type(testUser.address);
    cy.get('input[id="password"]').type(testUser.password);
    cy.get('input[id="confirmPassword"]').type(testUser.password);

    cy.contains("button", /Sign Up/i).click();

    cy.wait("@registerRequest").then((interception) => {
      console.log("➡️ REGISTER RESPONSE:", interception.response?.statusCode, interception.response?.body);
    });

    // Check for the verification UI
    cy.contains(/verify|code|check your email/i, { timeout: 10000 }).should("exist");
    cy.get('input[id="verificationCode"]').should("exist");
  });

  it("should show validation errors on invalid input", () => {
    // Fill form with invalid inputs
    cy.get('input[id="firstName"]').type("a");
    cy.get('input[id="lastName"]').type("b");
    cy.get('input[id="phoneNumber"]').type("12345"); // Invalid phone
    cy.get('input[id="email"]').type("bademail"); // Invalid email
    cy.get('input[id="address"]').type("Some Place");
    cy.get('input[id="password"]').type("123"); // Too short
    cy.get('input[id="confirmPassword"]').type("321"); // Mismatch

    cy.contains("button", /Sign Up/i).click();

  cy.wait(500); // wait briefly for UI updates

    // Dump entire body HTML to debug
    cy.get("body").invoke("html").then((html) => {
      console.log("⛔️ DEBUG BODY HTML:\n", html);
    });
  });
});
