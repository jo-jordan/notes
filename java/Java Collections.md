# Java Collections

## Cloneable, java.io.Serializeable, RandomAccess
这些都是“标记接口”，将class标记为具有某些功能特性的class。这些接口均无任何方法与字段。
### Cloneable
在Object.copy()时允许字段到字段的复制

### java.io.Serializeable
允许序列化、反序列化，另外可注意：
- 父类如果实现了java.io.Serializable接口，那么其子类无需重复实现即可拥有序列化能力。但如果仅有子类实现接口，而父类未实现，则无法完成序列化
- static字段无法被序列化
- 非static的字段如果无需序列化可以使用transient标示
- 在未指定**serialVersionUID**的情况下，
 如果需要被序列化的类文件被修改，那么会报InvalidClassException

 ### RandomAccess
 允许随机访问，将数组的特性赋予给class，当在使用索引访问元素时，增加其访问效率。

## Iterable
赋予容器迭代功能。

## ArrayList



## LinkedList