## 状态栏


#状态栏 

更新时间:2026-06-15 07:53:04

状态栏-statusbar

本质上就是一个{MaterialTextView},只不过高度为状态条的高度,此控主要用来占位置,避免手机状态条挡住主要的布局

原生类型:{com.google.android.material.textview.MaterialTextView}

  
  

状态栏：一般手机界面的最上方的部分就是状态栏。

#一、常用属性

#color - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <linear w="max" dir="v" gravity="center" h="max">
        <statusbar color="#518855" />
        <statusbar color="#B44A4A" />
        <statusbar color="#3574F0" />
    </linear>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar bg="#518855" />
</ui>

#bgImg - 背景图片

设置背景图片

<statusbar bgImg="./img.png"/>

#二、常用函数

#setColor(color)

设置颜色

参数 : color {string} 状态条颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let bar = ui.id("mBar");
//设置颜色
bar.setColor("#1E1F22");


---
