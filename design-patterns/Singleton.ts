/**
 * 博文：https://github.com/giscafer/blog/issues/51
 * 单例模式（Singleton Design Patterns): 一个类只允许创建一个实例
 * - 饿汉模式：类加载时提前初始化静态实例，不支持延迟加载
 * - 懒汉模式：支持延迟加载，但函数锁加锁解锁频繁，并发低，存在性能问题
 * - 双重检测：在函数内部进行判断加类就级别锁，静态对象实例化之后不再触发加锁解锁的情况，并发高
 * - 内部静态类：比双重检测简单
 */

/**
 * 饿汉模式
 */
class SingletonEhan {
  private id: number = 0;
  private static instance: SingletonEhan = new SingletonEhan();
  private SingletonEhan() {}
  private static getInstance() {
    return SingletonEhan.instance;
  }

  getId() {
    return (this.id += 1);
  }
}

/**
 * 懒汉模式
 */
class SingletonLhan {
  private id: number = 0;
  private static instance: SingletonLhan;
  private SingletonLhan() {}
  // java 写的话函数加上 synchronized 锁，导致频繁加锁和解锁并发低
  // js 单线程所以不需要考虑此问题
  private static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonLhan();
    }

    return this.instance;
  }

  getId() {
    return (this.id += 1);
  }
}

/**
 * 双重检测
 */
class SingletonLhan2 {
  private id: number = 0;
  private static instance: SingletonLhan;
  private SingletonLhan() {}

  private static getInstance() {
    if (!this.instance) {
      // java 写的话函数加上 synchronized 锁，解决频繁加锁和解锁并发低问题
      // js 单线程所以不需要考虑此问题
      // synchronized(SingletonLhan2.class){
      //   if (!this.instance) {
      //     this.instance = new SingletonLhan();
      //   }
      // }
      this.instance = new SingletonLhan();
    }

    return this.instance;
  }

  getId() {
    return (this.id += 1);
  }
}

/**
 * 静态内部类

```java

public class SingletonInner{
  private int id=0;

  private constructor(){}

  private static class Inner{
    private static SingletonInner instance = new SingletonInner();
  }

  private static SingletonInner getInstance(){
    return Inner.instance;
  }

  public int getId(){
    return id+=1;
  }
}

```
*/
