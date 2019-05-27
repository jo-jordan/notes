# Dart之旅
我要赶紧发个车了，其实这个是[自己的翻译][0]。基本上还是介绍Dart的主要特性，不过我会以<font color=#008f8e>Java</font>作为一个对比去简单的分析一下，这样可能更好理解点。可能有点长。

## 最基本的科普
Dart是由Google主导开发的一种通用编程语言，在诞生之后被Ecma（ECMA-408）批准为一种标准。它被用于构建web，server和移动应用。

Dart是具有面向对象，类定义，垃圾回收特性的语言。使用C风格语法，可以选择性的转换为JavaScript。它还支持接口（interface）、[Mixin][1]、抽象类、具体化泛型、静态类型、声音类型系统。

Dart的运行方式有三种：

1. 编译为JavaScript源码，然后作为JavaScript运行，所使用的编译器是dart2js。
2. 单独运行在Dart VM中。
3. 提前编译（[AOT compilation][2]）为机器码，这种方式就是Flutter中使用的方式。

以上部分均来自维基百科

[0]:https://www.dartlang.org/guides/language/language-tour
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
- 即使Dart中声明变量可以不指定变量类型，但是它依然是强类型语言，这是因为Dart会自己推断类型。在上面的例子中，变量<font color=#008f8e>number</font>会被推断为<font color=#008f8e>int</font>类型。如果要明确说明不需要任何类型，请使用特殊类型<font color=#0076c0>dynamic</font>。
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
| ---------------- | ---------------- | ---------------- | ---------------- |
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
- 角标3:较新的一种。这是为Dart1.0正式版之后的异步支持所预留的关键字。不能在被标记为<span style="color:#008f8e"> async </span>，<span style="color:#008f8e"> async* </span> 或者是 <span style="color:#008f8e"> snyc* </span> 的方法体中使用。

所有其他的关键字都为保留字段，无法被作为标识符使用。

## 变量
给个定义变量的例子：

```dart
var name = 'Bob';
```

变量存储引用。<span style="color:#008f8e"> name </span>变量存放了一个指向一个字符串对象（值为"Bob"）的引用。

这个变量的类型会被推断为String类型，但是也可以转而明确指定一个类型。如果一个对象不能被限定一个单独的类型，请使用<span style="color:#008f8e"> Object </span>或者<span style="color:#008f8e"> dynamic </span>。[查看详细][64]。

```dart
dynamic name = 'Bob';
```

另外一种可选的方法就是指定这个值的类型可能被推测的类型：

```dart
String name = 'Bob';
```

> 注意：这里更加偏向于使用var去声明变量是因为[风格指导建议][65]。

[64]:https://www.dartlang.org/guides/language/effective-dart/design#do-annotate-with-object-instead-of-dynamic-to-indicate-any-object-is-allowed
[65]:https://www.dartlang.org/guides/language/effective-dart/design#types

### 默认值

未被初始化的变量会有一个初始化一个<span style="color:#008f8e"> null </span>值。即使一个数字（Numeric）类型的变量也会被初始为null，因为在Dart里面一切皆对象。

```dart
int lineCount;
assert(lineCount == null);
```

> 注意：assert()的调用在程序运行时会被忽略，在开发过程中，assert(*condition*)会抛出异常，除非条件为true。[更多查看详细][66]。

[66]:https://www.dartlang.org/guides/language/language-tour#assert


### Final和const
如果一直都不想改变某个变量的值，那么可以使用<span style="color:#008f8e"> final </span>或者<span style="color:#008f8e"> const </span>，而不是用var或者指定类型。一个final变量只能够被赋值一次；一个const变量是一个编译时常量。（Const变量是隐式的final变量）一个final的 top-level 或者类变量只会在它第一次所用时被赋值。这个就像Java中的String了。

> 注意：实例变量只能是final的，不能是const的。final实例必须在构造函数体前面被初始化-在变量声明那里，被当作是构造函数的参数，或者在构造函数的初始列表中。

来个列子看一下：

```dart

final name = 'Bob'; // Without a type annotaion.
final String nickname = 'Buddy';

```

无法改变一个final变量的值：

```dart

name = 'Alice'; // Error: a final variable can only be set once.

```

使用const的话适用于你想这个值是在编译时就被初始化的（**compile-time constants**）。如果这个常量在class级别，标记它为<span style="color:#008f8e"> static const </span>。当你声明一个变量，就比如是数字类型、字符串类型或者是一个算数的结果，将它的值设置为编译时常量：

