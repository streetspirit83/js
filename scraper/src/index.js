import { chromium } from 'playwright';

const url = process.argv[2] ?? 'https://example.com';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url);

const result = {
  url,
  title: await page.title(),
  headings: await page.locator('h1').allTextContents(),
};

await browser.close();

console.log(JSON.stringify(result, null, 2));
