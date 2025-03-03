const {test} = require('@playwright/test');
const { _android } = require('playwright');
const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];
const BrowserStackLocal = require('browserstack-local');

// BrowserStack Specific Capabilities.
const caps = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  project: 'Playwright',
  name: 'My first playwright test',
  build: 'playwright-build-5',
  'browserstack.console': 'info',
  'browserstack.networkLogs': true,
  'browserstack.debug': true,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': clientPlaywrightVersion,
};

// BrowserStack Specific Capabilities.
const Androidcaps = {
  interactiveDebugging: true,
  deviceName: '',
  browserName: '',
  osVersion: '',
  name: 'My first playwright test',
  project: 'Playwright-Android',
  build: 'playwright-build-5',
  'browserstack.console': 'info',
  'browserstack.networkLogs': true,
  'browserstack.debug':true,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || '',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || '',
  'browserstack.local': process.env.BROWSERSTACK_LOCAL || false,
  'client.playwrightVersion': clientPlaywrightVersion,
};

exports.bsLocal = new BrowserStackLocal.Local();

// replace YOUR_ACCESS_KEY with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
exports.BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name, title) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = title;
  caps.build = caps.project + '-' + process.env.BUILD;
};

// Patching the capabilities dynamically according to the project name.
const patchAndroidCaps = (name, title) => {
  let combination = name.split('@');
  let subCombination = combination[0].split(',');
  Androidcaps.browserName = subCombination[2];
  Androidcaps.deviceName = subCombination[0];
  Androidcaps.osVersion = subCombination[1];
  Androidcaps.name = title;
  Androidcaps.build = Androidcaps.project +'-'+  process.env.BUILD;
};

const isHash = (entity) => Boolean(entity && typeof(entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = val => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
};

const overwrittenTest = test.extend({

  page: async ({ page,playwright }, use, testInfo) => {
      // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
      console.log(testInfo.project.name)
      /*if (testInfo.project.name.match(/browserstack/)) {
        patchCaps(testInfo.project.name, `${testInfo.file.split('/')[8]}`);
        const vBrowser = await playwright.chromium.connect(`wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`);
        const vContext = await vBrowser.newContext(testInfo.project.use);
        const vPage = await vContext.newPage();
        await use(vPage);
        const testResult = {
          action: 'setSessionStatus',
          arguments: {
            status: evaluateSessionStatus(testInfo.status),
            reason: nestedKeyValue(testInfo, ['error', 'message'])
          },
        };
        await vPage.evaluate(() => {},
        `browserstack_executor: ${JSON.stringify(testResult)}`);
        await vPage.close();
        await vBrowser.close();
      } else if (testInfo.project.name.match(/android/)) {
        patchAndroidCaps(testInfo.project.name, `${testInfo.file.split('/')[8]}`);
        const device = await _android.connect(`wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(Androidcaps))}`);
        await device.shell('am force-stop com.android.chrome');
        const vContext = await device.launchBrowser();
        const vpage = await vContext.newPage();
        await use(vpage);
        const testResult = {
          action: 'setSessionStatus',
          arguments: {
            status: evaluateSessionStatus(testInfo.status),
            reason: nestedKeyValue(testInfo, ['error', 'message'])
          },
        };
        await vpage.evaluate(
          () => {},
          `browserstack_executor: ${JSON.stringify(testResult)}`);
        await vContext.close();
        await vpage.close();
        await device.close();
      } else {
        use(page);
      }*/ 
     use(page);
    },
});


module.exports = { overwrittenTest };