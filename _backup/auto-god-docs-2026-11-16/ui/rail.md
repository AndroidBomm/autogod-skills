## 轨道


#轨道 

更新时间:2026-06-15 07:53:04

轨道-rail

这个控件和nav导航栏控件很像，只不过是竖向排列的

原生类型:{com.google.android.material.navigationrail.NavigationRailView}

  
  

轨道：和导航栏、工具栏、应用条很相似，但是这个组件是竖着的。

#一、常用属性

#iconTint - 图标颜色

设置图标颜色

<ui>
    <statusbar />
    <rail iconTint="#C94F4F" marginStart="80">
        <menu icon="ic_home_fill" text="主页" />
        <menu icon="ic_menu_fill" text="菜单" />
        <menu icon="ic_settings_fill" text="设置" />
    </rail>
</ui>

#textColor - 文本颜色

设置文本颜色

<ui>
    <statusbar />
    <rail marginStart="160" textColor="#C94F4F">
        <menu icon="ic_home_fill" text="主页" />
        <menu icon="ic_menu_fill" text="菜单" />
        <menu icon="ic_settings_fill" text="设置" />
    </rail>
</ui>

#checkColor - 选中后图标颜色

设置选中后图标颜色

<ui>
    <statusbar />
    <rail checkColor="#C94F4F" marginStart="240">
        <menu icon="ic_home_fill" text="主页" />
        <menu icon="ic_menu_fill" text="菜单" />
        <menu icon="ic_settings_fill" text="设置" />
    </rail>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <rail bg="#C94F4F">
        <menu icon="ic_home_fill" text="主页" />
        <menu icon="ic_menu_fill" text="菜单" />
        <menu icon="ic_settings_fill" text="设置" />
    </rail>
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <rail bgImg="example/$ui - 交互界面/18.rail-轨道/img/img.png" marginStart="80">
        <menu icon="ic_home_fill" text="主页" />
        <menu icon="ic_menu_fill" text="菜单" />
        <menu icon="ic_settings_fill" text="设置" />
    </rail>
</ui>

#二、常用函数

#setBg(color)

设置背景颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置背景颜色
rail.setBg($color.RED);

#setBg(color)

设置背景颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置背景颜色
rail.setBg("#1E1F22");

#setIconTint(color)

设置图标颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置图标颜色
rail.setIconTint($color.RED);

#setIconTint(color)

设置图标颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置图标颜色
rail.setIconTint("#1E1F22");

#setTextColor(color)

设置文本颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置文本颜色
rail.setTextColor($color.RED);

#setTextColor(color)

设置文本颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置文本颜色
rail.setTextColor("#1E1F22");

#setCheckColor(color)

设置选中颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置选中颜色
rail.setCheckColor($color.RED);

#setCheckColor(color)

设置选中颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//设置选中颜色
rail.setCheckColor("#1E1F22");

#check(index)

选中指定菜单

参数 : index {int} 菜单索引

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//选中指定菜单
rail.check(0);

#menu(callback)

监听菜单事件

参数 : callback {(title)=>{}} 菜单点击事件

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rail = ui.id("mRail");
//监听菜单事件
rail.menu((title)=>{
    toast(title);
});


---
