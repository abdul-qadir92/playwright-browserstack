// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  testIgnore: 'tests/api/*.spec.js',
  timeout: 120000,
 // retries: 2,
  use:{
    viewport: null
  },
  projects: [
    // -- Local Projects --

    // Test against playwright browsers
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        // Test against Chrome channel.
        //channel: "chrome",
      },
    },
  ],
};
module.exports = config;