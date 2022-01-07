const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://github.com/giscafer');
  await page.setViewport({
    width: 1440,
    height: 960,
  });
  await page.screenshot({ path: 'giscafer.png' });
  await page.pdf({ path: 'giscafer.pdf' });
  await browser.close();
})();
