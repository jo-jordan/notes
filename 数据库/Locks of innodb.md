# `InnoDB`的锁

## 共享锁(Shared Locks)、独占锁(Exclusive Locks)
`InnoDB`实现了标准的行锁，分为两种类型，一种是共享锁(S)、一种是独占锁(X)。
- 共享锁(S)允许拥有锁的事务读行。
- 独占锁(X)允许拥有锁的事务更新或者删除行。

若事务T1在持有r行上的共享锁(S)，来自T2的请求会有如下情况：
- T2可以立即获取到S锁。从结果上来看即，T1，T2同时持有r行的S锁。
- T2无法立即获取到X锁。

若事务T1持有r行的X锁，不同的事务T2想要获取r行上的X锁，就需要等到T1释放r行的X锁。

## 意向锁(Intention Locks)
`InnoDB`支持多粒度锁，即允许表锁、行锁共存。例如：语句 `LOCAL TABLES ... WRITE` 会获取到指定表的X锁。`InnoDB`使用意向锁实现多粒度级别锁。意向锁是表级别的锁，它表明即将有事务会对表的某行数据进行加锁的操作，也就是获取行锁前，我们需要获取对应的表锁。以下是两个意向锁的类型：
- 意向共享锁(IS)，该锁指示了一个事务要在单独的行上获取共享锁。
- 意向独占锁(XS)，该锁指示了一个事务要在单独的行上获取独占锁。

例如：`SELECT ... LOCK IN SHARE MODE` 语句会获取到IS锁，`SELECT ... FOR UPDATE` 语句会获取到XS锁。

意向锁协议如下：
- 在一个事务获取某行数据的S锁之前，必须先获取IS锁或者更强粒度的表锁。
- 在一个事务获取某行数据的X锁之前，必须先获取对应表的IX锁。

表级别锁类型的兼容性如下表：
| |X|IX|S|IS|
|:-:|:-:|:-:|:-:|:-:|
|__X__|Conflict|Conflict|Conflict|Conflict|
|__IX__|Conflict|Compatible|Conflict|Compatible|
|__S__|Conflict|Conflict|Compatible|Compatible|
|__IS__|Conflict|Compatible|Compatible|Compatible|

若锁是不冲突的，则可以被不同事务同时获取。反之就不能获取。有冲突就必须等待冲突锁的释放，否则可能发生死锁错误。

意向锁不会导致阻塞，但除了全表请求(例如：`LOCAL TABLES ... WRITE`)。意向锁的主要目的是为了告知有其他事务正在锁行，或者将要锁行。

意向锁事务数据可由 `SHOW ENGINE `InnoDB` STATUS` 查看：
```sql
TABLE LOCK table `test`.`t` trx id 10080 lock mode IX
```

## 行锁(Record Locks)
行锁是某个索引记录上的锁。例如： `SELECT c1 FROM t WHERE c1 = 10 FOR UPDATE;` 会阻止`c1=10`的数据被删除、被修改。

行锁始终在索引上加锁，即使表没有定义任何索引。这个情况下，`InnoDB`会创建隐藏的聚簇索引，目的就是为了加锁。

行锁事务数据看起来如下：
```sql
RECORD LOCKS space id 58 page no 3 n bits 72 index `PRIMARY` of table `test`.`t`
trx id 10078 lock_mode X locks rec but not gap
Record lock, heap no 2 PHYSICAL RECORD: n_fields 3; compact format; info bits 0
 0: len 4; hex 8000000a; asc     ;;
 1: len 6; hex 00000000274f; asc     'O;;
 2: len 7; hex b60000019d0110; asc        ;;
```

## 间隙锁(Gap Locks)
间隙锁是建立在索引记录之间的锁，或者是建立在第一个索引之前、最后一个索引之后的锁。例如：`SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE;` 语句会阻止其他事务插入15这样的值到`t.c1`列，不管是否已经存在15了，因为在指定的范围内(10~20)的索引都被锁上了。

一个间隙可能是单个索引值，多个索引值，甚至可以是空的。

间隙锁是对性能和并发的一部分权衡，而且只会被用到某些事务隔离级别中，并非所有。

对于有明确指定了唯一索引的行，间隙锁不会被使用。(但这并不意味着，在使用了多个唯一索引查询条件的语句中，间隙锁也不会被使用，这个情况下，间隙锁会被使用到。)例如：`id`列有唯一索引，那么以下语句仅仅只会使用行锁，这也就是说，其他事务可以任意在这条索引前的间隙中插入数据。
```sql
SELECT * FROM child WHERE id = 100;
```
若，`id`没有被索引，或者索引不是唯一的，那么这条语句会使得`id=100`之前的间隙被上锁。

