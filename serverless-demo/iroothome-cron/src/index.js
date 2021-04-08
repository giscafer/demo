'use strict';
const Notification = require('./notification');
const { isHolidayInChina } = require('./utils/index');
exports.main_handler = async (event, context, callback) => {
  console.log('%j', event);
  const isHoliday = await isHolidayInChina();
  if (isHoliday) {
    return '假期';
  }
  Notification.sendMsg('温馨提示：记得填写当日工时哦！');
  return 'hello world';
};
