const request = require('request');

const formatNum = (n) => {
  const m = n.toString();
  return m[1] ? m : '0' + m;
};

const objectToQueryString = (queryParameters) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce(
        (queryString, [key, val], index) => {
          const symbol = queryString.length === 0 ? '?' : '&';
          queryString +=
            typeof val !== 'object' ? `${symbol}${key}=${val}` : '';
          return queryString;
        },
        ''
      )
    : '';
};

const formatDate = (val, seperator = '-') => {
  let date = new Date();
  if (typeof val === 'object') {
    date = val;
  } else {
    date = new Date(val || '');
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNum).join(seperator);
};

async function getHolidayDataByDate(date) {
  // 使用 http://timor.tech/api/holiday 的API
  const url = `http://timor.tech/api/holiday/info/${formatDate(date)}`;
  //   const url = `http://timor.tech/api/holiday/info/2021-04-10`;
  return new Promise((resolve, reject) => {
    request.get(
      {
        url,
        json: true,
        headers: {
          'content-type': 'application/json',
        },
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
          reject(error);
          return;
        }

        if (!body || body.code !== 0) {
          throw new Error('date节假日服务器返回-1，服务出错！');
        }
        resolve(body);
      }
    );
  });
}

async function isHolidayInChina(date = new Date()) {
  let tof = false;

  let dataObj = await getHolidayDataByDate(date);

  if (dataObj) {
    // 周末和假期
    tof = dataObj.type.type === 2 || dataObj.type.type === 1;
  }
  console.log('假期：', tof);
  return tof;
}

module.exports = {
  isHolidayInChina,
  objectToQueryString,
  formatDate,
};
