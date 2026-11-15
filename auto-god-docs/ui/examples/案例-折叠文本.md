## example-expand-text - 折叠文本

# 案例-折叠文本

更新时间:2026-06-22 19:00:00

使用折叠布局实现可展开/收起的文本展示，适合显示长文本的预览。

## 核心代码

```xml
<!-- 折叠文本界面布局 -->
<expand id="mExpand" dir="v" dur="300" exp="false">
  <text id="mTitle" text="标题" bg="#ddd" />
  <text id="mDesc" text="这里是可折叠的详细内容..." />
</expand>
<button text="切换" click="exp.change()" />
```

## JavaScript 交互

```javascript
// 加载折叠文本界面布局
let ui = $ui.layout("expand_demo.xml");
let exp = ui.id("mExpand");
let title = ui.id("mTitle");

// 点击标题切换展开/收起
title.click(() => {
    exp.change();
});
```


---
