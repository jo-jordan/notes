# Kafka的单机单服务部署
## 使用Docker
### 配置zookeeper容器
Dockerfile:
```docker
FROM centos:latest

ENV ZOOKEEKER_VERSION "3.6.2"

RUN yum -y install java-1.8.0-openjdk wget vim lsof tar bzip2 unzip passwd sudo net-tools

RUN mkdir /opt/zookeeper &&\
    wget https://downloads.apache.org/zookeeper/zookeeper-3.6.2/apache-zookeeper-$ZOOKEEKER_VERSION-bin.tar.gz -P /opt/zookeeper

RUN tar zxvf /opt/zookeeper/apache-zookeeper*.tar.gz -C /opt/zookeeper

RUN echo "source /root/.bash_profile" > /opt/zookeeper/start.sh &&\
    echo "cp /opt/zookeeper/apache-zookeeper-"$ZOOKEEKER_VERSION"-bin/conf/zoo_sample.cfg /opt/zookeeper/apache-zookeeper-"$ZOOKEEKER_VERSION"-bin/conf/zoo.cfg" >> /opt/zookeeper/start.sh &&\
    echo "/opt/zookeeper/apache-zookeeper-"$ZOOKEEKER_VERSION"-bin/bin/zkServer.sh start-foreground" >> /opt/zookeeper/start.sh

EXPOSE 2181

ENTRYPOINT ["sh", "/opt/zookeeper/start.sh"]

```
构建命令:
```shell
cd /path/to/your-Dockerfile-root-dir
docker build -t edge/zookeeper:3.6.2 -f zookeeper.Dockerfile .
```

启动命令:
```shell
docker run -itd --name zookeeper -h zookeeper -p2181:2181 --network host edge/zookeeper:3.6.2 bash
```

### 配置kafka容器
```docker
FROM centos:latest

ENV KAFKA_VERSION "2.7.0"

RUN yum -y install java-1.8.0-openjdk wget vim lsof tar bzip2 unzip passwd sudo net-tools

RUN mkdir /opt/kafka &&\
    wget https://apache.website-solution.net/kafka/2.7.0/kafka_2.13-2.7.0.tgz -P /opt/kafka

RUN tar zxvf /opt/kafka/kafka*.tgz -C /opt/kafka &&\
    sed -i 's/num.partitions.*$/num.partition=3/g' /opt/kafka/kafka_2.13-$KAFKA_VERSION/config/server.properties

RUN echo "source /root/.bash_profile" > /opt/kafka/start.sh &&\
    echo "cd /opt/kafka/kafka_2.13-"$KAFKA_VERSION >> /opt/kafka/start.sh &&\
    echo "sed -i 's%zookeeper.connect=.$%zookeeper.connect=zookeeper:2181%g' /opt/kafka/kafka_2.13-"$KAFKA_VERSION"/config/server.properties" >> /opt/kafka/start.sh &&\
    echo "bin/kafka-server-start.sh config/server.properties" >> /opt/kafka/start.sh &&\
    chmod a+x /opt/kafka/start.sh

EXPOSE 9092

ENTRYPOINT ["sh", "/opt/kafka/start.sh"]

```

构建命令:
```shell
cd /path/to/your-Dockerfile-root-dir
docker build -t edge/kafka:2.7.0 -f kafka.Dockerfile .
```

启动kafka容器:
```shell
docker run -itd --name kafka -h kafka -p9092:9092 --network host edge/kafka:2.7.0 bash
```

# Kafka的单机集群部署
为了能够实现灵活配置，我们使用```bitnami/kafka:latest```和```bitnami/zookeeper:latest```作为镜像
## 使用Docker