```dart

const bar = 100000; // Unit of pressure (dynes/cm2)
const double atm = 1.0898; // Standard atmosphere

```

关键点来了，const不仅仅只用于常量的定义。你还能用它去构建常量值，也就像创建构造器一样创建它。任何变量都能拥有常量值。

```dart

var foo = const [];
final bar = const [];
const baz = []; // Equivalent to const []

var foo0 = const [1, 2, 3];
const foo1 = [1, 2, 3];

assert(foo0 == foo1); // true


final foo2 = [1, 2, 3];
final foo3 = const [1, 2, 3];
const foo4 = const [1, 2, 3];

// foo5 = [1, 2, 3]; // Error
List<int> foo6 = [1, 2, 3];
```

你甚至能从const初始化表达式中忽略掉const，就像上面的baz一样。[详情请看][67]。

你能改变一个非final或者非const变量的值，即使它曾经有过const值：

```dart

foo = [1, 2, 3]; // Was const []

```

你不能改变一个const变量的值：

```dart

baz = [42]; // Error: Constant variables can't be assigned a vale.

```

更多使用const的方法可以看[Lists][68]、[Maps][69]、[Classes][70] 。

[67]:https://www.dartlang.org/guides/language/effective-dart/usage#dont-use-const-redundantly
[68]:https://www.dartlang.org/guides/language/language-tour#lists
[69]:https://www.dartlang.org/guides/language/language-tour#maps
[70]:https://www.dartlang.org/guides/language/language-tour#classes

## 内建类型

Dart语言支持以下类型：

- numbers
- strings
- booleans
- lists(可以被当作是数组)
- maps
- runes(用于在字符串中表示Unicode字符)
- symbols

你可以使用文字初始化任何这些特殊类型的对象。举个例子：<span style="color:#008f8e"> 'this is a string' </span>就是一个字符串文字，<span style="color:#008f8e"> true </span>就是布尔文字。

因为在Dart中所有的变量都是指向一个对象 _一个类的实例_ 你一般也可以在构造器中初始化这些变量。在某些内建的类型中有些是拥有自己的构造器的，你能使用<span style="color:#008f8e"> Map() </span>构造器去创建一个的map。

### 数字（Numbers）

Dart数字来自于两种类别：

**[int][71]**
整型值不再大于64位，而取决于所在的平台。在Dart VM里，这些值取值范围是：-2<sup>63</sup> ~ 2<sup>63</sup>-1。编译为JavaScript的Dart，使用的[JavaScript numbers][73]，是允许范围：-2<sup>53</sup> ~ 2<sup>53</sup>-1。

**[double][72]**
64位（双精度）单浮点数字，就像IEEE 754标准中指定的。

<span style="color:#008f8e"> int </span>和<span style="color:#008f8e"> double </span>都是[num][74]的子类。数字类型都包含基本的操作符，譬如 +，-， /， *，同样在其他的方法中找到<span style="color:#008f8e"> abs() </span>, <span style="color:#008f8e"> ceil() </span>, <span style="color:#008f8e"> floor() </span>。（位操作符例如 >> 也定义在int类中。）如果num的子类中也找不到你要的方法，那就试试[dart:math][75]库。

整数是没有小数点的数字。 以下是定义整数文字的一些示例：
```dart
var x = 1;
var hex = 0xDEADBEEF;
```
如果一个数字带有小数点，他就是double。下面是些示例：
```dart
var y = 1.1;
var exponents = 1.42e5;
```
从Dart 2.1开始，必要时整数文字会自动转换为双精度数：
```dart
double z = 1; // Equivalent to double z = 1.0.
```
> 注意版本：在Dart2.1之前，以上写法是会报错的。即，把一个整型的示例放在double变量中。

下面是教你怎么把字符串转换成数字，或者反之亦然：
```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String 这很皮
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toString();
assert(piAsString == '3.14');
```
int类型指定了传统的位计算（<<，>>），AND（＆）和OR（|）运算符。 例如：
```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 >> 1) == 1); // 0011 >> 1 == 0001
assert((3 | 4) == 7); // 0011 | 0100 = 0111
```
直接列举的数字都是编译时常量。许多算术表达式也是编译时常量，只要它们的操作数是编译为数字的编译时常量。
```dart
const msPerSecond = 1000;
const secondUntilRetry = 5;
const msUntilRetry = secondUntilRetry * msPerSecond;
```

