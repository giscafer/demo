module.exports = {
  reveiveEmail: 'xxxx@qq.com', // 邮件通知对象，签到信息
  /* mail.js邮件发送者账号信息，此邮件发送到reveiveEmail */
  mail_opts: {
    host: 'smtp.163.com',
    port: 25,
    secureConnection: true, // Fix Error: Greeting never received
    auth: {
      user: 'giscafxxx@163.com', // 邮箱账号 （改为你的，如果不是163，需要改host和post，不理解邮件协议请申请163邮箱测试）
      pass: 'xxxx', // 密码（改为你的）
    },
  },
};
