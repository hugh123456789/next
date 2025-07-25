---
title: 'Redis'
description: ''
date: 2025-07-19 10:00:00
image: './image/14.jpg'
---
# redis

### **1. 字符串 (String)**

- **缓存**：存储常用的数据，如用户信息、产品详情或计算结果等，以提高访问速度。
- **计数器**：使用 `INCR` 命令轻松实现访问计数、点赞数和评论数等功能。
- `SET key value`：设置指定 key 的值。
- `GET key`：获取指定 key 的值。
- `DEL key`：删除指定 key。
- `EXPIRE key seconds`：设置 key 的过期时间。
- `INCR key`：将 key 对应的值加 1。
- `DECR key`：将 key 对应的值减 1。

### **2. 哈希 (Hash)**

- **用户信息存储**：将用户的属性（如姓名、邮箱、年龄等）作为字段存储，便于快速访问和更新。
- **对象模型**：适用于在键值对内存中存储复杂对象，并进行高效修改。
- `HSET key field value`：设置 hash 中的字段。
- `HGET key field`：获取 hash 中指定字段的值。
- `HDEL key field`：删除 hash 中的特定字段。
- `HGETALL key`：获取 hash 中所有字段及其值。
- `HKEYS key`：获取 hash 中的所有字段名。
- `HVALS key`：获取 hash 中的所有字段值。

### **3. 列表 (List)**

- **消息队列**：使用列表的左推右弹特性实现驱动逻辑，如任务队列或通知队列。
- **活动日志**：存储用户操作记录、系统日志等，可以实现按时间顺序进行记录和检索。
- `LPUSH key value`：向列表左侧推入值。
- `RPUSH key value`：向列表右侧推入值。
- `LPOP key`：从列表左侧弹出值。
- `RPOP key`：从列表右侧弹出值。
- `LRANGE key start stop`：获取列表指定范围的元素。
- `LLEN key`：获取列表中的元素数量。

### **4. 集合 (Set)**

- **去重**：用于存储唯一用户、标签或事件，适合于去重操作。
- **社交网络**：实现好友关系、共同兴趣等的计算，例如社交网络中朋友的共同好友。
- `SADD key value`：向集合添加一个或多个成员。
- `SREM key value`：从集合中删除一个或多个成员。
- `SMEMBERS key`：获取集合中的所有成员。
- `SISMEMBER key value`：判断某个值是否是集合的成员。
- `SINTER key1 key2`：计算给定所有集合的交集。
- `SUNION key1 key2`：计算给定所有集合的并集。

### **5. 有序集合 (Sorted Set)**

- **排行榜**：可以很方便地实现游戏得分、用户评分等实时排行榜。
- **时间戳事件**：按时间排序存储事件，以及通过分数（例如时间）进行查询。
- **优先级队列**：可用于任务调度，将任务依据优先级（分数）进行安排。
- `ZADD key score member`：向有序集合添加一个成员及其分数。
- `ZREM key member`：从有序集合中删除一个成员。
- `ZRANGE key start stop`：获取有序集合中排序指定范围的成员。
- `ZRANK key member`：获取某成员在有序集合中的排名。
- `ZCARD key`：获取有序集合的成员数量。

### **6. 位图 (Bitmap)**

- **用户在线状态**：统计在线用户、活跃用户等。
- **统计分析**：例如，日活跃用户（DAU）等大数据计算。
- `SETBIT key offset value`：设置位图的某一位。
- `GETBIT key offset`：获取位图的某一位的值。
- `BITCOUNT key`：计算字符串中被设置为 1 的位的数量。

### **7. 超日志 (HyperLogLog)**

- **基数估计**：在内存受限的情况下，快速估算集合中独立元素的数量，而无需存储所有元素。
- **分析应用**：适用于日志分析、用户访问计数等大数据场景。
- `PFADD key element`：将元素添加到 HyperLogLog 中。
- `PFCOUNT key`：获取 HyperLogLog 的基数估计。

### **8. 地理位置 (Geospatial)**

