const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { preprocessor } = require("@badeball/cypress-cucumber-preprocessor/browserify");

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        baseUrl: "http://127.0.0.1:8000/",
        defaultCommandTimeout: 60000,
        viewportHeight: 1080,
        viewportWidth: 1920,
        experimentalStudio: true,
        experimentalRunAllSpecs: true,
        experimentalMemoryManagement: true,
        testIsolation: false,
        specPattern: [
            'cypress/e2e/**/*.cy.{js,ts}',
            'cypress/e2e/**/*.feature'
        ],
        async setupNodeEvents(on, config) {
            // For mochawesome reporter
            require('cypress-mochawesome-reporter/plugin')(on);

            // Configure cucumber preprocessor
            // await addCucumberPreprocessorPlugin(on, config);

            // Configure file preprocessor
            // on('file:preprocessor', preprocessor(config));

            return config;
        },
    },
});
