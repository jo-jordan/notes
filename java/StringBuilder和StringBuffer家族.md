
# StringBuilder和StringBuffer家族

刷着面试题，看到了StringBuffer相关的题目，由此点开了IDE，顺着一直向上点，把下面的图点出来了😂：

![]()

## interface Appendable
这个接口只定义了一个方法，使得一个字符序列(char sequence)是可以被扩增的，扩增完成后，把自己作为返回值。这里其实也就能看出来，为什么我们调用StringBuffer的append方法会返回一个StringBuffer。

## interface CharSequence
官方文档对其描述如下：

> A **CharSequence** is a readable sequence of char values. This interface provides uniform, read-only access to many different kinds of char sequences.
>
> A char value represents a character in the Basic Multilingual Plane (BMP) or a surrogate. Refer to Unicode Character Representation for details.

这里所说的readable应该是指的在IO流中是可以读取的意思🤔️，因为接口中定义了*chars*方法，这个方法是default的，也就是说CharSequence已经给我们实现好了

这里小提一嘴，interface中可以定义**default**的方法，也可以定义**static**方法，两者共同点如下：

- 都能有具体实现(英文管有实现的叫**define**，管没有实现的叫**declare**)。

其不同点如下：

- static方法不能被实现类的实例调用，只能通过接口直接调用，就如同其他的静态方法一样；而default方法只可以被实现类实例调用；
- 接口的子接口不能继承到static方法，而default能够被继承；
- default能够被子接口override或者overload，也就是能够将其变为抽象方法。


### chars方法
继续回到正题。chars方法正是被default关键字修饰的，其返回值是java.util.stream.IntStream，也是一个接口，IntStream的官方描述如下：

> A sequence of primitive int-valued elements supporting sequential and parallel aggregate operations. 
> This is the int primitive specialization of Stream.

翻译过来就是，一个支持顺序和并行聚合操作的的原始整数型序列，这是原始整数型的标准流。具体实现如下：
```java
/**
  * Returns a stream of {@code int} zero-extending the {@code char} values
  * from this sequence.  Any char which maps to a <a
  * href="{@docRoot}/java/lang/Character.html#unicode">surrogate code
  * point</a> is passed through uninterpreted.
  *
  * <p>If the sequence is mutated while the stream is being read, the
  * result is undefined.
  *
  * @return an IntStream of char values from this sequence
  * @since 1.8
  */
public default IntStream chars() {
    class CharIterator implements PrimitiveIterator.OfInt {
        int cur = 0;

        public boolean hasNext() {
            return cur < length();
        }

        public int nextInt() {
            if (hasNext()) {
                return charAt(cur++);
            } else {
                throw new NoSuchElementException();
            }
        }

        @Override
        public void forEachRemaining(IntConsumer block) {
            for (; cur < length(); cur++) {
                block.accept(charAt(cur));
            }
        }
    }

    return StreamSupport.intStream(() ->
            Spliterators.spliterator(
                    new CharIterator(),
                    length(),
                    Spliterator.ORDERED),
            Spliterator.SUBSIZED | Spliterator.SIZED | Spliterator.ORDERED,
            false);
}
```

方法中还define了**PrimitiveIterator.OfInt**接口的实现类，这个接口其实是完成了一件事，顺序遍历到**CharSequence**的所有元素，forEachRemaining方法是提供了更加便利的写法(lambda)。总之得到了**IntIteratorSpliterator**。

### codePoints方法
该方法将字符序列转换成码位序列。什么是[Code Point](https://en.wikipedia.org/wiki/Code_point)，中文名叫码位，比如在ASCII中，code point范围是0～7F(hex)，简单的理解就是，code point表示了每个字符的在编码表中的位置，以及对应的格式。方法结构如同上面的chars：
```java
/**
  * Returns a stream of code point values from this sequence.  Any surrogate
  * pairs encountered in the sequence are combined as if by {@linkplain
  * Character#toCodePoint Character.toCodePoint} and the result is passed
  * to the stream. Any other code units, including ordinary BMP characters,
  * unpaired surrogates, and undefined code units, are zero-extended to
  * {@code int} values which are then passed to the stream.
  *
  * <p>If the sequence is mutated while the stream is being read, the result
  * is undefined.
  *
  * @return an IntStream of Unicode code points from this sequence
  * @since 1.8
  */
public default IntStream codePoints() {
    class CodePointIterator implements PrimitiveIterator.OfInt {
        int cur = 0;

        @Override
        public void forEachRemaining(IntConsumer block) {
            final int length = length();
            int i = cur;
            try {
                while (i < length) {
                    char c1 = charAt(i++);
                    if (!Character.isHighSurrogate(c1) || i >= length) {
                        block.accept(c1);
                    } else {
                        char c2 = charAt(i);
                        if (Character.isLowSurrogate(c2)) {
                            i++;
                            block.accept(Character.toCodePoint(c1, c2));
                        } else {
                            block.accept(c1);
                        }
                    }
                }
            } finally {
                cur = i;
            }
        }

        public boolean hasNext() {
            return cur < length();
        }

        public int nextInt() {
            final int length = length();

            if (cur >= length) {
                throw new NoSuchElementException();
            }
            char c1 = charAt(cur++);
            if (Character.isHighSurrogate(c1) && cur < length) {
                char c2 = charAt(cur);
                if (Character.isLowSurrogate(c2)) {
                    cur++;
                    return Character.toCodePoint(c1, c2);
                }
            }
            return c1;
        }
    }

    return StreamSupport.intStream(() ->
            Spliterators.spliteratorUnknownSize(
                    new CodePointIterator(),
                    Spliterator.ORDERED),
            Spliterator.ORDERED,
            false);
}

```

## StringBuffer
StringBuffer拓展了**AbstractStringBuffer**，在**AbstractStringBuffer**中有两个主要变量：
- char[] value，初始容量16
- int count


那么在**StringBuffer**的一系列增删改查也是针对**value**在操作，似乎没那么难理解了。
