## 抽屉布局


#抽屉布局 

更新时间:2026-06-15 07:53:02

抽屉布局-drawer

是布局父类{XLayout}的子类,因此可以使用XLayout的所有方法

原生类型:{androidx.drawerlayout.widget.DrawerLayout}

#一、常用属性

#bg - 背景颜色

设置背景颜色

<drawer bg="#57965C" />

#bgImg - 背景图片

设置背景图片

<drawer bgImg="res/t01.png" />

#padding - 内边距

设置内边距

参数顺序:左,上,右,下(单位:dp)

<drawer padding="0,0,0,0" />

#gravity - 重力

设置重力

抽屉布局只能设置前景重力，并且要求安卓6.0+。

<drawer gravity="center" />

#open(gravity)

打开抽屉布局

参数 : gravity {String} 待打开的布局位置

//打开左边的抽屉
drawer.open("left");
//打开右侧的抽屉
drawer.open("right");

#close(gravity)

关闭抽屉布局

参数 : gravity {String} 待关闭的布局位置

//关闭左边的抽屉
drawer.open("left");
//关闭右侧的抽屉
drawer.open("right");

#子控件属性表

被抽屉布局包裹的子控件可以使用如下属性：

中文名

英文名

描述

布局方向

dir

设置子视图的排列方向，可选值为“rtl”（右到左）或“ltr”（左到右）

解决方向

resolveDir

确定视图应遵循的实际布局方向，可选值为“rtl”（右到左）或“ltr”（左到右）

宽

w

设置视图的宽度，可选值为“auto”（自动，即WRAP_CONTENT）、“max”（最大，即MATCH_PARENT）或具体整数（单位为dp）

高

h

设置视图的高度，可选值为“auto”（自动，即WRAP_CONTENT）、“max”（最大，即MATCH_PARENT）或具体整数（单位为dp）

布局重力

layout_gravity

设置视图的布局重力，通过GravityAdd获取对应的重力值

外边距

margin

设置视图的外边距，可传入单个整数（四边外边距相同）或四个整数（分别对应左、上、右、下外边距），单位为dp

左外边距

margin_left

单独设置视图的左外边距，单位为dp

上外边距

margin_top

单独设置视图的上外边距，单位为dp

右外边距

margin_right

单独设置视图的右外边距，单位为dp

下外边距

margin_bottom

单独设置视图的下外边距，单位为dp


---
