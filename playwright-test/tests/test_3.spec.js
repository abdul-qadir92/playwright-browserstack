const { overwrittenTest } = require('../fixtures');
const { expect } = require('@playwright/test');
overwrittenTest.describe('feature foo', () => {
  overwrittenTest('TC-3319 test 3', async ({ page }) => {
    // Assertions use the expect API.
    await page.goto('https://www.duckduckgo.com');
    const element = await page.$('[name="q"]');
    await element.click();
    await element.type('BrowserStack Puppeteer');
    await element.press('Enter');
    const title = await page.title('');
    console.log(title);
    expect(title).toEqual( 'BrowserStack Puppeteer at DuckDuckGo', 'Expected page title is incorrect!');
  });
});
