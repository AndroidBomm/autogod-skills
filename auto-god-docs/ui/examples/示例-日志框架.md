## example-log-view - 日志框架

# 案例-日志框架

更新时间:2026-06-22 19:00:00

使用日志组件显示应用运行日志，支持不同日志级别的显示。

## 核心代码

```xml
<!-- 日志框架界面布局 -->
<log id="mLog" bg="#1E1F22" textColor="#CCCCCC" />
```

## JavaScript 交互

```javascript
// 加载日志框架界面布局
let ui = $ui.layout("log_demo.xml");
let log = ui.id("mLog");

// 输出不同级别的日志
log.info("应用启动");
log.warn("内存占用较高");
log.error("网络请求失败");
log.debug("调试信息: " + JSON.stringify(data));
```


---