这里值得注意是，不同的事务可以将冲突的锁保持在间隙上。例如：事务A可以在一个间隙上持有共享间隙锁(gap S-lock)，事务B可以在同一个间隙上同时持有间隙独占锁(gap X-lock)。允许的原因是，当上间隙锁的数据被清除时，不同事务持有的同一个间隙的间隙锁一定会被合并。

间隙锁的目的是，单纯的阻止其他事务在上锁的间隙上进行插入操作，所以被称之为“纯抑制性(purely inhibitive)”。间隙锁可以共存。一个持有间隙锁的事务，并不会阻止另一个事务去获取同一个间隙锁。所以这里就没有共享锁与独占锁一说，他们不会冲突，并且有相同的功能。

当事务隔离级别调整为`READ COMMITTED`时，或者启用系统参数`innodb_locks_unsafe_for_binlog(已被启用)`时，间隙锁会被明确的禁用掉。在这些条件下，搜索和索引扫描都不会使用到间隙锁，只有检查外键约束和检查重复键时会被使用。

在使用`READ COMMITTED`级别时，或者启用系统参数`innodb_locks_unsafe_for_binlog(已被启用)`时，MySQL判断`WHERE`语句后没有匹配行的话，行锁就会被释放掉。对于`UPDATE`语句来说，`InnoDB`会进行“半一致”的读，这样一来，UPDATE中的读会返回最新提交到MySQL的版本，以至于MySQL能够判断`UPDATE`语句中的`WHERE`条件是否得到满足。

## Next-Key Locks
next-key锁是索引记录上行锁和索引记录前的间隙锁的结合。

`InnoDB`下的行级别锁在搜索或者表索引扫描具有如下表现，它会在它匹配到的索引记录上设置S锁或者X锁，因此行级别锁实际上就是索引记录锁。next-key锁在除了索引记录上设置锁，还会在索引记录之前的间隙设置。也就是说，next-key锁也就可以表示为，行锁加上间隙锁。如果一个会话中已经存在了一个S锁或者X锁在`R`记录的索引上，那么另外的会话就不能立即按照索引顺序插入新的索引记录到`R`之前的间隙中。

假设现在有索引包含如下的值，10, 11, 13和20。那么这个索引上的可能的next-key锁就会有如下的间隔。圆括号不包含，方括号包含。
```
(negative infinity, 10]
(10, 11]
(11, 13]
(13, 20]
(20, positive infinity)
```
对于最后一个时间间隔，next-key锁定将间隙锁定在索引中的最大值上方，并且“超级”伪记录的值高于索引中实际的任何值。 最高不是真正的索引记录，因此，实际上，此下一键锁定仅锁定跟随最大索引值的间隙。

默认的，`InnoDB`使用`REPEATABLE READ`隔离级别。以此来解决幻读行。

next-key事务数据如下：
```sql
RECORD LOCKS space id 58 page no 3 n bits 72 index `PRIMARY` of table `test`.`t`
trx id 10080 lock_mode X
Record lock, heap no 1 PHYSICAL RECORD: n_fields 1; compact format; info bits 0
 0: len 8; hex 73757072656d756d; asc supremum;;

Record lock, heap no 2 PHYSICAL RECORD: n_fields 3; compact format; info bits 0
 0: len 4; hex 8000000a; asc     ;;
 1: len 6; hex 00000000274f; asc     'O;;
 2: len 7; hex b60000019d0110; asc        ;;
```

## 插入意向锁(Insert Intention Locks)

插入意向锁是一种间隙锁，由`INSERT`在新增行之前设置。多个事务在同时往一个间隙写入新行时，如果不是写入到间隙内的同一个位置，则不用互相等待。假设现有索引值4和7。两个事务正在尝试各自写入值5和6，在获得对插入行的排他锁之前，每个事务对4-7之间的间隙上插入意向锁，但是由于行是无冲突的，因此不会彼此阻塞。

以下通过A、B两个客户端来演示事务获取插入意向锁的过程。

客户端A创建包含两个索引记录(90和102)的表，并且开启一个事务，在大于100的索引记录上设置X锁。X锁包含102之前的间隙锁：
```shell
mysql> CREATE TABLE child (id int(11) NOT NULL, PRIMARY KEY(id)) ENGINE=InnoDB;
mysql> INSERT INTO child (id) values (90),(102);

mysql> START TRANSACTION;
mysql> SELECT * FROM child WHERE id > 100 FOR UPDATE;
+-----+
| id  |
+-----+
| 102 |
+-----+
```
客户端B开启事务以插入记录到间隙中。这个事务会在获取X锁之前持有插入意向锁。
```shell
mysql> START TRANSACTION;
mysql> INSERT INTO child (id) VALUES (101);
```

## 自增锁(Auto-INC Locks)
## 预测锁(Predicate Locks for Spatial Indexes)
