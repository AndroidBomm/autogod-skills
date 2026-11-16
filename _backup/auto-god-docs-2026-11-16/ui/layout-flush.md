## 刷新布局


#刷新布局 

更新时间:2026-06-15 07:53:03

刷新布局-flush

是布局父类的(XLayout)的子类,因此可以使用XLayout的所有方法

原生类型:{androidx.swiperefreshlayout.widget.SwipeRefreshLayout}

#一、常用属性

#minW - 最小宽度

设置最小宽度

单位:dp

<flush minW="20" />

#minH - 最小高度

设置最小高度

单位:dp

<flush minH="20" />

#bg - 背景颜色

设置背景颜色

<flush bg="#57965C" />

#bgImg - 背景图片

设置背景图片

<flush bgImg="res/t01.png" />

#padding - 内边距

设置内边距

参数顺序:左,上,右,下(单位:dp)

<flush padding="0,0,0,0" />

#gravity - 重力

设置重力

刷新布局只能设置前景重力，并且要求安卓6.0+。

<flush gravity="center" />

#二、常用函数

#flush(runnable)

设置下拉刷新监听

参数 : runnable {()=>{}} 刷新时执行的任务

//解析布局,获得ui对象
let ui = $ui.layout("./mUii.xml");
//获取控件
let fl = ui.id("mFlushLayout");
//监听下拉刷新
fl.flush(()=>{
    //处理一些事情...
});

#子控件属性表

被下拉刷新布局包含的子控件可以使用如下属性：

中文名

英文名

描述

解决方向

resolveDir

确定视图应遵循的实际布局方向，可选值为“rtl”（右到左）或“ltr”（左到右）

宽

w

设置视图的宽度，可选值为“auto”（自动，即WRAP_CONTENT）、“max”（最大，即MATCH_PARENT）或具体整数（单位为dp）

高

h

设置视图的高度，可选值为“auto”（自动，即WRAP_CONTENT）、“max”（最大，即MATCH_PARENT）或具体整数（单位为dp）


---
