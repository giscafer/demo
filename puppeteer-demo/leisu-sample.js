'use strict';
const puppeteer = require('puppeteer');

const request = require('superagent');
const URL = 'https://live.leisu.com/';
const statsApi = 'https://api.leisu.com/api/v2/match/stats?id=';

async function crawlerGamesInfo() {
  // 解决国内网络无法下载 puppeteer 依赖问题

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '–disable-gpu',
      '–disable-dev-shm-usage',
      '–disable-setuid-sandbox',
      '–no-first-run',
      '–no-sandbox',
      '–no-zygote',
      '–single-process',
    ],
  });
  const page = await browser.newPage();
  await page.goto('https://live.leisu.com/', {
    waitUntil: 'networkidle2',
  });

  const res = await page.evaluate(() => {
    let result = [];
    let lives = [];
    let notStart = [];
    let dataIds = [];
    let errorDataIds = [];

    const getInnerTextByCls = (element, selector) => {
      const el = element.querySelector(selector);
      if (el && typeof el.innerText === 'string') {
        return el.innerText.replace(/\\n/g, '').trim();
      }
      return '';
    };

    const matchReg = (str) => {
      let reg = /<\/?.+?\/?>/g;
      return str.replace(reg, '');
    };
    const children = document.querySelectorAll('div.dd-item');
    // 一天应该不会有40场，这里做个性能
    const len = children.length >= 40 ? 40 : children.length;
    for (let i = 0; i < len; i++) {
      const c = children[i].parentElement;
      const dataId = c.getAttribute('id').replace('match_layout_', '');
      if (dataId) {
        try {
          const eventName = getInnerTextByCls(
            c,
            '.lier-event-name .event-name',
          );
          let eventIcon = '';
          const iconStyleEl = c.querySelector('.lier-event-name .event-icon');
          if (iconStyleEl) {
            eventIcon = iconStyleEl.style.backgroundImage;
          }
          const beginTime = getInnerTextByCls(c, '.lier-time');

          const homeTeam = getInnerTextByCls(c, '.lier-team-home .name');
          const guestTeam = getInnerTextByCls(c, '.lier-team-away .name');
          const half = getInnerTextByCls(c, '.lier-half') || '-';
          const corner = getInnerTextByCls(c, '.lier-corner') || '-';
          const score = getInnerTextByCls(c, '.lier-score .color-red') || '-';

          // TODO: 不知道为什么获取不到时间
          let status = '-';
          // let labstatusEl = c.querySelector("td.lier-status");
          let labstatusEl = c.querySelector('td.lier-status span.children');
          if (labstatusEl) {
            status = matchReg(labstatusEl.innerHTML);
            // status = labstatusEl.childNodes[1];
          }
          if (!status || status == '-') {
            labstatusEl = c.querySelector('td.lier-status>span.children');
            if (labstatusEl) {
              status = matchReg(labstatusEl.innerHTML);
            }
          }

          result.push({
            dataId,
            eventIcon,
            eventName,
            beginTime,
            status,
            homeTeam,
            guestTeam,
            half,
            score,
            corner,
          });
          dataIds.push(status);
        } catch (e) {
          // reject(e);
          console.log('nightmare:evaluate', e);
          // return [lives, notStart];
          errorDataIds.push(dataId);
        }
      } else {
        const classList = Array.from(c.classList);
        // 未开始的比赛
        if (classList.indexOf('dd-notStart-title') > -1) {
          lives = [...result];
          result = [];
        }
        // 到了次日比赛标签
        if (classList.indexOf('day-label') > -1) {
          notStart = [...result];
          result = [];
          // return [lives, notStart];
          break;
        }
        if (classList.indexOf('dd-finished-title') > -1) {
          notStart = [...result];
          result = [];
          break;
        }
      }
    }
    notStart = [...result];
    return [lives, notStart, dataIds, errorDataIds];
  });

  await browser.close();
  return res;
}

function qryStats(dataId) {
  const url = `${statsApi}${dataId}`;
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });
}

function test() {
  crawlerGamesInfo()
    .then((result) => {
      console.log('result=', result);
    })
    .catch((e) => {
      console.log(e);
    });
}
test();
// module.exports = { crawlerGamesInfo, qryStats };
