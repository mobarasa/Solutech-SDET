const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://127.0.0.1:8000/",
        defaultCommandTimeout: 60000,
        viewportHeight: 1080,
        viewportWidth: 1920,
        experimentalStudio: true,
        experimentalRunAllSpecs: true,
        experimentalMemoryManagement: true,
        testIsolation: false,
        setupNodeEvents(on, config) {
            // implement node event listeners here

            // Return the updated config
            return config;
        },
    },
});
