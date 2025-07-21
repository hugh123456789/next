---
title: 'SpringCloud'
description: ''
date: 2025-07-19 10:00:00

---
# **Spring-Cloud-Gateway**

- **1. 路由（Route）**

  你可以把路由想象成交通中的“路线”。当一个请求（比如你打开一个网页）发送到你的服务器时，Gateway 就像一个交通枢纽，它需要决定把这个请求送到哪里去处理。路由就是用来定义这些路线的。

  一个路由包含以下关键信息：

  - **ID：** 路线的唯一标识，方便管理。
  - **目标 URI：** 请求最终要被转发到的地址，也就是“目的地”。
  - **断言（Predicate）：** 决定什么情况下使用这条路线的“规则”。
  - **过滤器（Filter）：** 在请求转发过程中进行一些“处理”的“工具”。

  举个例子：

  假设你有两个服务：`用户服务` 和 `订单服务`。你想把所有以 `/user` 开头的请求都转发到 `用户服务`，把所有以 `/order` 开头的请求都转发到 `订单服务`。那么你就需要配置两条路由：

  - 路由 1：
    - ID：`user_route`
    - 目标 URI：`http://用户服务地址`
    - 断言：请求路径以 `/user` 开头
  - 路由 2：
    - ID：`order_route`
    - 目标 URI：`http://订单服务地址`
    - 断言：请求路径以 `/order` 开头

  这样，当一个请求 `/user/profile` 到达 Gateway 时，它会匹配到 `user_route`，然后被转发到 `用户服务`。

  **2. 断言（Predicate）**

  断言就像路线的“入口条件”。它决定一个请求是否“符合”某条路线。只有当断言的结果为“真”（True）时，该路由才会被使用。

  Gateway 提供了很多内置的断言：

  - **路径匹配（Path）：** 例如 `/user/**` 表示所有以 `/user/` 开头的路径。
  - **请求方法匹配（Method）：** 例如 `GET`、`POST` 等。
  - **请求参数匹配（Query）：** 例如 `?id=123`。
  - **Header 匹配：** 例如 `Content-Type: application/json`。
  - **时间匹配：** 例如在某个时间之后或之前生效。

  你也可以组合多个断言，例如“请求方法是 `POST` 并且路径以 `/user` 开头”。

  **3. 过滤器（Filter）**

  过滤器就像路线上的“收费站”或“检查站”。在请求被转发到目标 URI 之前或之后，过滤器可以对请求和响应进行一些处理。

  Gateway 也提供了很多内置的过滤器：

  - **添加/修改请求头或响应头：** 例如添加授权信息。
  - **修改请求参数：** 例如添加默认参数。
  - **重写请求路径：** 例如把 `/user/profile` 重写为 `/profile`。
  - **限流：** 限制单位时间内的请求数量。
  - **熔断：** 当后端服务出现故障时，快速失败并返回错误信息。

  过滤器可以串联起来使用，形成一个“过滤器链”，对请求进行多重处理。

  **总结**

  - **路由：** 定义请求的转发规则，包括目标 URI、断言和过滤器。
  - **断言：** 决定请求是否匹配某个路由的条件。
  - **过滤器：** 在请求转发过程中对请求和响应进行处理。

## 快速开始

```yml

gateway:
  routes:
    - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
      uri: http://localhost:8001                #匹配后提供服务的路由地址
      predicates:
        - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由
    - id: pay_routh2 #pay_routh2                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
      uri: http://localhost:8001                #匹配后提供服务的路由地址
      predicates:
        - Path=/pay/gateway/info/**              # 断言，路径相匹配的进行路由
```

```java
//consumer 

@RestController
public class GatwayController {
    @Resource
    private PayFeignApi payFeignApi;

    @GetMapping(value = "/feign/pay/gateway/get/{id}")
    public ResultData getById(@PathVariable("id") Integer id) {
        return payFeignApi.getById(id);
    }

    @GetMapping(value = "/feign/pay/gateway/info")
    public ResultData<String> getGatewayInfo() {
        return payFeignApi.getGatewayInfo();
    }
}
```



```java
//API
    
@FeignClient(value = "cloud-getway")
public interface PayFeignApi {

    @GetMapping(value = "/pay/gateway/get/{id}")
    public ResultData getById(@PathVariable("id") Integer id);
    
    @GetMapping(value = "/pay/gateway/info")
    public ResultData<String> getGatewayInfo();
}
```

```java
//provider- Controller
    
@RestController
public class PayGatwayController {

    @Resource
    PayService payService;

    @GetMapping(value = "/pay/gateway/get/{id}")
    public ResultData<Pay> getById(@PathVariable("id") Integer id) {
        Pay pay = payService.getById(id);
        return ResultData.success(pay);
    }

    @GetMapping(value = "/pay/gateway/info")
    public ResultData<String> getGatewayInfo() {
        return ResultData.success("gateway info test：" + IdUtil.simpleUUID());
    }
}
```

## uri写死的问题

```yml
gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由

        - id: pay_routh2 #pay_routh2                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/info/**              # 断言，路径相匹配的进行路由
```

## RoutePredicateFactory

```java
ZonedDateTime zbj = ZonedDateTime.now(); 
```

```yml
#After Route Predicate

spring:
  cloud:
    gateway:
      routes:
      - id: after_route
        uri: https://example.org
        predicates:
        - After=2025-01-16T16:57:39.580839900+08:00[GMT+08:00]    #在这个时间后

```

```yml
#Before Route Predicate

spring:
  cloud:
    gateway:
      routes:
      - id: before_route
        uri: https://example.org
        predicates:
        - Before=2025-01-16T16:57:39.580839900+08:00[GMT+08:00]   #在时间之前

```

