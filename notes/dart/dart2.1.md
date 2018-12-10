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

|            |          |            |        |
| --------   | -------  | ---------- | ------ |
| [abstract][4] <sup>2</sup>   | [dynamic][5] <sup>2</sup>  | [implements][6] <sup>2</sup> | [show][7] <sup>1</sup>   |
| [as][8] <sup>2</sup>            | [else][9]               | [import][10] <sup>2</sup>     | [static][11] <sup>2</sup> |
| [assert][12]                     | [enum][13]                     | [in][14]         | [super][15]  |
| [async][16] <sup>1</sup>         | [export][17] <sup>2</sup>      | [interface][18] <sup>2</sup>  | [switch][19] |
| [await][20] <sup>3</sup>         | [extends][21]                  | [is][22]            | [sync][23] <sup>1</sup>   |
| [break][24]                       | [external][25] <sup>2</sup>     | [library][26] <sup>2</sup>    | [this][27]   |
| [case][28]                       | [factory][29] <sup>2</sup>     | [mixin][30] <sup>2</sup>      | [throw][31]  |
| [catch][32]                      | [false][33]                    | [new][34]           | [true][35]   |
| [class][36]                      | [final][37]                   | [null][38]       | [try][39]    |
| [const][40]                      | [finally][41]                  | [on][42] <sup>1</sup>         | [typedef][43] <sup>2</sup> |
| [continue][44]                  | [for][45]                      | [operator][56] <sup>2</sup>   | [var][47]    |
| [convariant][48] <sup>2</sup>    | [Function][49] <sup>2</sup>    | [part][50] <sup>2</sup>       | [void][51]   |
| [default][52]                    | [get][53] <sup>2</sup>         | [rethrow][54]    | [while][55]  |
| [deferred][56] <sup>2</sup>      | [hide][57] <sup>1</sup>        | [return][58]     | [with][59]   |
| [do][60]                         | [if][61]                       | [set][62]<sup>2</sup>        | [yield][63] <sup>3</sup>  |




[4]:https://www.dartlang.org/guides/language/language-tour#abstract-classes
[5]:https://www.dartlang.org/guides/language/language-tour#important-concepts
[6]:https://www.dartlang.org/guides/language/language-tour#implicit-interfaces
[7]:https://www.dartlang.org/guides/language/language-tour#importing-only-part-of-a-library
[8]:https://www.dartlang.org/guides/language/language-tour#type-test-operators
[9]:https://www.dartlang.org/guides/language/language-tour#if-and-else
[10]:https://www.dartlang.org/guides/language/language-tour#using-libraries
[11]:https://www.dartlang.org/guides/language/language-tour#class-variables-and-methods
[12]:https://www.dartlang.org/guides/language/language-tour#assert
[13]:https://www.dartlang.org/guides/language/language-tour#enumerated-types
[14]:https://www.dartlang.org/guides/language/language-tour#for-loops
[15]:https://www.dartlang.org/guides/language/language-tour#extending-a-class
[16]:https://www.dartlang.org/guides/language/language-tour#asynchrony-support
[17]:https://www.dartlang.org/guides/libraries/create-library-packages
[18]:https://stackoverflow.com/questions/28595501/was-the-interface-keyword-removed-from-dart
[19]:https://www.dartlang.org/guides/language/language-tour#switch-and-case
[20]:https://www.dartlang.org/guides/language/language-tour#asynchrony-support
[21]:https://www.dartlang.org/guides/language/language-tour#extending-a-class
[22]:https://www.dartlang.org/guides/language/language-tour#type-test-operators
[23]:https://www.dartlang.org/guides/language/language-tour#generators
[24]:https://www.dartlang.org/guides/language/language-tour#break-and-continue
[25]:https://stackoverflow.com/questions/24929659/what-does-external-mean-in-dart
[26]:https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility
[27]:https://www.dartlang.org/guides/language/language-tour#constructors
[28]:https://www.dartlang.org/guides/language/language-tour#switch-and-case
[29]:https://www.dartlang.org/guides/language/language-tour#factory-constructors
[30]:https://www.dartlang.org/guides/language/language-tour#adding-features-to-a-class-mixins
[31]:https://www.dartlang.org/guides/language/language-tour#throw
[32]:https://www.dartlang.org/guides/language/language-tour#catch
[33]:https://www.dartlang.org/guides/language/language-tour#booleans
[34]:https://www.dartlang.org/guides/language/language-tour#using-constructors
[35]:https://www.dartlang.org/guides/language/language-tour#booleans
[36]:https://www.dartlang.org/guides/language/language-tour#instance-variables
[37]:https://www.dartlang.org/guides/language/language-tour#final-and-const
[38]:https://www.dartlang.org/guides/language/language-tour#default-value
[39]:https://www.dartlang.org/guides/language/language-tour#catch
[40]:https://www.dartlang.org/guides/language/language-tour#final-and-const
[41]:https://www.dartlang.org/guides/language/language-tour#finally
[42]:https://www.dartlang.org/guides/language/language-tour#catch
[43]:https://www.dartlang.org/guides/language/language-tour#typedefs
[44]:https://www.dartlang.org/guides/language/language-tour#break-and-continue
[45]:https://www.dartlang.org/guides/language/language-tour#for-loops
[46]:https://www.dartlang.org/guides/language/language-tour#overridable-operators
[47]:https://www.dartlang.org/guides/language/language-tour#variables
[48]:https://www.dartlang.org/guides/language/sound-problems#the-covariant-keyword
[49]:https://www.dartlang.org/guides/language/language-tour#functions
[50]:https://www.dartlang.org/guides/libraries/create-library-packages#organizing-a-library-package
[51]:https://medium.com/dartlang/dart-2-legacy-of-the-void-e7afb5f44df0
[52]:https://www.dartlang.org/guides/language/language-tour#switch-and-case
[53]:https://www.dartlang.org/guides/language/language-tour#getters-and-setters
[54]:https://www.dartlang.org/guides/language/language-tour#catch
[55]:https://www.dartlang.org/guides/language/language-tour#while-and-do-while
[56]:https://www.dartlang.org/guides/language/language-tour#lazily-loading-a-library
[57]:https://www.dartlang.org/guides/language/language-tour#importing-only-part-of-a-library
[58]:https://www.dartlang.org/guides/language/language-tour#functions
[59]:https://www.dartlang.org/guides/language/language-tour#adding-features-to-a-class-mixins
[60]:https://www.dartlang.org/guides/language/language-tour#while-and-do-while
[61]:https://www.dartlang.org/guides/language/language-tour#if-and-else
[62]:https://www.dartlang.org/guides/language/language-tour#getters-and-setters
[63]:https://www.dartlang.org/guides/language/language-tour#generators


避免使用以上的关键字作为标识符。但是如果真有必要，可以使用以上带角标的关键字：

- 角标1:是上下文关键字，仅在特定的地方有意义。他们可以在任何时候被当作标识符。
- 角标2:是内建标识符。为了简化移植JavaScrip代码到Dart，这些关键字在大部分地方是有效的，但是不能作为类命或者类型名称，或者是作为导入前缀。
- 角标3:较新的一种。这是为Dart1.0正式版之后的异步支持所预留的关键字。不能在被标记为<span style="color:#008f8e">async</span>，<span style="color:#008f8e"> async* </span> 或者是<span style="color:#008f8e">snyc*</span>的方法体中使用。

所有其他的关键字都为保留字段，无法被作为标识符使用。








