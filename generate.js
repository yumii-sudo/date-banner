const puppeteer = require('puppeteer');
const path = require('path');

const PAGES = [
  { file: 'banner.html',   selector: '#banner',   output: 'event-banner.png' },
  { file: 'deadline.html', selector: '#deadline', output: 'deadline.png' }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none']
  });
  const page = await browser.newPage();

  for (const cfg of PAGES) {
    await page.setViewport({ width: 900, height: 1800, deviceScaleFactor: 1 });
    await page.goto('file://' + path.join(__dirname, cfg.file), { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));

    const box = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: Math.round(r.width), h: Math.round(r.height) };
    }, cfg.selector);

    console.log(cfg.output, box.w + 'x' + box.h);
    await page.screenshot({
      path: path.join(__dirname, cfg.output),
      clip: { x: box.x, y: box.y, width: box.w, height: box.h }
    });
  }

  await browser.close();
  console.log('Done');
})();
