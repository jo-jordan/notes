# 设计模式
## 策略模式（Strategy pattern）
策略模式能够使得程序在运行时可以切换算法，以不同的算法或者途径达到同样的结果。

举个生活中的例子：如何哄生气的女朋友？
1. 可以跟她讲道理
2. 可以给她买好的化妆品

以上两个方法，有的方法效率高，有的效率不高。但是都是可以使用的策略，都可以达到目的。

用Java实现：

```java
public interface LoveArts {
  void makeHerHappy();
}

public class NomalLoveArts implements LoveArts {
  @Override
  void makeHerHappy() {
    LOG.info("Hey babe don't cry, it's my fault.");
  }
}

public class AdvancedLoveArts implements LoveArts {
  @Override
  void makeHerHappy() {
    LOG.info("Hey babe I will buy some Chanel for you.");
  }
}

public class Me {
  private LoveArts arts;

  public Me(LoveArts arts) {
    this.arts = arts;
  }

  public changeStrategy(LoveArts arts) {
    this.arts = arts;
  }

  public doSomething() {
    arts.makeHerHappy();
  }
}
```
其实感觉Java后台开发中，也是有很多地方会用到这个设计模式，比如说Service层的设计，一个接口中会定义很多基本的业务操作方法，但是有很多不同的实现类，有各种不同的实现方法。

## 适配器模式（Adapter pattern）
适配器模式可以让两个不兼容的接口同时工作。同时这两个接口虽然不兼容，但是内部方法是要合适需求的。也就是说在不破坏原有代码的基础上，新增一个具有同样功能的，但是却更加适合自己需求的类。适配器具有两个变种，一个是类适配器，一个是对象适配器。类适配器与对象适配器的不同就在于，类适配器是通过继承获得被适配类的方法

举个生活中的例子：女朋友说她的有个Excel文件（Office 2019）打不开，因为她笔记本上的Office还是2007的，怎么办？