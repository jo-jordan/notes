# Spring Cloud Config简介
Srping Cloud Config在分发系统中为外部配置提供了对服务端和客户端支持。使用Spring Cloud Config可以将所有环境的所有配置文件集中管理。客户端和服务端上的理论完全符合Spring `Environment`和`PropertySource`概念，因此他们能够很好的和Spring应用一起工作，并且能够运用到任何的编程语言的应用中。作为一个经过从开发环境到测试环境最终到生产环境中的发布渠道的应用，你能够管理那些环境之间的配置，并且能够确保应用在迁移过程中能够获得他们任何需要的东西。服务存储后端默认的实现是使用的git，因此它可以轻松支持配置环境的标签版本，以及可用于管理内容的各种工具。使用Spring配置去实现和集成各种依赖也是很简单的事情。

# 功能
## Spring Cloud Config Server
Spring Cloud Config Server提供以下便利：
- 用于外部配置的基于HTTP资源的API（键值对或者与YAML相似的内容）。
- 加密和解密属性值（对称或者不对称）。
- 使用注解 `@EnableConfigServer` 会很容易集成到Spring Boot应用中。

## Spring Cloud Config Client
特别是对于Spring应用程序，Spring Cloud Config Client可以帮助你：
- 绑定到Config Server并使用远程配置源来初始化Spring `Environment`。
- 加密和解密属性值（对称或者不对称）。
- 可以给Spring中那些需要在配置发生改变时重新初始化的 `@Beans` 使用 `@RefreshScope`注解。
- 使用管理端点：
  - `/env`: 更新 `Environment`、重新绑定 `@ConfigurationProperties`和日志等级。
  - `/refresh`: 刷新被`@RefreshScope`注解的beans。
  - `/restart`: 重启Spring环境（默认是禁用的）。
  - `/pause` 和 `/resume`: 在 `ApplicationContext` 中调用 `Lisfcycle` 方法（ `stop()` 和 `start()` ）
- 引导应用环境：主应用的父级环境能够被训练去做任何事情（默认的情况下，它会绑定到Config Server并且会加密属性值）。