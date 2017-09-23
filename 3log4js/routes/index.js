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