### 配置docker-compose.yml文件
```yaml
version: '2.1'
services:
  zookeeper-0:
    image: bitnami/zookeeper:latest
    container_name: zookeeper-0
    hostname: zookeeper-0
    ports:
      - '2181:2181'
      - '2888:2888'
      - '3888:3888'
    environment:
      ZOOKEEPER_SERVER_ID: 0
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
      ZOOKEEPER_SERVERS: server.0=zookeeper-0:2888:3888 server.1=zookeeper-1:28881:38881 server.2=zookeeper-2:28882:38882
      ALLOW_ANONYMOUS_LOGIN: 'yes'
    extra_hosts:
      - "edge:127.0.0.1" 

  zookeeper-1:
    image: bitnami/zookeeper:latest
    container_name: zookeeper-1
    hostname: zookeeper-1
    ports:
      - '2182:2182'
      - '28881:28881'
      - '38881:38881'
    environment:
      ZOOKEEPER_SERVER_ID: 1
      ZOOKEEPER_CLIENT_PORT: 2182
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
      ZOOKEEPER_SERVERS: server.0=zookeeper-0:2888:3888 server.1=zookeeper-1:28881:38881 server.2=zookeeper-2:28882:38882
      ALLOW_ANONYMOUS_LOGIN: 'yes'
    extra_hosts:
      - "edge:127.0.0.1"
  
  zookeeper-2:
    image: bitnami/zookeeper:latest
    container_name: zookeeper-2
    hostname: zookeeper-2
    ports:
      - '2183:2183'
      - '28882:28882'
      - '38882:38882'
    environment:
      ZOOKEEPER_SERVER_ID: 2
      ZOOKEEPER_CLIENT_PORT: 2183
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_INIT_LIMIT: 5
      ZOOKEEPER_SYNC_LIMIT: 2
      ZOOKEEPER_SERVERS: server.0=zookeeper-0:2888:3888 server.1=zookeeper-1:28881:38881 server.2=zookeeper-2:28882:38882
      ALLOW_ANONYMOUS_LOGIN: 'yes'
    extra_hosts:
      - "edge:127.0.0.1"

  kafka-0:
    image: bitnami/kafka:latest
    container_name: kafka-0
    hostname: kafka-0
    depends_on:
      - zookeeper-0
      - zookeeper-1
      - zookeeper-2
    environment:
      KAFKA_BROKER_ID: 0
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-0:2181,zookeeper-1:2182,zookeeper-2:2183
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-0:9092
      KAFKA_LISTENERS: PLAINTEXT://:9092
      ALLOW_PLAINTEXT_LISTENER: 'yes'
      KAFKA_HEAP_OPTS: '-Xmx256m -Xms256m'
    ports:
      - "9092:9092"
    extra_hosts:
      - "edge:127.0.0.1"
    expose: 
      - 9092
  
  kafka-2:
    image: bitnami/kafka:latest
    container_name: kafka-1
    hostname: kafka-1
    depends_on:
      - zookeeper-0
      - zookeeper-1
      - zookeeper-2
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-0:2181,zookeeper-1:2182,zookeeper-2:2183
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:9093
      KAFKA_LISTENERS: PLAINTEXT://:9093
      ALLOW_PLAINTEXT_LISTENER: 'yes'
      KAFKA_HEAP_OPTS: '-Xmx256m -Xms256m'
    ports:
      - "9093:9093"
    extra_hosts:
      - "edge:127.0.0.1"
    expose: 
      - 9093
  
  kafka-3:
    image: bitnami/kafka:latest
    container_name: kafka-2
    hostname: kafka-2
    depends_on:
      - zookeeper-0
      - zookeeper-1
      - zookeeper-2
    environment:
      KAFKA_BROKER_ID: 2
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-0:2181,zookeeper-1:2182,zookeeper-2:2183
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-2:9094
      KAFKA_LISTENERS: PLAINTEXT://:9094
      ALLOW_PLAINTEXT_LISTENER: 'yes'
      KAFKA_HEAP_OPTS: '-Xmx256m -Xms256m'
    ports:
      - "9094:9094"
    extra_hosts:
      - "edge:127.0.0.1"
    expose: 
      - 9094
```

### 使用docker-compose.yml文件启动
```shell
cd /path/to/docker-compose.yml
docker-compose -d up
```

### 测试创建topic
```shell
./kafka-topic.sh --create --zookeeper zookeeper-0:2181 --topic mytopic
```

### 测试生产消息
```shell
./kafka-console-producer.sh --topic mytopic --broker-list kafka-0:9092,kafka-1:9093,kafka-2:9094
```

### 测试消费消息
```shell
kafka-console-consumer.sh --bootstrap-server kafka-0:9092 --topic mytopic
```
> 需要注意：zookeeper与kafka要在同一网络层，使用```docker-compose -d up```命令会默认指定一个网络层，如需自定义需要在文件中配置。

# Kafka的多机集群部署

# Kafka的数据复制
