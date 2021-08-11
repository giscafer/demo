const request = require('request-promise');
const key = 'c3a08a04-24ff-4bff-82axxxxf6c505';
const mentioned_list = ['all', 'All'];

const mentionStr = mentioned_list.map((name) => '@' + name).join(',');

function requestWebhook(body) {
  console.log('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + key);
  request.post(
    {
      url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=' + key,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body,
    },
    (error, response, body) => {
      if (error) {
        console.log('消息发送错误');
        console.log(error);
        return;
      }
      console.log('消息执行完成');
    },
  );
}

function success(message) {
  const body = {
    msgtype: 'markdown',
    markdown: {
      // eslint-disable-next-line max-len
      content: `**服务环境类型**：<font color="info">${message.envName}</font>\n打包人：<font color="comment">${message.localGitUserEmail}</font>\nGit提交时间：<font color="warning">${message.commitDate}</font>\nGit提交人：<font color="comment">${message.commitAuthorName}（${message.commitAuthorEmail}）</font>\nGit提交日记：<font color="comment">${message.commitMessage}</font>\n\n${mentionStr}`,
      mentioned_list,
    },
  };
  requestWebhook(body);
}

function failed(message) {
  const body = {
    msgtype: 'markdown',
    markdown: {
      content: `**失败原因**：<font color="info">${message}</font>`,
      mentioned_list,
    },
  };
  requestWebhook(body);
}

function sendMsg(content) {
  console.log('消息内容：' + content);
  const body = {
    msgtype: 'markdown',
    markdown: {
      // eslint-disable-next-line max-len
      content: content,
      mentioned_list,
    },
  };
  requestWebhook(body);
}

module.exports = {
  failed,
  success,
  sendMsg,
};
