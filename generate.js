const puppeteer = require('puppeteer');
const path = require('path');

const WIDTH = 782;
const OUTPUT = 'event-banner.png';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: 1600, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'banner.html'), { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const box = await page.evaluate(() => {
    const el = document.getElementById('banner');
    return { w: el.offsetWidth, h: el.offsetHeight };
  });
  const dateText = await page.evaluate(() => document.getElementById('dateLine').textContent);
  console.log('date line:', dateText, '| size:', box.w + 'x' + box.h);

  await page.screenshot({
    path: path.join(__dirname, OUTPUT),
    clip: { x: 0, y: 0, width: box.w, height: box.h }
  });
  await browser.close();
  console.log('saved', OUTPUT);
})();