```yml
#Between Route Predicate

spring:
  cloud:
    gateway:
      routes:
      - id: between_route
        uri: https://example.org
        predicates:
        - Between=2025-01-16T16:57:39.580839900+08:00[GMT+08:00], 2025-01-17T16:57:39.580839900+08:00[GMT+08:00] #在给定时间之间

```

```yml
#Cookie Route Predicate
    
    gateway:
      routes:
        - id: pay_routh1 
          uri: lb://cloud-payment-service         
          predicates:
            - Path=/pay/gateway/get/**              
            - Cookie=username,zhangsan
            - After=2025-01-16T16:57:39.580839900+08:00[GMT+08:00]
```

```yml
    #Header Route Predicate
    
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由
            - Cookie=username,zhangsan
            - After=2025-01-16T16:57:39.580839900+08:00[GMT+08:00]
            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
```

```yml
    #Host Route Predicate
    
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/**              # 断言，路径相匹配的进行路由
            - Cookie=username,zhangsan
            - After=2025-01-16T16:57:39.580839900+08:00[GMT+08:00]
            - Header=X-Request-Id, \d+
            - Host=**.xxx.com
```

```yml
    #Path Route Predicate
    
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/get/** 				#符合这个路径才能访问
```

```yml
    #Query Route Predicate
    
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Query=userId, \d+					#请求参数userId为数字
```

```yml
#RemoteAddr Route Predicate

    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - RemoteAddr=192.168.164.1/24			#ipconfig
```

```yml
 #Method Route Predicate
 
 gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Method=GET,POST
```

## 自定义RoutePredicate

```java
//参考AfterRoutePredicate

public class AfterRoutePredicateFactory extends AbstractRoutePredicateFactory<Config> {
    public static final String DATETIME_KEY = "datetime";

    public AfterRoutePredicateFactory() {
        super(Config.class);
    }

    public List<String> shortcutFieldOrder() {
        return Collections.singletonList("datetime");
    }

    public Predicate<ServerWebExchange> apply(final Config config) {
        return new GatewayPredicate() {
            public boolean test(ServerWebExchange serverWebExchange) {
                ZonedDateTime now = ZonedDateTime.now();
                return now.isAfter(config.getDatetime());
            }

            public Object getConfig() {
                return config;
            }

            public String toString() {
                return String.format("After: %s", config.getDatetime());
            }
        };
    }

    public static class Config {
        private @NotNull ZonedDateTime datetime;

        public Config() {
        }

        public ZonedDateTime getDatetime() {
            return this.datetime;
        }

        public void setDatetime(ZonedDateTime datetime) {
            this.datetime = datetime;
        }
    }
}
```

自定义

```java
@Component
public class MyRoutePredicateFactory extends AbstractRoutePredicateFactory<MyRoutePredicateFactory.Config> {

    public MyRoutePredicateFactory(Class<Config> configClass) {
        super(configClass);
    }

    @Override
    public Predicate<ServerWebExchange> apply(Config config) {
        return new Predicate<ServerWebExchange>() {
            @Override
            public boolean test(ServerWebExchange serverWebExchange) {
                String userType = serverWebExchange.getRequest().getQueryParams().getFirst("userType");
                if (userType == null) {
                    return false;
                }
                if(userType.equals(config.getUserType())){
                    return true;
                }
                return false;
            }

        };
    }

    @Validated
    public static class Config{
        @Setter
        @Getter
        @NotEmpty
        private String userType;
    }
}
```

```yml
    
    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - Method=GET,POST
            - name: My
              args:
                userType: gold
```

MyRoutePredicateFactory加上方法shortcutFieldOrder，支持- My=gold

```java
    public List<String> shortcutFieldOrder() {
        return Collections.singletonList("userType");
    }


    gateway:
      routes:
        - id: pay_routh1 #pay_routh1                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          #uri: http://localhost:8001                #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service          #匹配后提供服务的路由地址
          predicates:
            - My=gold
```

## 过滤器

```yml
    #AddRequestHeader添加请求头
    
    gateway:
      routes:
        - id: pay_routh2 #pay_routh2                #路由的ID(类似mysql主键ID)，没有固定规则但要求唯一，建议配合服务名
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            - Path=/pay/gateway/filter/**
          filters:
            - AddRequestHeader=hello,world 			#添加请求头
            - RemoveRequestHeader=test     # 删除请求头test
            
            - SetRequestHeader=test, xxx   		#修改请求头的值
            - AddRequestParameter=customerId,9527001 # 新增请求参数Parameter：k ，v
            - RemoveRequestParameter=customerName   # 删除url请求参数customerName，你传递过来也是null
            
            - AddResponseHeader=X-Response-atguigu, BlueResponse 
            - SetResponseHeader=Date,2099-11-11 # 设置回应头Date值为2099-11-11
            - RemoveResponseHeader=Content-Type # 将默认自带Content-Type回应属性删除
            
            - PrefixPath=/pay 					#加上前缀，前缀被过滤器管理
```

```yml

    gateway:
      routes:
        - id: pay_routh3 #pay_routh3
          uri: lb://cloud-payment-service                #匹配后提供服务的路由地址
          predicates:
            #- Path=/pay/gateway/filter/** # 真实地址
            #- Path=/gateway/filter/**              # 断言，为配合PrefixPath测试过滤，暂时注释掉/pay
            - Path=/XYZ/abc/{segment}           # 断言，为配合SetPath测试，{segment}的内容最后被SetPath取代
          filters:
            - SetPath=/pay/gateway/{segment}  # {segment}表示占位符，你写abc也行但要上下一致
            
            访问/XYZ/abc/filter------->/pay/gateway/filter
            
            
            
            - RedirectTo=302, http://www.atguigu.com/ # 访问http://localhost:9527/pay/gateway/filter跳转到http://www.atguigu.com/
```

