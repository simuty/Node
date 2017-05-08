# Node

express login /loginout

界面逼格还行-_-

主要功能:

1. 登陆;
2. 退出;
3. 根据session判断是否为已经登陆，如访问： http://127.0.0.1:3000/home；
4. 将express基本功能按照mvc的形式展示。

所用的主要模块:

```
1. express, 路由.静态文件.模块分工等;
2. express-session, 采用session的方式解决http无状态;
3. body-parse: 解析body;
4. ejs模板引擎;
5. path模块;
```

配置使用:

运行

```
node app.js
```
在浏览器中访问： http://127.0.0.1:3000/


测试账号

```
账户： admin
密码： admin
```

配置详看: package.json;




[更多详见](http://www.jianshu.com/notebooks/6725301/latest)
