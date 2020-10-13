/* tslint:disable */
/* eslint-disable */

/**
 * OCP 改进后的API 接口监控代码
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
  private alertHandlers: AlertHandler[] = [];
  public addAlertHandler(alertHandler: AlertHandler) {
    this.alertHandlers.push(alertHandler);
  }
  public check(apiStatInfo: ApiStatInfo) {
    for (const handler of this.alertHandlers) {
      handler.check(apiStatInfo);
    }
  }
}

class ApiStatInfo {
  private _api: string;
  public get api(): string {
    return this._api;
  }
  public set api(value: string) {
    this._api = value;
  }
  private _requestCount: number;
  public get requestCount(): number {
    return this._requestCount;
  }
  public set requestCount(value: number) {
    this._requestCount = value;
  }
  private _errorCount: number;
  public get errorCount(): number {
    return this._errorCount;
  }
  public set errorCount(value: number) {
    this._errorCount = value;
  }
  private _durationOfSecond: number;
  public get durationOfSecond(): number {
    return this._durationOfSecond;
  }
  public set durationOfSecond(value: number) {
    this._durationOfSecond = value;
  }
}

abstract class AlertHandler {
  protected rule: AlertRule;
  protected notification: Notification;
  constructor(rule: AlertRule, notification: Notification) {
    this.rule = rule;
    this.notification = notification;
  }
  public abstract check(apiStatInfo: ApiStatInfo);
}

class TpsAlertHandler extends AlertHandler {
  constructor(rule: AlertRule, notification: Notification) {
    super(rule, notification);
  }
  public check(apiStatInfo: ApiStatInfo) {
    const tps = apiStatInfo.requestCount / apiStatInfo.durationOfSecond;
    if (tps > this.rule.getMatchedRule(apiStatInfo.api.getMaxTps())) {
      this.notification.notify(NotificationEmergencyLevel.URGENCY, '...');
    }
  }
}

class ErrorAlertHandler extends AlertHandler {
  constructor(rule: AlertRule, notification: Notification) {
    super(rule, notification);
  }
  public check(apiStatInfo: ApiStatInfo): void {
    if (
      apiStatInfo.errorCount >
      this.rule.getMatchedRule(apiStatInfo.api.getMaxTps())
    ) {
      this.notification.notify(NotificationEmergencyLevel.SEVERE, '...');
    }
  }
}

// 重构之后的 Alert 使用举例
class ApplicationContext {
  private alertRule: AlertRule;
  private notification: Notification;
  private alert: Alert;

  public initializeBeans() {
    this.alertRule = new AlertRule();
    this.notification = new Notification();
    this.alert = new Alert();
    alert.addAlertHandler(
      new TpsAlertHandler(this.alertRule, this.notification)
    );
    alert.addAlertHandler(
      new ErrorAlertHandler(this.alertRule, this.notification)
    );
  }

  public getAlert(): Alert {
    return this.alert;
  }

  private static instace: ApplicationContext = new ApplicationContext();
  constructor() {
    ApplicationContext.instace.initializeBeans();
  }
  public static getInstance(): ApplicationContext {
    return this.instace;
  }
}

const apiStatInfo: ApiStatInfo = new ApiStatInfo();
ApplicationContext.getInstance().getAlert().check(apiStatInfo);
