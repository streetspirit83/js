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
