最近用到nodejs日志模块--[log4js](https://github.com/nomiddlename/log4js-node),弥补一下之前大致使用的迷惑。先看下图总览，接下来，主要由浅入深的记录log4js的常见配置。


![image.png](http://upload-images.jianshu.io/upload_images/326255-6be886e36059e614.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### 第一部分 入口【收集日志】

所谓的入口，其实就是所谓的**收集日志信息**，如何有效、分门别类的收集所需信息，使我们记录日志文件的第一步，当然，日志的作用就不在此啰嗦了。
log4js提供了**等级分类**与**别名分类**

配置

```
npm install log4js

```


#### 1.1 等级分类

创建文件testLog4.js,

```
//testLog4.js
var log4js = require('log4js');
//logger 是log4js的实例
var logger = log4js.getLogger();
logger.trace('this is trace');
logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
logger.error('this is error');
logger.fatal('this is fatal');

```

结果为


![image.png](http://upload-images.jianshu.io/upload_images/326255-83faf66aec5cd07d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


类似于console实例中的log/error等，这里先实例化log4js,采用不同的等级输出不同的信息。等级有低到高颜色渐变。


![image.png](http://upload-images.jianshu.io/upload_images/326255-019996231d1007d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


以上图片剽窃自[Node.js 之 log4js 完全讲解](https://zhuanlan.zhihu.com/p/22110802).

很直观的将不同的等级的日志分类。一方面方便了我们查看终端日志，另外之后在过滤中同样可以起到作用。

**分等级不就是为了便于查找么**，第一种分类法到此结束。

#### 1.2 类型分类

实例化log4js时指定一个别名，然后在日志中可以方便区分哪个文件等。

```
//testLog4.js
/*
  类型分类
 */
//实例化时，唯一可以传的一个参数category
var logger = log4js.getLogger('随便起名字啦');
logger.trace('this is trace');
logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
logger.error('this is error');
logger.fatal('this is fatal');
```

如下图

![image.png](http://upload-images.jianshu.io/upload_images/326255-ff459230c3c57af2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


一图胜前言，收集日志的方法都有了，具体的使用方法，后续罗列，紧接的任务就是**如何保存？**

### 第二部分 出口【输出日志】

#### 2.1 Appender

刚我们只是初始化实例，以不同的类型、等级输出。默认为**console输出**，如何保存在文件中，就是**appender**上场了。


![image.png](http://upload-images.jianshu.io/upload_images/326255-ccb0ce94fe2a3983.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 2.1.1 file保存

```
//testLog4.js
log4js.configure({
  //是appenders，不是单数
  appenders:[{
      //以文件格式存储
      type: 'file',
      //自动创建123.log文件
      filename: '123.log'
    }]
})
var logger = log4js.getLogger('appenders');
logger.info('this no error');
```

结果保存在123.log中：

```
//123.log
[2017-09-23 16:01:59.940] [INFO] appenders - this no error
```


##### 2.1.2 datefile保存

最简单的日期保存例子，将日志保存在日志文件中，以天为单位。

```
//testLog4.js
/*
  dateFile，根据时间保存文件位置，文件自动创建
 */
log4js.configure({
  appenders:[{
    type: 'dateFile',
    //文件名为= filename + pattern, 设置为alwaysIncludePattern：true
    filename: '234',
    pattern: '-yyyy-MM-dd.log',
    //包含模型
    alwaysIncludePattern: true,
  }]
})
var logger = log4js.getLogger();
logger.info('this is datefile');

```

结果: 

```
//234-2017-09-23.log
[2017-09-23 16:17:06.764] [INFO] [default] - this is datefile

```

##### 2.1.3 levelFilter 过滤筛选

```
/*
  loglevelFilter 过滤筛选
 */

log4js.configure({
  appenders:[
    //控制台输出
    {"type": "console"},
    { //日志过滤
      type: 'loglevelFilter',
      //  权重大于或者等于level【debug】的日志将会输出
      level: 'WARN',
      //筛选model1
      category: 'model1',
      // 同时支持数组
      // category:['model1', 'model2'],
      appender:{
        type: 'file',
        filename: '345.log'
      }
    }
  ],
  "replaceConsole": true

})

var logger = log4js.getLogger('model1');
logger.trace('this is trace');
logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
logger.error('this is error');
logger.fatal('this is fatal');

var logger = log4js.getLogger('model2');
logger.trace('this is trace');
logger.debug('this is debug');
logger.info('this is info');
logger.warn('this is warn');
logger.error('this is error');
logger.fatal('this is fatal');

```

结果筛选如下


![image.png](http://upload-images.jianshu.io/upload_images/326255-01729d3217bbfbf5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 第三部分 layout配置

暂缓



### 第四部分 实例配置Express+log4js

#### 4.1 需求一

1. 每天生成一个日志文件,放在/logs目录下，名字如2017-09-23.log；
2. 单独将log4js配置在一个文件中，外界不需要每次配置；
3. 记录客户端请求的HTTP状态码、URL、方法。
4. 终端显示**所有**日志信息，日志文件**只记录WARN**以及以上级别的信息。

[GitHub--地址](https://github.com/mugworts/Node/tree/master)

配置文件：logConfig.js

```
var log4js = require('log4js');
const fs = require('fs');

levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
};

function judgePath(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
}

log4js.configure({
  appenders:[
    //控制台输出
    {"type": "console"},
    {type: 'dateFile',
    //文件名为= filename + pattern, 设置为alwaysIncludePattern：true
    filename: 'logs/', // 需要手动创建此文件夹
    pattern: 'yyyy-MM-dd.log',
    //包含模型
    alwaysIncludePattern: true,
  }],
  replaceConsole: true // 替换 console.log
})

exports.logger = function (name, level) {
    var logger = log4js.getLogger(name);
    //默认为debug权限及以上
    logger.setLevel(levels[level] || levels['debug']);
    return logger;
};

exports.use = function (app, level) {
  //加载中间件
    app.use(log4js.connectLogger(log4js.getLogger('logInfo'), {
        level: levels[level] || levels['debug'],
      //格式化http相关信息
        format: ':method :url :status'
    }));
};

```

app.js使用中间件

```
var log4js = require('./config/logConfig.js');
var app = express();
log4js.use(app);
```

index.js中使用log4js

```
var express = require('express');
var router = express.Router();
//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('../config/logConfig.js').logger('index.js', 'warn');

/* GET home page. */
router.get('/', function (req, res, next) {
  //不显示
    console.log('This is an index page!');
    logger.trace('This is an index page! -- log4js');
    logger.debug('This is an index page! -- log4js');
    logger.info('This is an index page! -- log4js');
    logger.warn('This is an index page! -- log4js');
    logger.error('This is an index page! -- log4js');
    logger.fatal('This is an index page! -- log4js');

    res.render('index', {title: 'log4js'});
});
module.exports = router;

```

#### 4.2 需求二


暂缓
















##### 参考列表
[Node.js 之 log4js 完全讲解](https://zhuanlan.zhihu.com/p/22110802)
[log4js－Node.js中的日志管理模块使用与封装](http://blog.csdn.net/youbl/article/details/32708609)
[Log4js配置详解](http://blog.csdn.net/hfty290/article/details/42843737)
[nodejs开发——log4js学习](http://www.bijishequ.com/detail/272625?p=)
[大搜车NodeJS日志规范化与分析监控](http://f2e.souche.com/blog/ri-zhi-gui-fan-hua-yu-fen-xi-jian-kong/)
[基于node+express+log4js的前端异常信息监控](https://www.html-js.cn/details/4J0pP2FcG.html)
[node.js项目中使用log4js保存日志文件](https://panmin.github.io/2017/06/12/node.js%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8log4js%E4%BF%9D%E5%AD%98%E6%97%A5%E5%BF%97%E6%96%87%E4%BB%B6/)



