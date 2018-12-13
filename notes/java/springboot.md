# Spring Boot

## 文件系统路径
使用spring自带的ResourceUtils类即可

1. 获取resources文件夹下的目录路径或者文件路径
```java
ResourceUtils.CLASSPATH_URL_PREFIX + "static/excel/test.xlsx"

```

2. 获取系统下的目录路径或者文件路径
```java
ResourceUtils.FILE_URL_PREFIX + "Users/lzjlxebr/static/excel/test.xlsx"
```

## Controller

1. 讲道理，相对路径和绝对路径的概念，我不是真的搞懂了，但是能确定的是，URI最前面加/就是绝对路径。
