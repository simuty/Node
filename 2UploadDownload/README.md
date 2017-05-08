# Express.js 和 Formidable 上传文件


主要功能:

1. 采用**formidable**进行表单的上传下载;
2. 参数相关内容

**form的属性及方法**

```
1. encoding 设置字符集 默认UTF-8
2. uploadDir 默认文件上传缓存位置 默认为OS_TEMP位置
3. type 选择接受是multipart还是urlencoded的Content-Type请求头 默认全部
4. maxFieldSize 限制文件大小 默认 2mb 单位 字节
5. maxDields 限制header Format长度 默认为1000 为0则不限制
6. multiples 一次上传多个文件 默认为false 需要在input标签设置HTML5属性 multiple
hash
7. bytesReceived 目前接收到的字节数。
8. bytesExpected 预定总大小 字节
```
***parse(req,[cb])**

```
1. req 是HttpIncomingMeassage对象
2. cb 为callback函数 function(err,field,files)
err 错误
field 对象 是http请求Format的键值对即application/x-www-urlencoded内容
files 接收到的文件对象（当接受多个文件时为一个数组）
files.size 文件大小 单位是字节
files.path 缓存的目录及名字
files.name 上传时候的文件名
files.type 文件后缀类型 image/gif之类
files.mtime 最后修改时间

```


配置使用:

运行

```
node server.js
```
在浏览器中访问： http://127.0.0.1:3000/



配置详看: package.json;




[更多详见](http://www.jianshu.com/notebooks/6725301/latest)


