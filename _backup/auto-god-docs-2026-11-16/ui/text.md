## 文本


#文本 

更新时间:2026-06-15 07:53:04

文本-text

原生类型:{com.google.android.material.textview.MaterialTextView}

#一、常用属性

#size - 文本尺寸

设置文本尺寸

单位:dp

<text size="100" />

#textSize - 文本尺寸

设置文本尺寸

单位:dp

<text textSize="100" />

#typeface - 文本字体

设置文本字体

可选值:sans,serif,mono,default,bold,italic,boldItalic

<text typeface="bold" />

#color - 文本颜色

设置文本颜色

<text color="#FF0000" />

#textColor - 文本颜色

设置文本颜色

<text textColor="#FF0000" />

#selectable - 是否可选则文本

设置是否可选则文本

<text selectable="true" />

#singleLine - 是否单行显示

是否单行显示

<text singleLine="true" />

#maxLines - 最大行数

设置最大行数

<text maxLines="3" />

#minW - 最小宽度

设置最小宽度

<text minW="100" />

#minH - 最小高度

设置最小高度

<text minH="100" />

#padding - 内边距

设置内边距

<!--padding顺序是:左,上,右,下-->
<!--padding只设置一个值：则设置所有方向的内边距-->
<!--padding只设置两个值：则设置左右和上下方向的内边距-->
<text padding="20" text="内边距" />

#gravity - 重力

设置重力

<text gravity="start" h="100" margin="20" text="重力:start" w="max" />

#bg - 背景颜色

设置背景颜色

<text bg="#1E1F22" text="背景颜色" />

#bgImg - 背景图片

设置背景图片

<text bgImg="./img.png" text="背景图片" />

#二、常用函数

#setText(text)

设置文本

参数 : text {string} 文本内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置文本
text.setText("新的内容");

#setColor(color)

设置文本颜色

参数 : color {int} 文本颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置文本颜色
text.setColor($color.RED);

#setColor(color)

设置文本颜色

参数 : color {string} 文本颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置文本颜色
text.setColor("#1E1F22");

#setBg(color)

设置背景颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置背景颜色
text.setBg($color.RED);

#setBg(color)

设置背景颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置背景颜色
text.setBg("#1E1F22");

#setSize(size)

设置文本尺寸

参数 : size {float} 尺寸

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//设置文本尺寸
text.setSize(18);

#getText()

获取文本内容

返回 : {string} 文本内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let text = ui.id("mText");
//获取文本内容
let t = text.getText();


---
