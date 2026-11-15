## example-dynamic-widget - 动态组件

# 案例-动态组件

更新时间:2026-06-22 19:00:00

通过代码动态添加组件到轨道（Rail）容器的示例。

## 核心代码

```xml
<!-- 动态组件界面布局 -->
<rail id="mRail" w="max" h="100" bg="#eee" />
<button id="mAddBtn" text="添加组件" />
```

## JavaScript 交互

```javascript
// 加载动态组件界面布局
let ui = $ui.layout("dyn_widget.xml");
let rail = ui.id("mRail");
let addBtn = ui.id("mAddBtn");
let count = 0;

// 添加按钮点击事件——动态创建组件并添加到轨道
addBtn.click(() => {
    count++;
    // 使用 $ui.layout() 动态创建视图
    let itemUi = $ui.layout(`<ui><button id="dynBtn" text="动态按钮${count}" w="wrap" h="wrap" /></ui>`);
    let btn = itemUi.id("dynBtn");
    rail.add(btn);
});
```


---