- **位置服务**：存储和检索地理位置数据，适用于商业、物流和社交网络应用。
- **附近搜索**：查找某个位置附近的其他位置（如商店、用户等）。
- `GEOADD key longitude latitude member`：添加地理位置。
- `GEORADIUS key longitude latitude radius unit`：查找某个半径内的地理位置。
- `GEODIST key member1 member2`：计算两个地理位置之间的距离。

### **9. Stream 数据结构**

- `XADD key id field value`：向流中添加一条消息。
- `XRANGE key start end`：获取流中某一范围的消息。
- `XREAD STREAMS key count`：读取流中消息。

### **10. 事务与脚本**

- `MULTI`：开始一个事务。
- `EXEC`：执行事务中的所有命令。
- `DISCARD`：放弃事务中的所有命令。
- `WATCH key`：监视一个或多个 key 的变化，用于乐观锁。

### **11. 其他常用命令**

- `PING`：检测与 Redis 服务器的连接。
- `FLUSHALL`：删除所有数据库中的所有 key。
- `FLUSHDB`：删除当前数据库中的所有 key。
- `INFO`：获取关于 Redis 服务器的信息和统计数据。

**1. 缓存穿透 (Cache Penetration)**

- **成因：** 客户端请求的数据在缓存中不存在（缓存未命中），并且在数据库中也不存在，导致请求每次都会穿透缓存直接访问数据库。如果大量请求这类不存在的数据，会对数据库造成很大的压力，甚至导致数据库崩溃。这种情况通常发生在恶意攻击或爬虫程序尝试访问不存在的数据时。
- **影响：** 数据库压力增大，严重时会导致数据库崩溃。
- **解决方案：**
    - **缓存空对象：** 当数据库查询结果为空时，仍然将空值（例如 null 或特定的空对象）放入缓存，并设置一个较短的过期时间。这样，后续相同的请求会直接在缓存中命中，避免了穿透到数据库。
    - **布隆过滤器 (Bloom Filter)：** 布隆过滤器是一种高效的数据结构，用于判断一个元素是否可能存在于一个集合中。在缓存之前使用布隆过滤器进行过滤，如果布隆过滤器判断数据不存在，则直接返回，避免了访问缓存和数据库。这种方法适用于数据量非常大且允许一定误判率的场景。
    - **参数校验：** 在接口层面进行参数校验，过滤掉明显不合法的请求，例如 ID 为负数的请求。

**2. 缓存击穿 (Cache Breakdown)**

- **成因：** 一个热点 Key（访问非常频繁的 Key）在缓存中过期失效，此时大量并发请求同时访问该 Key，由于缓存中没有数据，这些请求会全部落到数据库上，导致数据库压力剧增。
- **影响：** 数据库压力增大，在高并发场景下可能导致数据库崩溃。
- **解决方案：**
    - **互斥锁 (Mutex Lock) 或分布式锁：** 只允许一个线程去数据库查询数据，并将查询结果写入缓存，其他线程则等待。这样可以避免大量请求同时访问数据库。
    - **永不过期：** 将热点 Key 设置为永不过期，或者设置较长的过期时间。这种方法需要注意缓存数据的一致性问题，如果数据发生变更，需要及时更新缓存。
    - **提前更新：** 在热点 Key 即将过期前，通过后台线程或定时任务提前更新缓存。

**3. 缓存雪崩 (Cache Avalanche)**

- **成因：** 大量缓存在同一时间过期失效，导致大量的请求同时落到数据库上，数据库无法承受如此大的压力而崩溃。这种情况通常发生在缓存服务器宕机或大量缓存 Key 设置了相同的过期时间时。
- **影响：** 数据库压力巨大，可能导致数据库崩溃，甚至整个系统瘫痪。
- **解决方案：**
    - **设置不同的过期时间：** 在设置缓存 Key 的过期时间时，加上一个随机数，避免大量的 Key 在同一时间过期。
    - **使用多级缓存：** 使用多级缓存架构，例如使用本地缓存（如 JVM 堆缓存）和分布式缓存（如 Redis）结合，降低缓存失效带来的影响。
    - **构建高可用缓存集群：** 部署多个 Redis 实例构成集群，避免单点故障导致所有缓存失效。
    - **限流降级：** 在缓存失效后，对数据库请求进行限流，避免大量请求涌入数据库。可以采用熔断或降级策略，例如返回默认值或错误信息。