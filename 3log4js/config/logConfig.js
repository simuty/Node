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
        // console.log('createPath: ' + pathStr);
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
