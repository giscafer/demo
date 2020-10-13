/**
 * 抽象类
 */
abstract class Logger {
  private name: string;
  private enabled: boolean;

  constructor(name: string, enabled: boolean) {
    this.name = name;
    this.enabled = enabled;
  }
  public log(message: string): void {
    if (!this.enabled) {
      return;
    }
    this.doLog(message);
  }
  protected abstract doLog(message: string): void;
}

// 抽象类子类，输出到日记文件
// Non-abstract class 'FileLogger' does not implement inherited abstract member 'doLog' from class 'Logger'.ts(2515)
class FileLogger extends Logger {
  protected doLog(message: string): void {
    throw new Error('Method not implemented.');
  }
}
