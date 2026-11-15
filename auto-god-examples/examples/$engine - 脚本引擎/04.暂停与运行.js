//官方示例

//定义脚本路径
let path = "/example/$engine - 脚本引擎/test/delay.js";

//执行脚本(目的是拿到任务ID)
let id = $engine.run(path);

//我先创建一个应用级悬浮窗方便控制脚本引擎的暂停和开始
let appFloaty = $floaty.newApp(`
<ui>
    <button id="pause" text="暂停" />
    <button id="run" text="运行" />
    <button id="close" text="关闭" />
</ui>
`);

//绑定按钮点击事件
appFloaty.id("pause").click(() => {
    //暂停任务ID对应的脚本
    $engine.pause(id);
});

appFloaty.id("run").click(() => {
    //开始执行任务ID对应的脚本
    $engine.start(id);
});

appFloaty.id("close").click(() => {
    //关闭应用级悬浮窗
    appFloaty.close();
});



//示例结束