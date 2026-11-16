## example-tab-pager - 标签联动

# 案例-标签联动

更新时间:2026-06-22 19:00:00

标签栏与分页器联动的经典 UI 模式，切换标签时页面同步切换。

## 核心代码

```xml
<!-- 标签联动界面布局 -->
<linear dir="v" w="max" h="max">
  <tab id="mTab" />
  <pager id="mPager" w="max" h="max" />
</linear>
```

## JavaScript 交互

```javascript
// 加载标签联动界面布局
let ui = $ui.layout("pager_tab.xml");
let tab = ui.id("mTab");
let pager = ui.id("mPager");

// 标签切换时同步更新分页
tab.change((index) => {
    pager.setCurrent(index);
});
```


---
