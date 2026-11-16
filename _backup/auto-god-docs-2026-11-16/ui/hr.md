## 分割线


#分割线 

更新时间:2026-06-15 07:53:04

分割线-hr

原生类型:{com.google.android.material.divider.MaterialDivider}

  
  

最简单的组件，没有之一。

#一、常用属性

#color - 颜色

设置颜色

<ui>
    <statusbar />
    <hr color="#C94F4F" />
</ui>

#size - 尺寸(px)

设置尺寸(px)

<ui>
    <statusbar />
    <!--允许设置小数，达到最小的尺寸 size=0.1 -->
    <hr margin="5" size="0.1" />
    <hr margin="5" size="1" />
    <hr margin="5" size="5" />
    <hr margin="5" size="10" />
</ui>

#start - 开始边距(dp)

设置开始边距(dp)

<ui>
    <statusbar />
    <hr start="100" />
</ui>

#end - 结束边距(dp)

设置结束边距(dp)

<ui>
    <statusbar />
    <hr end="100" />
</ui>

#二、常用函数

#size(size)

设置粗细

参数 : size {int} 粗细(px)

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let hr = ui.id("mHr");
//设置粗细
hr.size(20);

#insertStart(start)

设置开始边距

参数 : start {int} 开始边距

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let hr = ui.id("mHr");
//设置开始边距
hr.insertStart(20);

#insertEnd(end)

设置结束边距

参数 : end {int} 结束边距

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let hr = ui.id("mHr");
//设置结束边距
hr.insertEnd(20);

#setColor(color)

设置主题颜色

参数 : color {String} 颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let hr = ui.id("mHr");
//设置主题颜色
hr.setColor("#1E1F22");


---
