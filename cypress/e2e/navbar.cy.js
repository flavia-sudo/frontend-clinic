describe("Navbar Component", () => {
  const baseUser = {
    userId: 1,
    firstname: "Jane",
    lastname: "Doe",
    email: "jane@example.com",
    phoneNumber: "0712345678",
    verified: true,
  };

  const roles = {
    guest: null,
    user: { ...baseUser, role: null },
    doctor: { ...baseUser, role: "doctor" },
    admin: { ...baseUser, role: "admin" },
  };

  const setUser = (roleKey) => {
    const user = roles[roleKey];
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token", "fake-token");
    } else {
      localStorage.clear();
    }
  };

  beforeEach(() => {
    cy.visit("/");
  });

  const assertDesktopLinks = (role) => {
    cy.get("[data-testid=desktop-home]").should("exist");
    cy.get("[data-testid=desktop-about]").should("exist");

    if (role === "guest") {
      cy.get("[data-testid=desktop-login]").should("exist");
      cy.get("[data-testid=desktop-register]").should("exist");
    } else {
      cy.get("[data-testid=desktop-dashboard]").should("exist");
      cy.get("[data-testid=desktop-profile]").should("exist");
      cy.get("[data-testid=desktop-logout]").should("exist");

      if (role === "doctor") {
        cy.get("[data-testid=desktop-doctor]").should("exist");
      }
      if (role === "admin") {
        cy.get("[data-testid=desktop-admin]").should("exist");
      }
    }
  };

  const assertMobileLinks = (role) => {
    cy.get("[data-testid=mobile-menu-button]").click();
    cy.get("[data-testid=mobile-home]").should("exist");
    cy.get("[data-testid=mobile-about]").should("exist");

    if (role === "guest") {
      cy.get("[data-testid=mobile-login]").should("exist");
      cy.get("[data-testid=mobile-register]").should("exist");
    } else {
      cy.get("[data-testid=mobile-dashboard]").should("exist");
      cy.get("[data-testid=mobile-profile]").should("exist");
      cy.get("[data-testid=mobile-logout]").should("exist");

      if (role === "doctor") {
        cy.get("[data-testid=mobile-doctor]").should("exist");
      }
      if (role === "admin") {
        cy.get("[data-testid=mobile-admin]").should("exist");
      }
    }
  };

  it("renders correctly for guest (desktop + mobile)", () => {
    setUser("guest");
    cy.visit("/");
    assertDesktopLinks("guest");

    cy.viewport(375, 667);
    cy.visit("/");
    assertMobileLinks("guest");
  });

  it("renders correctly for regular user (desktop + mobile)", () => {
    setUser("user");
    cy.visit("/");
    assertDesktopLinks("user");

    cy.viewport(375, 667);
    cy.visit("/");
    assertMobileLinks("user");
  });

  it("renders correctly for doctor (desktop + mobile)", () => {
    setUser("doctor");
    cy.visit("/");
    assertDesktopLinks("doctor");

    cy.viewport(375, 667);
    cy.visit("/");
    assertMobileLinks("doctor");
  });

  it("renders correctly for admin (desktop + mobile)", () => {
    setUser("admin");
    cy.visit("/");
    assertDesktopLinks("admin");

    cy.viewport(375, 667);
    cy.visit("/");
    assertMobileLinks("admin");
  });

  it("logs out user from desktop", () => {
    setUser("user");
    cy.visit("/");
    cy.get("[data-testid=desktop-logout]").click();
    cy.url().should("include", "/login");
    cy.get("[data-testid=desktop-login]").should("exist");
  });

  it("logs out user from mobile", () => {
    setUser("user");
    cy.viewport(375, 667);
    cy.visit("/");
    cy.get("[data-testid=mobile-menu-button]").click();
    cy.get("[data-testid=mobile-logout]").click();
    cy.url().should("include", "/login");
  });
});
