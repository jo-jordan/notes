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
const baz = []; // Equivalent to `const []`

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

### 图（Maps）

### 符文（Runes）

### 符号（Symbols）

## 函数（Functions）

### 可选参数（Optional parameters）

#### 可选的命名参数（Optional named parameters）

#### 可选的位置参数（Optional positional parameters）

#### 默认参数值（Default parameter values）

#### 主函数（The main() function）

#### 作为第一类对象的函数（Functions as first-class objects）

#### 匿名函数（Anonymous functions）

#### 词汇范围（Lexical scope）

#### 词汇封闭（Lexical closures）

#### 测试函数是否相等（Testing functions for equality）

#### 返回值（Return values）

## 操作符（Operators）

### 字符串和常规表达式






