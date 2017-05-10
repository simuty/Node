var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');
var path = require('path');

var app = express();
app.listen(4000);

//---------------单个文件上传---------------------//
app.get('/', function(req, res, next){
      fs.readFile('./index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
})

app.post('/upload', function(req, res, next){
  //form表单
   var form = new formidable.IncomingForm();
   //保留后缀
   form.keepExtensions = true;
   form.encoding = 'utf-8';
   //上传的数据保存的路径
   form.uploadDir = './';
   //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
   // fields 是普通表单数据
   // files 是文件数据
  form.parse(req, function(err, fields, files) {
     res.writeHead(200, {'Content-type': 'text/plain'});
     //上传文件的名称
     var filename = files.upload.name;
     var path = files.upload.path;
     //移动并更名
     fs.rename(path, form.uploadDir + filename);
     //响应 格式化打印
     res.end(util.inspect(files));
   });
});

//---------------文件夹上传---------------------//
app.get('/files', function(req, res, next){
      fs.readFile('./indexz.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
})

app.post('/uploads', function(req, res, next){
  //form表单
   var form = new formidable.IncomingForm();
   //保留后缀
   form.keepExtensions = true;
   form.encoding = 'utf-8';
   //上传文件路径,采用path路径拼接
   form.uploadDir = path.join(__dirname, 'Files');
   //如果上传文件夹（多个文件）需将 默认值改为TRUE
  form.multiples = true;
  //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
  // fields 是普通表单数据
  // files 是文件数据
  form.parse(req, function(err, fields, files) {
     res.writeHead(200, {'Content-type': 'text/plain'});
     //该属性upload是在HTML文件的name中设置的
     for (let file of files.upload) {
       let pathnameArray = file.name.split('/');
       let folderPath = path.join(form.uploadDir, pathnameArray[0]);
       //如果不存在上传文件夹名称，就创建
       if (!fs.existsSync(folderPath)) {
          fs.mkdir(folderPath, 0777, function (err) {
              if (err) throw err;
          });
       }
       //移动文件夹并更改名称
      //  fs.rename(oldpath, newpath, callback)
      fs.rename(file.path, path.join(folderPath, pathnameArray[1]));
     }
     //响应 格式化打印 String
     res.end(util.inspect(files));
   });
});


//第一种下载方式 express 的 res.download()方式
app.get('/download', function(req, res, next){

  //采用res.download 的方式直接下载内容，[内容为测试package.json]
    res.download('./package.json', function(err){
      console.log(err);
    })
})
