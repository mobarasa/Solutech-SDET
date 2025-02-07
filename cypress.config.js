import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cucumberPkg from '@badeball/cypress-cucumber-preprocessor';
const { addCucumberPreprocessorPlugin } = cucumberPkg;
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import mochawesomePkg from 'cypress-mochawesome-reporter/plugin.js';

export default defineConfig({
    watchForFileChanges: false,
    chromeWebSecurity: false,
    scrollBehavior: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
        reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
        mochaJunitReporterReporterOptions: {
            mochaFile: "cypress/reports/junit/results-[hash].xml",
        },
        cypressMochawesomeReporterReporterOptions: {
            charts: true,
            reportPageTitle: "custom-title",
            embeddedScreenshots: true,
            inlineAssets: true,
            saveAllAttempts: true,
            overwrite: true,
            reportDir: "cypress/reports/html",
        },
    },
    video: false,
    e2e: {
        baseUrl: "http://127.0.0.1:8000/",
        defaultCommandTimeout: 60000,
        viewportHeight: 1080,
        viewportWidth: 1920,
        experimentalStudio: true,
        experimentalRunAllSpecs: true,
        experimentalMemoryManagement: true,
        testIsolation: false,
        retries: 1,
        specPattern: [
            'cypress/e2e/**/*.cy.{js,ts}',
            'cypress/e2e/**/*.feature'
        ],
        stepDefinitions: [
            'cypress/e2e/features/**/*.steps.js',
            'cypress/e2e/features/**/*.steps.ts',
            'cypress/support/step_definitions/**/*.{js,ts}'
        ],
        async setupNodeEvents(on, config) {
            // For mochawesome reporter
            mochawesomePkg(on);

            // Configure cucumber preprocessor
            await addCucumberPreprocessorPlugin(on, config);

            // Configure esbuild plugin with platform: 'node'
            on('file:preprocessor',
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                    define: {
                        'process.env.NODE_ENV': '"test"'
                    },
                    platform: 'node', // Add this line to fix the Node.js built-in modules error
                    target: 'node16', // Specify Node.js version
                    mainFields: ['module', 'main'],
                    bundle: true,
                    logLevel: 'info'
                })
            );

            return config;
        },
    },
});
