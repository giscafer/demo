/**
 * API 接口监控代码
 */

interface AlertRule {
  getMatchedRule(api: string);
}
interface Notification {
  notify(level: NotificationEmergencyLevel, msg: string);
}
enum NotificationEmergencyLevel {
  URGENCY = 0,
  SEVERE = 1,
}

class Alert {
  private rule: AlertRule;
  private notification: Notification;

  constructor(rule: AlertRule, notification: Notification) {
    this.rule = rule;
    this.notification = notification;
  }

  public check(
    api: string,
    requestCount: number,
    errorCount: number,
    durationOfSecond: number
  ): void {
    const tps = requestCount / durationOfSecond;
    if (tps > this.rule.getMatchedRule(api).getMaxTps()) {
      this.notification.notify(NotificationEmergencyLevel.URGENCY, '…');
    }
    if (errorCount > this.rule.getMatchedRule(api).getMaxErrorCount()) {
      this.notification.notify(NotificationEmergencyLevel.SEVERE, '…');
    }
  }
}
