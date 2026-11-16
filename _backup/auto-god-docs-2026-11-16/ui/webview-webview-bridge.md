## $ - 桥梁对象


#$ - 桥梁对象 

更新时间:2026-06-15 07:53:05

WebView桥梁对象

作为WebView和脚本引擎之间的桥梁,在html中:$符号就是这个桥梁的对象名称,你可以直接通过$对象来调用这里提供的方法

#call(funcName)

调用注册函数

参数 : funcName {string} 函数名称

返回 : {string} 返回值

//在js中:注册一个函数
let ui = $ui.layout("./mUi.xml");
let mWeb = ui.id("mWebView");
mWeb.addFunc("mFunc",()=>{
    //获得无障碍权限
    $permit.wza();
    return "";//返回值是一个字符串类型,如果在html中不需要返回值,则不用写这行代码
});
//在html中:调用这个函数
$.call("mFunc");

#call(funcName, args)

调用注册函数

特别注意:由于webview只能处理简单类型的参数传递(安卓特性)，所以不能传入对象作为参数。

参数 : funcName {string} 函数名称

参数 : args {Object[]} 多个参数

返回 : {string} 返回值

版本 : 1.9.9

//在js中:注册一个函数
let ui = $ui.layout("./mUi.xml");
let mWeb = ui.id("mWebView");
//向webview中注册一个函数
mWeb.addFunc("desc",(name,age,sex)=>{
    //html调用函数时，会回调这个函数，注意:上方的类型可能会被转换成string类型：
    //例如在html中传入true作为参数，回调到这里后，应该这样判断:参数=='true'(注意使用双等于判断字符串类型)
    //因为webview只能处理简单的类型，可能会被转换成string类型的'true'。
    if(sex=='true'){
        log("我是男生");
    }else{
        log("我是女生");
    }
    return "我是"+name+"，今年"+age+"岁了";
});
//在html中:调用这个函数(参数只能传入简单类型，这是webview的限制)
$.call("desc","张三",18,true);

#log(log)

调用注册函数

此函数只能打印一个普通的文本内容，请注意调用方式

参数 : log {string} 日志文本

//在html中:
$.log("我是一个文本");

#toast(msg)

土司提示

参数 : msg {string} 信息

//在html中:
$.toast("我是一个文本");

#alert(msg)

对话框提示

参数 : msg {string} 信息

//在html中:
$.alert("信息");

#alert(title, msg)

对话框提示

参数 : title {string} 标题

参数 : msg {string} 信息

//在html中:
$.alert("信息","你好啊!");

#getClip()

获得剪切板

返回 : {string} 文字

//在html中:
let text = $.getClip();

#setClip(text)

设置剪切板

参数 : text {string} 文字

//在html中:
$.setClip("我是来自html中的字符串");


---
