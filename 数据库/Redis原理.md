# Redis原理

## 内存模型
- used_memory, 
- used_memory_rss, 进程使用的内存
- allocator_allocated

## 数据存储
key的驱逐并不会让使用过的内存得到回收，而是等待新数据的到来，这与使用的```malloc```方法有关。例如5GB的数据，突然间被删除了2GB，但实际内存占用大小依然是5GB。

## LRU(Last Recently Used)
可使用LRU来作为Redis唯一为了新增数据而清除旧数据的方式。
### Maxmemory的配置
如果Redis不能够为等待插入的数据开辟新内存空间，要么会报内存溢出的错误，要么会使得旧数据被驱逐(evict)，那么清除旧数据的依据就是LRU。
能否开启新内存空间就取决于配置文件中的maxmemory参数了，指定的大小就是Redis最终能够使用的大小了(但有可能除此之外会有一点额外的内存开销，例如子线程开启的)。
### LRU的策略
以下语句在配置文件中设置LRU的策略
```
maxmemory-policy noeviction
```

- noeviction: 直接报错，内存溢出。
- allkeys-lru: 优先驱逐使用频次最小的键。
- volatile-lru: 与allkeys-lru类似，但它只会驱逐设置过*expire*值的键。
- allkeys-random: 随机驱逐键。
- volatile-random: 随机驱逐设置过*expire*值的键。
- volatile-ttl: 驱逐设置过*expire*值的键，但优先驱逐TTL更短的键。
设置带有volatile前缀的策略就好像没有设置过一样，如果没有给键设置过期时间的话。
选择一个合适的策略对你的应用来说很重要，如果说没有指定，Redis也可以支持运行时设置

以下语句可以在运行时设置LRU的策略
```
CONFIG SET maxmemory-policy noeviction
```

有几条tips供你参考如何选择LRU策略:

- 当你希望请求的受欢迎程度呈幂律分布时，请使用**allkeys-lru**策略，也就是说，你希望访问元素的子集比访问其余元素的频率高得多，当然如果你不确定，也可以使用这个。
- 如果你具有对所有key进行连续扫描的周期性访问，或者当你期望分布是统一的（所有元素以相同的概率被访问）时，请使用**allkeys-random**。
- 如果你希望能够在创建缓存对象时通过使用不同的TTL值向Redis提供有关哪些是到期的最佳候选者的提示，请使用**volatile-ttl**。

### 驱逐进程是如何工作的？
- 一个新的命令被接收，表现为有新数据需要被添加。
- Redis检查内存使用情况，如果超过了最大限制，则会按照对应的策略来进行对应操作。
- 命令执行完毕，数据添加成功，或者其他的后续操作。

### LRU算法概要

### 新的LFU(Last Frequently Used)模型
Redis4.0可用。
使用key的使用频次来决定被驱逐的优先级。


[Using Redis as an LRU cache](https://redis.io/topics/lru-cache)