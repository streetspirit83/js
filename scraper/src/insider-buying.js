import { chromium } from 'playwright';

const URL = 'https://altindex.com/insider-buying';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });

// Generic table scraper: maps each row's cells to the header row's column names.
// Falls back to numeric indices if no <th>/header row is found.
const rows = await page.evaluate(() => {
  const table = document.querySelector('table');
  if (!table) return null;

  const allRows = Array.from(table.querySelectorAll('tr'));
  if (allRows.length === 0) return [];

  const headerCells = Array.from(allRows[0].querySelectorAll('th, td')).map((cell, i) =>
    cell.textContent.trim() || `column_${i}`
  );

  return allRows.slice(1).map((row) => {
    const cells = Array.from(row.querySelectorAll('td, th')).map((cell) => cell.textContent.trim());
    const record = {};
    headerCells.forEach((key, i) => {
      record[key] = cells[i] ?? null;
    });
    return record;
  });
});

await browser.close();

if (!rows) {
  console.error('No <table> found on the page — inspect the live DOM and adjust the selector.');
  process.exit(1);
}

console.log(JSON.stringify(rows, null, 2));
