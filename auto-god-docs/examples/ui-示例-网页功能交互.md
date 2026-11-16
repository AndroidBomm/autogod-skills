## example-webview-interop - 网页功能交互

# 案例-功能交互

更新时间:2026-06-22 19:00:00

WebView 中 JS 与原生代码互相调用的示例，实现网页调用 App 功能。

## 核心代码

```xml
<!-- WebView 交互界面布局 -->
<webview id="mWeb" src="file:///android_asset/index.html" w="max" h="max" />
```

## JavaScript 交互

```javascript
// 加载 WebView 界面布局
let ui = $ui.layout("webview_call.xml");
let web = ui.id("mWeb");

// App 调用网页 JS
web.eval("javascript:showMessage('Hello from App!')");

// 网页调用 App 方法
web.expose("appCall", (data) => {
    toast("收到网页消息: " + data);
    return "已收到";
});
```


---
