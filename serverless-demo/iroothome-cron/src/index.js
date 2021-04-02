"use strict";
const Notification = require("./notification");
exports.main_handler = async (event, context, callback) => {
  console.log("%j", event);
  Notification.sendMsg("19点了，记得填写当日工时哦！");
  return "hello world";
};
