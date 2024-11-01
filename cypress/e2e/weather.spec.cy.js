const mockLocation = {
  latitude: 6.891904,
  longitude: 96.1642496,
};

describe("Weather App", () => {
  beforeEach(() => {
    // visit to web app
    cy.visit("/");
  });

  it("Check inital UI components", () => {
    // check search box and search button exist
    cy.get("#default-search").should("exist");
    cy.get(".text-white").should("contain", "Search");
  });

  it("Check current location weather info", () => {
    // Apply mock geolocation for current location, testing browser can't get current location
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (cb) => {
          return cb({ coords: mockLocation });
        }
      );
    });
    // Declare API to get current location weather
    cy.intercept("GET", "https://api.weatherapi.com/v1/forecast.json*").as(
      "getWeatherData"
    );
    // Wait current location weather
    cy.wait("@getWeatherData").then((interceptions) => {
      // Check weather API response
      expect(interceptions.response.body).to.have.property("location");
      expect(interceptions.response.body).to.have.property("current");
      expect(interceptions.response.body.current)
        .to.have.property("temp_c")
        .and.be.a("number");
      // Check UI components of weather data bind
      cy.get(".w-screen > :nth-child(2)").should("be.visible");
      cy.get(".space-y-6").should("be.visible");
      cy.get(".inline-block").should("not.exist");
    });
  });

  it("Check search weather", () => {
    // Declare API to get searched location weather
    cy.intercept(
      "GET",
      /https:\/\/api\.weatherapi\.com\/v1\/forecast\.json\?q=Mandalay&days=5&key=.*/
    ).as("searchWeatherData");
    // Check search input is work
    cy.get("#default-search")
      .should("be.visible")
      .and("be.enabled")
      .focus()
      .should("have.focus")
      .clear()
      .type("Mandalay");
    // Check search button work
    cy.get(".text-white").should("be.visible").and("be.enabled").click();
    // Check loading
    cy.get(".inline-block").should("be.visible");
    // Wait search result
    cy.wait("@searchWeatherData").then((interceptions) => {
      // Check API response
      expect(interceptions?.response?.statusCode).to.eq(200);
      expect(interceptions?.response?.body?.location?.name).to.eq("Mandalay");
      // Check UI components of weather data bind
      cy.get(".w-screen > :nth-child(2)").should("be.visible");
      cy.get(".space-y-6").should("be.visible");
      cy.get(".inline-block").should("not.exist");
    });
  });

  it("Check error in search", () => {
    // Declare API to get searched location weather
    cy.intercept(
      "GET",
      /https:\/\/api\.weatherapi\.com\/v1\/forecast\.json\?q=qqqqq&days=5&key=.*/
    ).as("errorWeather");
    // Check search input is work
    cy.get("#default-search")
      .should("be.visible")
      .and("be.enabled")
      .focus()
      .should("have.focus")
      .type("qqqqq");
    // Check search button work
    cy.get(".text-white").should("be.visible").and("be.enabled").click();
    // Check loading
    cy.get(".inline-block").should("be.visible");
    // Wait search result
    cy.wait("@errorWeather").then(() => {
      // Check error dialog appear
      cy.get(".pb-4").should("be.visible");
      // Check dailog has text 'Error'
      cy.get("#modal-title").should("contain", "Error");
      // Check error message
      cy.get(".mt-2 > .text-sm").should(
        "contain",
        "Can't get weather data for searched location."
      );
      // Check dialog cancel button can clickable
      cy.get(".bg-gray-50 > .mt-3")
        .should("be.visible")
        .should("contain", "Cancel")
        .and("be.enabled")
        .click();
    });
  });
});
