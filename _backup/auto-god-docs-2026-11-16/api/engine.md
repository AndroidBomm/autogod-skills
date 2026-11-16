# $engine - 脚本引擎

- 更新时间:2026-02-28 22:38:43

脚本引擎

脚本引擎是全局唯一的对象，主要负责调度脚本的运行，脚本任务创建、运行、暂停、继续等操作都可以通过脚本引擎对象完成。

重要提示

在开发环境(AG.apk)中通过$engine.runCode(源码)的方式可以传入源码，但是请注意：打包后的apk，代码会被转换为混淆码，因为打包后的apk只能执行混淆码，所以直接传入源码的方式无法执行。

此时如果调用$engine.runCode(源码)会报错，如果传入的是代码路径，如果代码路径是相对项目的并且被打包到apk中，则可以直接通过执行代码路径的方式执行代码，只要是项目中的代码，打包的时候就会被转换成混淆码，因此$engine.run(项目中js路径)可以正常执行。

想要在打包后的apk中直接执行源码，则需要对接AG服务器的后端接口来实现，在打包的apk中通过接口将源码转换为混淆码，之后就能调用$engine.runCode(源码)来执行。

### run(path)

运行路径中的代码

- 参数 : path {string} 脚本路径

- 返回 : {string} taskID

- 版本 : 1.0.0

```javascript
let id = $engine.run("/sdcard/脚本.js");

```
### run(jsFile)

运行路径中的代码

- 参数 : jsFile {File} 代码文件

- 返回 : {string} taskID

- 版本 : 1.0.0

```javascript
let id = $engine.run($file.open("/sdcard/脚本.js"));

```
### runCode(code)

运行代码

- 参数 : code {string} 代码

- 返回 : {string} taskID

- 版本 : 1.0.0

```javascript
let id = $engine.runCode(`
    alert("提示","我被运行了");
```
`);

### runCode(path, code)

运行代码

此处传入的路径只是决定了$task中的上下文环境路径，但不是通过该路径读取文件内容，因此可以随意填写。

- 参数 : path {string} 路径(决定了$task的路径:$task.getPath())

- 参数 : code {string} 代码

- 返回 : {string} taskID

- 版本 : 1.0.0

```javascript
let id = $engine.runCode("/sdcard/main.js",`
    alert("提示","我被运行了");
```
`);

### pause(id)

暂停运行

该方法会暂停未执行完毕的所有脚本

- 参数 : id {string} 任务ID

- 版本 : 1.3.9

```javascript
let id = $engine.run("/sdcard/脚本.js");
//暂停运行
$engine.pause(id);
sleep(2000);
//继续运行
$engine.start(id);

```
### isPause(id)

判断任务是否处于暂停状态

遍历所有任务列表，查询这个id的任务是否处于暂停状态

- 参数 : id {string} 任务id

- 返回 : {boolean} false:运行态; true:暂停态; null:未找到;

- 版本 : 1.3.9

```javascript
let isPause = $engine.isPause(id);
if(isPause!=null){
    if(isPause){
        info("任务已暂停");
    }else{
        info("任务正在跑");
    }
}else{
    info("未找到任务");
}

```
### start(id)

开始运行

该方法会继续运行暂停的脚本

- 参数 : id {string} 任务ID

- 版本 : 1.3.9

```javascript
let id = $engine.run("/sdcard/脚本.js");
//暂停运行
$engine.pause(id);
sleep(2000);
//继续运行
$engine.start(id);

```
### ls()

列出所有的任务信息

- 返回 : {JsTaskInfo[]} 任务列表信息

- 版本 : 1.0.0

```javascript
let taskList = $engine.ls();
for(let task of taskList){
    log(task);
}

```
### stop(id)

停止指定任务

- 参数 : id {string} 任务id

- 版本 : 1.0.0

```javascript
let id = $engine.run("/sdcard/脚本.js");
$engine.stop(id);

```
### stopAll(exit)

停止所有任务

- 参数 : exit {boolean} 是否退出系统

- 版本 : 1.0.0

```javascript
$engine.stopAll(true);//会杀死app

```
### stopAll()

停止所有任务

- 版本 : 1.0.0

```javascript
$engine.stopAll();

```
### lsTask()

获得任务列表信息

- 返回 : {$task[]} 任务列表信息

- 版本 : 1.0.0

```javascript
let taskList = $engine.lsTask();
for(let task of taskList){
    log(task);
}

```
### has(id)

停止指定任务

- 参数 : id {string} 任务id

- 版本 : 1.5.0

```javascript
let id = $engine.run("/sdcard/脚本.js");
//怕判断任务是否存在(任务结束后会自动销毁)
let hasTask = $engine.has(id);
if(hasTask){
    $engine.stop(id);
}

```
---





