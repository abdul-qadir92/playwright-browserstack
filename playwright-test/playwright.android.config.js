// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  testIgnore: 'tests/api/*.spec.js',
  timeout: 120000,
  use:{
    viewport: null
  },
  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'Google Pixel 8,14.0,chrome@android',

    },
    {
      name: 'OnePlus 11R,13.0,chrome@android',

    },
    {
      name: 'Galaxy S23 Ultra,13.0,chrome@android',
    },
    
    // -- Local Projects --

    // Test against playwright browsers
    // {
    //   name: "chrome",
    //   use: {
    //     browserName: "chromium",
    //     // Test against Chrome channel.
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "safari",
    //   use: {
    //     browserName: "webkit",
    //     viewport: { width: 1200, height: 750 },
    //   },
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     viewport: { width: 800, height: 600 },
    //   },
    // },
    //  Test against mobile viewports.
    // {
    //   name: "chrome@pixel5",
    //   use: {
    //     ...devices["Pixel 5"]
    //   }
    // },
  ],
};
module.exports = config;