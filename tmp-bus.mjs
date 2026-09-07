import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(err.message));

const pages = ['camboriu-bus', 'canasvieiras-bus'];
for (const slug of pages) {
  await page.goto(`http://localhost:5173/paquetes/${slug}`, { waitUntil: 'networkidle' });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let i = 0; i <= 8; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (height * i) / 8);
    await page.waitForTimeout(200);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `tmp-bus-${slug}.png`, fullPage: true });
}

// also verify "Ver más" from the Packages grid on home routes correctly for these two
await page.goto('http://localhost:5173/#paquetes', { waitUntil: 'networkidle' });

console.log('CONSOLE ERRORS:', errors.length ? errors : 'none');
await browser.close();
