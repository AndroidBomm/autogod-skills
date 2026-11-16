# $http - 网络请求

- 更新时间:2026-04-10 17:55:36

网络请求

### 基础用法

### 示例-发送Json数据

//例如发送json: "{'name':'张三'}"
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
    //数据直接写js对象格式即可
data:{
name:"张三"
}
});

### 示例-发送Xml数据

//例如发送xml: "<name>zhang_san</name>"
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
    //数据直接写xml字符串即可
data:"<name>zhang_san</name>"
});

### 示例-发送表单数据

//例如发送表单: url?name=zhang_san&sex=boy
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
    //此时不要用data了，而是用form
form:{
name:"zhang_san",
sex:"boy"
}
});

### 示例-发送表单且文件

//例如发送的表单中含有一个头像图片
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
    //如果表单含文件，则用路径作为值，例如下面上传头像
form:{
name:"zhang_san",
sex:"boy",
head:"/sdcard/head.png",//头像图片路径
}
});

### 示例-发送单个文件

//例如发送文件: "/sdcard/test.js"
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
    //此时data需要指定一个存在的文件路径
data:"/sdcard/test.js"
});

### 示例-发送二进制

//例如发送一段二进制字符串: "我会被转换成二进制"
$http.post({
url:"",//请求地址
head:{
"key":"value",
"key2":"value2"
},
data:"我会被转换成二进制",
    //此时需要使用type来指定发送的数据类型:(默认是string,当有文件的时候会自动用文件类型，如需二进制发送，需要声明类型为byte)
type:"byte",//会以二进制的形式发送字符串
});

#常用函数

### uri(uri)

解析Uri字符串

如果你想通过文件提供器{FileProvider}来解析文件路径，那么可以使用$file.uri("path");函数

- 参数 : uri {String} Uri字符串

- 返回 : {Uri} Uri对象

- 版本 : 1.3.7

```javascript
let uri = $http.uri("smsto:"+$str.uriEncode("13693749475"));

```
### get(url)

同步请求

- 参数 : url {url} 链接地址

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

```javascript
//全部配置参数
let opt = {
    url:"",//请求地址
    head:{
        "key":"value",
        "key2":"value2"
    },
    data: "请求数据",//支持file、xml、json、string等类型，会自动判断
    connectTimeout:30, //[可选]连接超时时间(默认30秒)
    readTimeout:30, //[可选]读超时时间(默认30秒)
    writeTimeout:30, //[可选]写超时时间(默认30秒)
    callTimeout:60 //[可选]请求超时时间(默认60秒)
}
//如果要发送文件
let opt = {
    url:"",//请求地址
    head:{ },
    data: "/sdcard/img.png"
}
//如果要发送json
let opt = {
    url:"",//请求地址
    head:{ },
    //直接写json对象，或json字符串也可以
    data: {
        "key":"value",
        "key2":"value2"
    }
}

```
### get(opts)

GET请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### post(opts)

POST请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### del(opts)

DELETE请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### delete(opts)

DELETE请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### put(opts)

PUT请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### patch(opts)

PATCH请求

- 参数 : opts {HttpOptions} 配置

- 返回 : {HttpResponse} 返回结果

- 版本 : 1.2.0

### download(url, savePath)

下载文件

- 参数 : url {string}  url

- 参数 : savePath {string} 保存路径

### download(url, savePath, completeCallback)

下载文件

- 参数 : url {string}  url

- 参数 : savePath {string} 保存路径

- 参数 : completeCallback {()=>{}} 下载完成回调

### download(url, savePath, completeCallback, onFailure)

下载文件

- 参数 : url {string}  url

- 参数 : savePath {string} 保存路径

- 参数 : completeCallback {()=>{}} 下载完成回调

- 参数 : onFailure {(res)=>}  错误回调

### download(url, savePath, progressListener, completeCallback, onFailure)

下载文件

- 参数 : url {string}  url

- 参数 : savePath {string} 保存路径

- 参数 : progressListener {(cur,total,percent)=>{}} 进度监听器

- 参数 : completeCallback {()=>{}} 下载完成回调

- 参数 : onFailure {(res)=>}    错误回调

$http.download(
"https://pics0.baidu.com/feed/f11f3a292df5e0feee2783e88baf3fa75fdf727e.jpeg?token=4afc91463326e4f4a44e2cde691a54a0",
"/sdcard/美女.png",
(cur,total,percent)=>{
    log("下载进度",percent);
},()=>{
    log("下载完毕");
},(res)=>{
    log("下载失败",res);
});

### wifiIp()

获取wifi的ip地址

如果连接方式不是wifi则返回null

- 返回 : {string} ip地址

---





