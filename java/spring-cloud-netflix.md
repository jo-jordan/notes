# Spring Cloud Netflix简介
Spring Cloud Netflix为自动配置和绑定到Spring环境和其他Spring编程风格的Spring Boot应用提供了Netflix OSS的集成。使用一些简单的注解你可以快速的启用和配置在你应用中的公用模式和使用经过实战检验的Netflix组件编译大型分发系统。模式中提供了包含服务发现（Eureka）、断路器（Hystrix）、智能路由（Zuul）和客户端负载均衡（Ribbon）。

# 功能
- 服务发现：可以注册Eureka实例，客户端使用Spring管理的bean能够发现这个实例。
- 服务发现：内嵌的Eureka服务能够被声明式的Java配置创建。
- 断路器：使用饿简单的注解驱动方法装饰器来构建Hystrix客户端。
- 断路器：使用声明式的Jav配置能够集成Hystrix仪表盘。
- 客户端负载均衡：Ribbon
- 外部配置：从Spring环境到Archaius（使用Spring Boot框架以开启Netflix的本地组件）的桥梁。
- 路由和过滤器：Zuul过滤器的自动注册，和反向代理创建的配置方法的简单约定。