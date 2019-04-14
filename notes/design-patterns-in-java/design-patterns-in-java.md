# 设计模式
## 策略模式（Strategy pattern）
策略模式能够使得程序在运行时可以切换算法，以不同的算法或者途径达到同样的结果。

举个生活中的例子：如何哄生气的女朋友？
1. 可以跟她讲道理
2. 可以给她买好的化妆品
以上三个方法，有的方法效率高，有的效率不高。但是都是可以使用的策略，都可以达到目的。

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
```
其实感觉Java后台开发中，也是有很多地方会用到这个设计模式，比如说Service层的设计，一个接口中会定义很多基本的业务操作方法，但是有很多不同的实现类，有各种不同的实现方法。
