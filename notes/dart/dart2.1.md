# Dart之旅
我要赶紧发个车了，其实这个是自己的翻译。基本上还是介绍Dart的主要特性，不过我会以<font color=#008f8e>Java</font>作为一个对比去简单的分析一下，这样可能更好理解点。

## 最基本的科普
Dart是由Google主导开发的一种通用编程语言，在诞生之后被Ecma（ECMA-408）批准为一种标准。它被用于构建web，server和移动应用。

Dart是具有面向对象，类定义，垃圾回收特性的语言。使用C风格语法，可以选择性的转换为JavaScript。它还支持接口（interface）、[Mixin][1]、抽象类、具体化泛型、静态类型、声音类型系统。

Dart的运行方式有三种：

1. 编译为JavaScript源码，然后作为JavaScript运行，所使用的编译器是dart2js。
2. 单独运行在Dart VM中。
3. 提前编译（[AOT compilation][2]）为机器码，这种方式就是Flutter中使用的方式。

以上部分均来自维基百科

[1]:https://en.wikipedia.org/wiki/Mixin
[2]:https://en.wikipedia.org/wiki/Ahead-of-time_compilation

## 最基本的一段代码
代码很好理解，但是却包含了Dart大部分的特性。

```dart
// 定义一个方法.
printInteger(int aNumber) {
  print('The number is $aNumber.'); // 输出到控制台.
}

// 这是App的执行入口.
main() {
  var number = 42; // 声明一个变量，并且初始化它.
  printInteger(number); // 调用一个方法.
}
```

以上代码里面就几乎是Dart代码中要用到的东西了。但是，这不也是其他语言也会用到的嘛😕。

***<font color=#008f8e>// 定义一个方法.</font>***

注释。

**<font color=#008f8e>int</font>**

这是数据类型，像其他的还有<font style="color:#008f8e"> String </font>,<font style="color:#008f8e"> List </font>,<font style="color:#008f8e"> bool </font>。

**<font color=#008f8e>42</font>**

数字。

**<font color=#008f8e>print()</font>**

一个便捷的方式，输出到控制台。

**<font color=#008f8e>var</font>**

一种不用指定类型的变量声明方式，这里让人误以为Dart是弱类型的语言，其实并不是😕。Java 9里面也开始出现这个声明方式了。

## 划个重点
刚刚也看到了，这就是Dart语言，请遵循以下的原则：

- 变量可以存放任何东西，并且每个*对象*（*object*）都是一个类的实例。即使是数字，方法和空值（<font color=#008f8e>null</font>），也都算对象。所有对象都继承自Object类。*Java中方法不能是对象*
- 即使Dart中声明变量可以不指定变量类型，但是它依然是抢类型语言，这是因为Dart会自己推断类型。在上面的例子中，变量<font color=#008f8e>number</font>会被推测为<font color=#008f8e>int</font>类型。如果要明确说明不需要任何类型，请使用特殊类型<font color=#0076c0>dynamic</font>。
- 和Java一样，Dart支持泛型。<font color=#008f8e>List<int></font>存放int类型的列表或者是<font color=#008f8e>List<dynamic></font>可存放任意类型对象的列表。
- Dart中的方法能放进类中或者对象中（静态的或者是实例）。和Java不一样的是Dart中方法中能嵌套方法，并且Dart支持顶级方法（top-level function）。
- 和上面近似的，Dart支持顶级变量（top-level variables）。
- 不像Java有很多权限控制的关键词，如：<font color=#008f8e>public</font>, <font color=#008f8e>private</font>, <font color=#008f8e>protected</font>。如果一个标识符以下划线开头（_），那么它对于它所在的库中就是私有的（private）。更多请看[Libraries and visibility][3]
- 标识符可以是连字符开头，也可以是下划线，然后以任意的字符加数字相连都可以。
- Dart有一种*表达式*（有运行时值），一种*声明语句*（没有运行值）。例如条件表达式：<font color=#008f8e>condition ? expr1 : expr2</font> 拥有expr1或者expr2的值。if-else语句与之相比就没有值。但表达式不能直接包含语句。
- Dart工具能够报告两种类型的问题：*警告*（warnings）和*错误*（errors）。警告往往只是告诉你某些代码不会起作用，但是不会阻止程序的运行。错误的话就包括编译错误和运行时错误。

[3]:https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility


## 关键词

下面列表包括了Dart中用到的所有关键词
|  |  |  |  |
| --- | -- | -- | -- |
| abstract | dynamic | implements | show   |
| as       | else    | import     | static |
















