## 网页


#网页 

更新时间:2026-06-15 07:53:05

网页-webview

你可以用vant,vue,layui,element-ui等框架编写html界面，在这个控件中加载这个界面，之后就是处理一些交互函数了

  
  

强大的网页组件，可以展示华丽的html页面。

#一、常用属性

#bridge - 桥梁对象名称

设置桥梁对象名称

<webview bridge="bridge" />

#path - 网页路径

设置网页路径

<webview path="layout.html" />

#url - 网页链接

设置网页链接

<webview url="https://auto-god.netlify.app/" />

#padding - 内边距

设置内边距

<webview padding="0,0,0,0" />

#bg - 背景颜色

设置背景颜色

<webview bg="red" />

#bgImg - 背景图片

设置背景图片

<webview bgImg="res/bg.png" />

#二、常用函数

#onLoaded(onLoad)

设置加载完成回调

参数 : onLoad (()=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//设置加载完成回调
wv.onLoaded(()=>{
    //一般在控件加载完html之后注册一些交互函数,例如：
    wv.addFunc("getWza",()=>{
        $permit.wza();//获取无障碍权限
    });
    //之后就可以在html中使用:$.call("getWza");调用这个函数了
});

#clear()

清除网页缓存

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//清除网页缓存
wv.clear();

#loadUrl(url)

加载url

参数 : url url

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//加载url
wv.loadUrl("http://...");

#loadHtml(html)

加载html字符串

参数 : html html字符串

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//加载html字符串
wv.loadHtml(`
<html>
    //这里是html字符串
</html>
`);

#loadFile(path)

加载html文件

参数 : path html文件路径

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//加载html文件
wv.loadFile("./html/index.html");

#callJs(funcName, callBack)

调用js无参函数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJs("mFunc",(returnValue)=>{
    //..
});

#callJs(funcName)

调用js无参函数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数
wv.callJs("mFunc");

#callJsInt(funcName, param, callBack)

调用js的整数参数函数

参数 : funcName {String} js函数名

参数 : param {int} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsInt("setFontSize",22,(returnValue)=>{
    //..
});

#callJsInt(funcName, param)

调用js的整数参数函数

参数 : funcName {String} js函数名

参数 : param {int} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数
wv.callJsInt("setFontSize",22);

#callJsLong(funcName, param, callBack)

调用js的长整数参数函数

参数 : funcName {String} js函数名

参数 : param {long} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsLong("setLength",546894564564849,(returnValue)=>{
    //..
});

#callJsLong(funcName, param)

调用js的长整数参数函数

参数 : funcName {String} js函数名

参数 : param {long} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数
wv.callJsLong("setLength",546894564564849);

#callJsDouble(funcName, param, callBack)

调用js的浮点数参数函数

参数 : funcName {String} js函数名

参数 : param {float} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsDouble("setVal",3.1415926,(returnValue)=>{
    //..
});

#callJsDouble(funcName, param)

调用js的浮点数参数函数

参数 : funcName {String} js函数名

参数 : param {float} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsDouble("setVal",3.1415926);

#callJsFloat(funcName, param, callBack)

调用js的浮点数参数函数

参数 : funcName {String} js函数名

参数 : param {float} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsFloat("setVal",3.1415926,(returnValue)=>{
    //..
});

#callJsFloat(funcName, param)

调用js的浮点数参数函数

参数 : funcName {String} js函数名

参数 : param {float} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsFloat("setVal",3.1415926);

#callJsChar(funcName, param, callBack)

调用js的字符串参数函数

参数 : funcName {String} js函数名

参数 : param {char} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsChar("setChar",'A',(returnValue)=>{
    //..
});

#callJsChar(funcName, param)

调用js的字符串参数函数

参数 : funcName {String} js函数名

参数 : param {char} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsChar("setChar",'A');

#callJsBool(funcName, param, callBack)

调用js的布尔参数函数

参数 : funcName {String} js函数名

参数 : param {boolean} 参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsBool("setEnable",true,(returnValue)=>{
    //..
});

#callJsBool(funcName, param)

调用js的布尔参数函数

参数 : funcName {String} js函数名

参数 : param {boolean} 参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数
wv.callJsBool("setEnable",true);

#callJsStr(funcName, param, callBack)

调用js的长文本参数函数

在传入长文本之前，会把文本进行URL编码，所以在html使用的时候需要使用函数``解码才能得到原本的长文本内容。

参数 : funcName {String} js函数名

参数 : param {String} 长文本参数

参数 : callBack ((str)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数,如果有返回值,那么就会通过returnValue回调获取
wv.callJsStr("setCode","一大堆文字",(returnValue)=>{
    //..
});
//在html中的代码:
function setCode(str){
    //html使用的时候需要使用函数`decodeURIComponent`解码才能得到原本的长文本内容。
    let code =  decodeURIComponent(str);
    $.alert("代码",code);
}

#callJsStr(funcName, param)

调用js的长文本参数函数

在传入长文本之前，会把文本进行URL编码，所以在html使用的时候需要使用函数``解码才能得到原本的长文本内容。

参数 : funcName {String} js函数名

参数 : param {String} 长文本参数

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//调用js无参函数
//mFunc是html中定义的函数
wv.callJsStr("setCode","一大堆文字");
//在html中的代码:
function setCode(str){
    //html使用的时候需要使用函数`decodeURIComponent`解码才能得到原本的长文本内容。
    let code =  decodeURIComponent(str);
    $.alert("代码",code);
}

#addFunc(funcName, callback)

注册桥梁函数

向桥梁对象$中注册(添加)自定义函数，之后就可以在html中通过$.call(函数名称);来调用啦

参数 : funcName {()=>{ return "数据"; }} 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let wv = ui.id("mWebView");
//设置加载完成回调
wv.onLoaded(()=>{
    //一般在控件加载完html之后注册一些交互函数,例如：
    wv.addFunc("getWza",()=>{
        $permit.wza();//获取无障碍权限
    });
    //之后就可以在html中使用:$.call("getWza");调用这个函数了
});


---