[71]:https://api.dartlang.org/stable/dart-core/int-class.html
[72]:https://api.dartlang.org/stable/dart-core/double-class.html
[73]:https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers/2803010#2803010
[74]:https://api.dartlang.org/stable/dart-core/num-class.html
[75]:https://api.dartlang.org/stable/dart-math

### 字符串（Strings）
Dart的字符串是由UTF-16编码单元组成的序列，你用单引号或者双引号都可以创建一个字符串：
```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```
你能够使用 _${expression}_ 把一个表达式的值放进一个字符串中。如果这个表达式是一个标识符，那么可以省略{}。要获取对应于对象的字符串，Dart会调用object的toString()方法。
```dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, ' +
        'which is very handy.');
assert('That deserves all caps. ' +
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. ' +
        'STRING INTERPOLATION is very handy!');
```

> 注意：==操作符会比较两个对象是否相等。如果两个字符串的字符单元序列是相等的那他俩就是相等的。这个肯定和java不一样。

连接字符串，相邻的两个字符串用不用+号无所谓，很皮：
```dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
    'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```
另外一种可以创建多行的字符串：使用三个连续的单引号或者双引号标记：
```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```
还可以用 _r_ 创建原（raw）字符输出的字符串：
```dart
var s = r'In a raw string, not even \n gets special treatment.';
```
可以先看看[Runes](#符文（Runes）)是如果在一个字符串中表示Unicode字符的。

文字字符串是编译时常量，只要任何插值表达式是一个编译时常量，其值为null或数值，字符串或布尔值。
```dart
// These work in a const string.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// These do NOT work in a const string.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```
更多字符串的用法请看详情[字符串和常规表达式](#字符串和常规表达式)

### 布尔（Booleans）
Dart中使用bool来表述布尔值。只有两个值:true和false，都是编译时常量。

Dart的类型安全意味着您不能使用if(nonbooleanValue)或assert(nonbooleanValue)等代码。 相反，明确检查值，如下所示：

```dart
// Check for an empty string.
var fullName = '';
assert(fullName.isEmpty);

// Check for zero.
var hitPoints = 0;
assert(hitPoints <= 0);

// Check for null.
var unicorn;
assert(unicorn == null);

// Check for NaN.
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

### 列表（Lists）
也许最常用的集合在大多数的编程语言中是*数组*，或者是有顺序的一组对象。在Dart中，数组就是[List][76]，我们就叫他列表吧。

Dart的列表很像JavaScript的数组，以下是例子：
```dart
var list = [1, 2, 3];
```

> 注意：解释器会把*list*推断为整型数组（List<`int`>）。如果你试图给他添加一个非整型的对象，解释器就会报错。更多请看[类型推断][77]

列表使用从零开始的索引，其中0是第一个元素的索引，`list.length  -  1`是最后一个元素的索引。 您可以像在JavaScript中一样获取列表的长度并引用列表元素：
```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

要创建一个编译时常量的列表，请在列表声明之前添加const：
```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // Uncommenting this causes an error.
```

List类型提供很多方法来操作它。更多可以看[泛型][78]和[集合][79]

[76]:https://api.dartlang.org/stable/dart-core/List-class.html
[77]:https://www.dartlang.org/guides/language/sound-dart#type-inference
[78]:https://www.dartlang.org/guides/language/language-tour#generics
[79]:https://www.dartlang.org/guides/libraries/library-tour#collections

### 图（Maps）

一般而言，map存储的是键值对。键和值都可以存放任意类型的对象。键唯一，但是可以多次使用同一个值。Dart支持直接列举出一个map。如下：
```dart
var gifts = {
    // key:  value
    'first': 'partridge',
    'second': 'turtledoves',
    'fifth': 'golden rings'
};

var nobleGases = {
    2: 'helium',
    10: 'neon',
    18: 'argon',
};
```

> 注意：分析器会推测`gifts`为`Map<String, String>`，会把`nobleGases`推测为`Map<int, String>`。如果你试图要加错误的值类型进去，就会报错。更多请看[类型推测][80]。

你也可以用构造器去创建一个Map：
```dart
var gifts = Map();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

> 注意：在Dart 2.0中以及之后，new关键词是可以省略的。

增加元素：
```dart
var gifts = {'fisrt': 'partridge'};
gifts['fourth'] = 'calling birds';
```

获取元素：
```dart
var gifts = {'fisrt': 'partridge'};
assert(gifts['first'] == 'partridge');
```

如果那个键不存在，或者键对应的值不存在，会返回null：
```dart
var gifts = {'fisrt': 'partridge'};
assert(gifts[fifth] == null);
```

获取键值对的数量：
```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

创建一个编译时的Map，加上const就好：
```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // Uncommenting this causes an error.
```

[80]:https://www.dartlang.org/guides/language/sound-dart#type-inference

### 符文（Runes）

在Dart中，runes就是字符串的UTF-32编码单元，String是UTF-16。

Unicode为世界上所有书写系统中使用的每个字母，数字和符号定义唯一的数值。因为在Dart中字符串是16位的Unicode编码单元的序列，所以在其中表示32位的字符值就需要特定的语法。

一般的方式是使用`\uXXXX`，XXXX代表的是4个16进制的数值。举个例子，心(♥)的字符是`\u2665`。为了表示少于或多于4个数值，可以使用花括号。例子：笑的emoji表情(😆)是`\u{1f600}`。

[String](#字符串（Strings）)类型有几个属性可以提取到rune的信息。`codeUnitAt`和`codeUnit`属性返回的是16位的编码单元。使用`runes`就能获取这个字符串的符文。

下面是可运行的一段代码：
```dart
main() {
    var clapping = '\u{1f44f}';
    print(clapping);
    print(clapping.codeUnits);
    print(clapping.runes.toList());

    Runes input = new Runes(
        '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}'
    );

    print(new String.fromCharCodes(input));
}
```

> 注意：请小心使用runes的遍历操作。这个很容易就搞崩了（反转），取决于什么语言，编码集和操作。更多信息看Stack Overflow上的[如何反转Dart中的String][81]。

[81]:http://stackoverflow.com/questions/21521729/how-do-i-reverse-a-string-in-dart


### 符号（Symbols）
[符号][82]在Dart程序中表示了一个操作符或者标识符。你可能永远用不到它，但是他们对于用名称标识的API来说是无价的，因为缩小会更改标识符但不会更改标识符符号。

在标识符前加上#就能使用了：

```dart
#radix
#bar
```
符号是编译时常量。

[82]:https://api.dartlang.org/stable/dart-core/Symbol-class.html

## 函数（Functions）
Dart的的确确是一种面向对象语言，甚至连方法也是对象并且有一个属于它的类型：[Function][83]。这就意味着，方法可以被附上值或者当作参数一样传递给其他的方法。您也可以像调用函数一样调用Dart类的实例。更多请看[可调用的类][84]。

以下是一个方法的实现例子：
```dart
bool isNoble(int atomicNumber) {
    return _nobleGases[atomicNumber];
}
```
即使高效的Dart建议[为公开的API使用类型声明][85]，但是如果不声明，方法依然可以正常工作：
```dart
isNoble(atomicNumber) {
    return _nobleGases[atomicNumber];
}
```
对于那些仅有一个表达式的方法，可以使用简短地语法：
```dart
isNoble(atomicNumber) => _nobleGases[atomicNumber] != null;
```
`=> expr`表达式是`{ return expr; }`的缩写。`=>`符号在有些时候可以作为箭头语法。

> 注意：仅仅是只有一个表达式的方法才能使用这个，仅有一条声明语句不能使用。比方说，你不能使用[if声明][85]，但是可以使用[条件判断表达式][86]。

一个方法可以拥有两种类型的参数：必须的和可选的。必须的参数会放在可选参数前面。被称作是可选参数的依然可以被`@required`标注。看下一节了解更多。

[83]:https://api.dartlang.org/stable/dart-core/Function-class.html
[84]:https://www.dartlang.org/guides/language/language-tour#callable-classes
[85]:https://www.dartlang.org/guides/language/language-tour#if-and-else
[86]:https://www.dartlang.org/guides/language/language-tour#conditional-expressions


### 可选参数（Optional parameters）
[87]:[https://flutter.dev/]
[88]:[https://pub.dev/documentation/meta/latest/meta/required-constant.html]
[89]:[https://pub.dev/packages/meta]
[90]:[https://dart.dev/tools/pub/pubspec#sdk-constraints]
[91]:[https://dart.dev/guides/language/language-tour#cascade-notation-]
[92]:[https://pub.dev/packages/args]
[93]:[https://dart.dev/guides/language/language-tour#overridable-operators]
可选参数可以是位置参数，也可以是命名参数，但不能同时都有

#### 可选的命名参数（Optional named parameters）
调用方法的时候可以通过使用*paramName: value*指定参数名称：
```dart
enableFlags(bold: true, hidden false);
```
定义方法时可以使用{*param1, param2*, ...}来指定命名参数：
```dart
void enableFlags({bool bold, bool hidden}) {...}
```
[Flutter][87]实例创建表达式可能会变得很复杂，因此widget构造器仅仅只使用命名参数。这就让实例的创建表达式变得简单易读。
你可以在任何Dart代码中（不仅仅只有Flutter）使用注解[@required][88]来指明一个参数是必需参数：
```dart
const Scrollbar({Key key, @required Widget child})
```
构建**Scrollbar**时，分析器会在*child*参数时空缺的情况下报错.
[Required][88]被定义在[meta][89]包中。在使用它的时候要么直接导入*package:meta/mata.dart*，要么导入任何输出meta的包，比如说Flutter的*package:flutter/material.dart*包。
#### 可选的位置参数（Optional positional parameters）
将一系列方法参数包裹在*[]*中可以标识他们为位置参数：
```dart
String say(String from, String msg, [Strng device]) {
    var result = '$from says $msg';
    if (device != null) {
        result = '$result with a $device';
    }
    return result;
}
```
不使用位置参数：
```dart
assert(say('Bob', 'Howdy') == 'Bob says Howdy'); // true
```
使用位置参数：
```dart
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal'); // true
```
这里与JavaScript不同就在于，如果在调用同一个方法时，且参数列表长度不一致，在定义这个方法时就需要指定哪些参数可以不用必传，就像位置参数一样。如果没有使用*[]*来标识，分析器就会报错：*Info: Found this candidate, but the arguments don't match.*。并且在使用时发现，位置参数只能放在参数列表的最后位置：
```dart
// Correct
String say(String from, String msg, [String device, String device2]) {...}

// Incorrect
String say([String from], String msg, String device, String device2) {...}

// Incorrect
String say(String from, [String msg], String device, String device2) {...}
```
#### 默认参数值（Default parameter values）
你可以使用*=*号来给无论是命名参数还是位置参数的参数赋初始值。初始值必须是编译时常量。如果没有提供初始值，那么初始值是null。
举个例子：
```dart
void enableFlags({bool bold = false, bool hidden = false}) {...}
// bold will be true; hidden will be false.
enableFlags(bold: true);
```
> 弃用注意：以前代码里面可能使用的冒号(:)来作为参数初始值的赋值符号。原因是最初只有(:)支持命名参数。这个支持可能会被弃用，因此建议[使用=号来指定初始值][90]

接下来的例子展示了如何给位置参数给定初始值：
```dart
String say(String from, String msg,
    [String device = 'carrier pigeon', String mood]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  if (mood != null) {
    result = '$result (in a $mood mood)';
  }
  return result;
}

assert(say('Bob', 'Howdy') ==
    'Bob says Howdy with a carrier pigeon');
```
还可以指定list或者map来作为初始值：
```dart
void doStuff(
    {List<int> list = const[1, 2, 3],
    Map<String, String> gifts = const {
        'first': 'paper',
        'second': 'cotton',
        'third': 'leather'
    }}
) {
    print('list: $list');
    print('gifts: $gifts');
}
```
#### 主函数（The main() function）
每个app必须都有顶级main()方法，它是app的入口。main()方法返回void，接受List<String>作为参数。
举个例子：
```dart
void main() {
    querySelector('#sample_text_id')
        ..text = 'Click me!'
        ..onClick.listen(reverseText);
}
```
> 预先编码中的..语法被称作为[级联][91]，使用级联你可以在单个对象中对多个成员进行多种操作

```dart
void main(List<String> arguments) {
    print(arguments);

    assert(arguments.length == 2);
    assert(int.parse(arguments[0]) == 1);
    assert(arguments[1] == 'test');
}
```
你可以使用[args library][92]去定义和转换命令行参数
#### 作为第一类对象的函数（Functions as first-class objects）
你可以将一个方法作为参数传递给另外一个方法：
```dart
void printElement(int element) {
    print(element);
}

var list = [1, 2, 3];

list.forEach(printElement);
```
你可以把方法赋值给变量，就像这样：
```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

#### 匿名函数（Anonymous functions）
大多数方法都是有名称的，比如说main()和printElement()。当然你也可以创建一个没有名字的匿名方法，或者有时候叫做*lambda* 或者 *closure*，以至于你可能会将一个匿名方法赋值给一个变量，举个例子，你可以从一个集合中添加或者移除它。

一个匿名方法和命名的方法相同之处就是参数列表，都是可以是0个参数，用逗号隔开，可以使用参数竹节，用小括号包裹。

下面的例子就是匿名方法的形式：
```
([[Type] param1[, ...]]) {
    codeBlock;
};
```
下面的例子演示了定义一个匿名方法，它没有定义参数item的类型。这个方法，从list中获取每一个项，将每个项中指定位置的字符串打印出来：
```dart
var list = ['apple', 'bananas', 'oranges'];
list.forEach((item) {
    print('${list.indexOf(item)}: $item');
});
```
如果方法仅仅包含单个语句，你可以缩写成箭头函数的形式。
```dart
list.forEach((item) => print('${list.indexOf(item)}: $item'));
```
#### 词汇范围（Lexical scope）
Dart是一个具有词汇范围的语言，就意味着，变量的范围是只通过代码的布局静态决定的。你可以“跟着花括号向外走”去看看变量是否在范围内。

下面的例子说明了变量的范围等级：
```dart
bool topLevel = true;

void main() {
    var insideMain = true;

    void myFunction() {
        var insideNestedFunction() {
            var insideNestedFunction = true;

            assert(topLevel);
            assert(insideMain);
            assert(insideFunction);
            assert(insideNestedFunction);
        }
    }
}
```
可以看到， nestedFunction()方法是如何访问任何层级的变量。

#### 词汇闭包（Lexical closures）
闭包是一个能够访问在它词汇范围中的变量的方法对象，即使是在这个方法的原始范围之外使用它。

方法能够关闭它范围内定义的变量。在下面的例子中，makeAdder()方法捕获变量addBy。不论返回的方法在哪里，这个方法就只记住addBy。
```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

#### 测试函数的相等性（Testing functions for equality）
以下例子展示了顶级方法、静态方法和实例方法的相等性：
```dart
void foo() {} // A top-level funtion

class A {
    static void bar() {} // A static method
    void baz() {} // A instance method
}

void main() {
    var x;

    // Comparing top-level functions.
    x = foo;
    assert(foo == x);

    // Comparing static methods.
    x = A.bar;
    assert(A.bar == x);

    // Comparing instance methods.
    var v = A(); // Instance #1 of A
    var w = A(); // Instance #2 of A
    var y = w;
    x = w.baz;

    // These closures refer to the same instance (#2),
    // so they're equal.
    assert(y.baz == x);

    // These closures refer to different instances,
    // so they're unequal.
    assert(v.baz != w.baz);
}
```
因此说明，这三种方法之间是没有相等的一说，不同实例中的相同方法是不相等的。其余情况下是相等的。

#### 返回值（Return values）
所有方法都返回一个值，如果没有返回值则返回null。语句return null会被隐式的添加在方法末尾：
```dart
foo() {}
assert(foo() == null);
```

## 操作符（Operators）

Dart的操作符都列在下列表格中了。你可以覆盖以下大部分的操作符，详情可见[覆盖操作符][93]。
| 描述 | 操作符|
| :------- | :-----------------------------: |
| 一元后缀(unary postfix) | expr++ expr-- () [] . ?. |
| 一元前缀(unary prefix) | -expr !expr ~expr ++expr --expr |
| 乘除(multiplicative) | * / % ~/ |
| 加减(additive) | + - |
| 移动(shift) | << >> >>> |
| 位与(bitwise AND) | & |
| 位非或(bitwise XOR) | ^ |
| 位或(bitwise OR) | \| |
| 关系和类型测试(relational type test) | >= > <= < as is is! |
| 相等性(equality) | == != |
| 逻辑与(logical AND) | && |
| 逻辑或(logical OR) | \|\| |
| 如果空(if null) | ?? |
| 条件(conditional) | expr1 ? expr2 : expr3 |
| 级联(cascade) | .. |
| 赋值(assignment) | = *= /= += -= &= ^= *etc.* |

### 字符串和常规表达式






