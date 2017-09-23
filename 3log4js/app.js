var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var log4js = require('./config/logConfig.js');

// var log = require('./config/log');


// log4js.configure({
//    appenders: [{
//      //日志过滤
//      type: 'logLevelFilter',
//     //  权重大于或者等于level【debug】的日志将会输出
//      level: 'DEBUG',
//      //仅仅筛选category1
//     //  category: 'category1',
//     //  同时支持数组
//     //  category: ['category1', 'category2'],
//      appender: {
//        type: 'file',
//        filename: 'default.log'
//      }
//    }]
//  })

//
// log4js.configure({
//   appenders: [{
//     type: 'dateFile',
//     level: 'DEBUG',
//     alwaysIncludePattern: true,
//     // category: 'access'
//     appender: {
//       type: 'DateFile',
//       filename: 'access.log',
//       pattern: '-yyyy-MM-dd.log',
//     }
//   }]
//  });
//  //实例化logger，类似console
//  var logger = log4js.getLogger('access');
//
//  app.use(log4js.connectLogger(logger, {
//    level: log4js.levels.INFO
//  }));

var app = express();
log4js.use(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
