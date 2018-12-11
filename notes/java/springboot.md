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

