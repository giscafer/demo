const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  const options = {
    port: chrome.port,
    output: 'html',
    logLevel: 'info',
    chromeFlags: ['--no-sandbox', '--disable-dev-shm-usage'],
  };
  const results = await lighthouse('https://www.giscafer.com', options, null);
  fs.writeFile('report.html', results.report, (err) => {
    if (err) throw err;
    console.log('report saved', results.lhr.finalUrl);
  });
  console.log(
    'Performanc score was:',
    results.lhr.categories.performance.score * 100
  );

  await chrome.kill();
}

main();
