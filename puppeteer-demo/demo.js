const puppeteer = require('puppeteer');

// const loginPageUrl = 'https://xxx.xxx.cn/user/login';

async function test() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(loginPageUrl, { waitUntil: 'networkidle2' });
  await page.setViewport({
    width: 1440,
    height: 760,
  });
  // 如果5s不打开页面超时退出
  await page.setDefaultTimeout(5000);
  // 进入页面后，输入账号密码，点击登陆按钮
  await page.type('#username', 'admin', { delay: 100 });
  await page.type('#password', 'Admin@1234', { delay: 50 });
  await page.click('.ant-btn.ant-btn-primary.ant-btn-lg'); // 点击登陆按钮
  // 导航跳转结束，“点击”进入 客商管理
  await page.waitForSelector('[href="/merchant-manage"]');
  await page.click('[href="/merchant-manage"]');
  // 正常跳转比较快，延时为了演示看菜单跳转效果
  await page.waitFor(5000);

  await page.waitForSelector('[href="/merchant-manage/driver"]');

  // 打开机手管理菜单，jquery写法
  const aElement = await page.$('[href="/merchant-manage/driver"]');
  await aElement.click();
  // await page.click('[href="/merchant-manage/driver"]');
  // await page.screenshot({ path: '演示截图.png' });
  // 演示截屏
  // 演示代码错误怎么看。
  // 演示爬虫，抓取数据
  // await browser.close();
}

test();
