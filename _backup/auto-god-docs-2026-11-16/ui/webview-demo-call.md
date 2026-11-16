## 案例-功能交互


#案例-功能交互 

更新时间:2026-06-15 07:53:05

本示例将展示一个简单的网页交互功能：实现html与脚本环境功能的相互调用

#Xml代码

<ui>
    <statusbar/>
    <button text="调用" id="but" />
    <webview id="webview" path="main.html" w="max" h="max" />
</ui>

#Html代码

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--
    适配安卓设备屏幕大小
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <title>Title</title>
</head>
<body>
<button onclick="test1()">测试</button>
<button onclick="test2()">获取无障碍权限</button>
<button onclick="test3()">获取名字</button>
</body>
<script>
    function test1() {
        $.alert("我是测试弹窗");
    }
    function test2() {
        //无返回参数
        $.call("getWza");
    }
    function test3() {
        //有返回参数
        var name = $.call("getName");
        $.alert("我的名字", name);
    }
    //没有参数
    function test4() {
        $.log("我被调用了!!!!!!");
    }
    //有参数 情人
    function test5(what) {
        return "我是你的" + decodeURIComponent(what);
    }
</script>
</html>

#JS代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
if (mAppbar != null) {
    mAppbar.back(() => {
        ui.finish();
    });
}
let wv = ui.id("webview");
let but = ui.id("but");
wv.onLoaded(() => {
    //获取无障碍权限
    wv.addFunc("getWza", () => {
        //获取无障碍权限
        $permit.wza();
    });
    //返回我的名字
    wv.addFunc("getName", () => {
        return "张三";//只能返回字符串(字符串 => 几乎所有的类型)
    });
});
but.click(() => {
    //调用html中提供的方法
    wv.callJsStr("test5", "小情人", (result) => {
        log("获得返回值:" + result);
    });
});
//最好放在最后显示主界面
ui.show();


---
