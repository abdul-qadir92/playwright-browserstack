const { overwrittenTest } = require('../fixtures');
const { expect } = require('@playwright/test');
overwrittenTest.describe('feature foo', () => {
  overwrittenTest('TC-5855 test 1', async ({ page }) => {
    // Assertions use the expect API.
    await page.goto('https://www.duckduckgo.com');
    try {
      await page.evaluate(_ => {}, `browserstack_executor: ${JSON.stringify({
      "action": "lighthouseAudit"
      })}`);
    } catch (error) {
    console.error('Error lighthouseAudit:', error);
    }
    const element = page.locator('[name="q"]');
    await element.click();
    await element.fill('BrowserStack');
    await element.press('Enter');
    const title = await page.title('');
    console.log(title);
    expect(title).toEqual( 'BrowserStack at DuckDuckGo', 'Expected page title is incorrect!');
  });
});
