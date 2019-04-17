'use strict'

const mailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const util = require('util')
const config = require('./config')

const mail_opts = config.mail_opts

const transport = mailer.createTransport(smtpTransport(mail_opts))

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data) {
  transport.sendMail(data, function (err) {
    if (err) {
      // 写为日志
      console.error(err)
    }
  })
}

/**
 * 发送错误通知邮件
 * @param {String} who 接收人的邮件地址
 */
function sendErrorMail(who, message) {
  var from = util.format('%s <%s>', 'email-demo', mail_opts.auth.user)
  var to = who
  var subject = '签到失败咯！！！'
  var html = '<p>错误原因：</p>' +
    '<p>' + message + '</p>'
  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  })
}

/**
 * 发送成功通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} order
 */
function sendSuccessMail() {
  var from = util.format('%s <%s>', 'email-demo', mail_opts.auth.user)
  var to = config.reveiveEmail
  var subject = '新邮件来了'
  var html = `<p>email-demo</p>`
  html += '新邮件来了>>> <a href="http://blog.giscafer.com/static/images/qrcode_giscafer.jpg">点击这里</a>'
  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  })
}

function sendAttachments() {
  var from = util.format('%s <%s>', 'email-demo', mail_opts.auth.user);
  var to = config.reveiveEmail;
  var subject = '新邮件来了';
  var html = `<p>email-demo</p>`
  html += '新邮件来了>>> pdf附件'
  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
    attachments: [{
      filename: 'giscafer.pdf',
      path: './giscafer.pdf',
      contentType: 'application/pdf'
    }],
    function(err, info) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        console.log(info);
        res.send(info);
      }
    }
  })
}


module.exports = { sendErrorMail, sendSuccessMail, sendAttachments }
