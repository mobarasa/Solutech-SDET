// ***********************************************************
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import 'cypress-mochawesome-reporter/register';
import '@bahmutov/cypress-esbuild-preprocessor';

Cypress.on("test:after:run", (test, runnable) => {
    if (Cypress.config("video")) {
        // assuming the videos are stored in "cypress/videos"
        const videoFile = `../videos/${Cypress.spec.name}.mp4`;
        if (Cypress.Mochawesome) {
            Cypress.Mochawesome.context.push(videoFile);
        }
    }
});

// Import commands.js using ES2015 syntax:
import './commands'

