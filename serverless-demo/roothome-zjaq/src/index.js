/**************************************************
Nodejs8.9-AutomatedTesting
TIPS:
1. There is no CMQ SDK for node
   CMQ暂时没有node版本的SDK

Reference:
1. https://cloud.tencent.com/document/product/583/19504 - Function test（python）
2. https://cloud.tencent.com/document/product/406/5851 - CMQ interface files
***************************************************/

const Capi = require('qcloudapi-sdk');
const request = require('request-promise');
const Notification = require('./notification');

// The cmq authentication information
// 使用 cmq 所需的鉴权/配置信息
const SECRET_ID = 'AKIDiCTPVsTakxxxZ0ILDv8aon'; // Replace it with your SecretId , 请替换为您的 SecretId
const SECRET_KEY = 'xhDLFuLn7sxxxgxxxLRKzJX'; // Replace it with your SecretKey, 请替换为您的 SecretKey
const CMQ_TOPIC_NAME = '服务拨测'; // Replace it with your Topic name, 请替换为您的 Topic 名称
const CMQ_REGION = 'gz'; // The region of your cmq topic, cmq主题所在地域

// While fails, the email notify list, 拨测失败后，告警邮件需要通知的邮箱列表
const EMAIL_NOTIFY_LIST = ['giscafer@outlook.com'];

// While fails, the email sending the error message, please replace it with your own email address
// 拨测失败后，发出告警邮件的邮箱，请根据您自身设置的邮箱地址进行修改
const FROM_ADDR = 'giscafer@outlook.com';

// The test url list
// 拨测网址列表
const TEST_URL_LIST = ['http://giscafer.com'];

/**Simple CMQ-SDK */
function CMQRequestHelper(SecretId, SecretKey) {
  // Generate the CMQ api
  // CMQ云api构建
  this.requestHelper = new Capi({
    SecretId,
    SecretKey,
    serviceType: `cmq-topic-${CMQ_REGION}`,
  });
  this.inited = true;
}
CMQRequestHelper.prototype.publishMessage = async function (
  region,
  topicName,
  msgBody,
) {
  if (!this.inited) throw Error('Instantiate CMQRequestHelper first please');
  const self = this;
  let params = {
    Region: region,
    Action: 'PublishMessage',
    topicName,
    msgBody,
  };
  try {
    return await self.requestHelper.request(params);
  } catch (e) {
    return e;
  }
};

const cmqRequestInst = new CMQRequestHelper(SECRET_ID, SECRET_KEY);

async function testUrl(urlList) {
  let errorInfo = [];
  for (let url of urlList) {
    try {
      const resp = await request({
        url,
        timeout: 3000,
      });
    } catch (e) {
      const errmsg = `「<font color="info">${url}</font>」${
        e.message.length > 100 ? encodeURI(e.message.substr(0, 100)) : e.message
      }\n`;
      errorInfo.push(errmsg);
    }
  }
  if (errorInfo.length) {
    Notification.sendMsg(['**服务异常**\n'].concat(errorInfo).join(''));
  } else {
    console.log('服务正常');
  }
  return errorInfo;
}
testUrl(TEST_URL_LIST);
exports.main_handler = async (event, context, callback) => {
  return testUrl(TEST_URL_LIST);
};
