## 悬浮按钮


#悬浮按钮 

更新时间:2026-06-15 07:53:04

悬浮按钮-fab

原生类型:{com.google.android.material.floatingactionbutton.FloatingActionButton}

  
  

一般配合帧布局：将按钮放在帧布局的上层来实现悬浮效果。

#一、常用属性

#anim - 动画

设置动画

<ui>
    <statusbar />
    <coord w="max">
        <appbar-layout w="max">
            <appbar back="true" id="mAppbar" scrollFlags="scroll|enterAlways" subTitle="悬浮按钮"
                title="Fab" w="max" />
        </appbar-layout>
        <nested behavior="appbar" h="max" w="max">
            <linear h="max" padding="20,20,20,100" w="max">
                <text h="1000" text="请滑动界面" />
                <!--自动显示隐藏-->
                <text gravity="center|start" marginTop="20" selectable="true"
                    text="自动显示隐藏\n在锚点布局(coord)中可以配置一个悬浮按钮自动显示和隐藏\n1.必须在coord布局中\n2.必须要设置behavior=fab:意思是开启悬浮按钮的自动显示和隐藏\n\n我们可以把锚点布局(coord)理解成一个升级版的帧布局(frame):通过layoutGravity属性可以控制悬浮按钮的位置" />
            </linear>
        </nested>
        <!--
        在锚点布局(coord)中可以配置一个悬浮按钮自动显示和隐藏
        1.必须在coord布局中
        2.必须要设置behavior="fab":开启悬浮按钮的自动显示和隐藏
        我们可以把锚点布局(coord)理解成一个升级版的帧布局(frame):通过layoutGravity属性可以控制悬浮按钮的位置
        -->
        <fab behavior="fab" icon="ic_build_fill" layoutGravity="end|bottom" margin="25"
            tip="构建" />
    </coord>
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <fab color="#57965C" marginRight="15" />
        <fab color="#C94F4F" marginRight="15" />
        <fab color="#3574F0" marginRight="15" />
        <fab color="#3574F0" />
    </linear>
</ui>

#icon - 图标

设置图标

icon/图标：用于指定图标，可以填写图标库的名称，也可以填写图标的相对路径或者绝对路径

<ui>
    <statusbar />
    <fab icon="ic_image_outline" />
</ui>

#path - 路径图标

设置路径图标

<ui>
    <statusbar />
    <fab path="example/$ui - 交互界面/07.fab-悬浮按钮/img/fab-icon.png" />
</ui>

#iconTint - 图标颜色

设置图标颜色

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <fab iconTint="#57965C" marginRight="15" />
        <fab iconTint="#C94F4F" marginRight="15" />
        <fab iconTint="#3574F0" marginRight="15" />
        <fab />
    </linear>
</ui>

#tip - 提示

设置提示

安卓8+才支持这个配置

<ui>
    <statusbar />
    <fab icon="ic_build_fill" tip="构建" />
</ui>

#radius - 弧度

设置弧度

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <fab marginRight="15" radius="10" />
        <fab marginRight="15" radius="15" />
        <fab marginRight="15" radius="20" />
        <fab radius="25" />
    </linear>
</ui>

#size - 尺寸

设置尺寸

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <fab marginRight="15" size="30" />
        <fab marginRight="15" size="35" />
        <fab marginRight="15" size="40" />
        <fab size="45" />
    </linear>
</ui>

#二、常用函数

#show()

显示悬浮按钮

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//显示控件
fab.show();

#hide()

隐藏悬浮按钮

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//隐藏控件
fab.hide();

#setColor(color)

设置主题颜色

参数 : color {String} 颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置主题颜色
fab.setColor("#1E1F22");

#setIcon(icon)

设置图标

参数 : icon {String} 图片名称

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置图标
fab.setIcon("logo_ag");

#setTip(tip)

设置提示信息

参数 : tip {String} 提示信息

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置提示信息
fab.setTip("开始执行");

#setPath(path)

设置图标路径

参数 : path {String} 图标路径

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置图标路径
fab.setPath("/res/icon.png");

#setIconTint(color)

设置图标颜色

参数 : color {String} 图标颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置图标颜色
fab.setIconTint("#C94F4F");

#setRadius(radius)

设置弧度

参数 : radius {Number} 圆角弧度

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置弧度
fab.setRadius(10);

#setSize(size)

设置尺寸

参数 : size {Number} 尺寸大小

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let fab = ui.id("mFab");
//设置尺寸
fab.setSize(30);


---
