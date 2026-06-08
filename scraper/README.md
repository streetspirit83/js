# Web Scraper

A Playwright-based web scraping app.

## Setup

```sh
npm install
npx playwright install chromium
```

## Usage

```sh
npm run scrape -- <url>
```

Defaults to `https://example.com` if no URL is given. Prints the page title and `<h1>` headings as JSON.

### Insider buying scraper

```sh
npm run scrape:insider-buying
```

Scrapes the table at https://altindex.com/insider-buying by mapping each row's
cells to the header row's column names, and prints the records as JSON. The
selector (`table`) is generic — if the site renders the data differently
(e.g. div-based grid, paginated/lazy-loaded rows), inspect the live DOM with
the Playwright MCP browser tools and adjust `src/insider-buying.js`
accordingly.
