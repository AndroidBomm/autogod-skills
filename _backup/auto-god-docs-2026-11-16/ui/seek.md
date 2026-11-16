## 拖动条


#拖动条 

更新时间:2026-06-15 07:53:04

拖动条-seek

该组件比slider更加小巧，属于安卓原生组件。

原生类型:{android.widget.SeekBar}

#一、常用属性

#from - 开始值

设置开始值

<seek from="0" />

#to - 结束值

设置结束值

<tab to="100" />

#value - 当前值

设置当前值

<tab value="30" />

#padding - 内边距

设置内边距

<!--padding顺序是:左,上,右,下-->
<!--padding只设置一个值：则设置所有方向的内边距-->
<!--padding只设置两个值：则设置左右和上下方向的内边距-->
<tab seek="20" />

#bg - 背景颜色

设置背景颜色

<tab seek="#1E1F22" />

#bgImg - 背景图片

设置背景图片

<tab seek="./img.png" />

#二、常用函数

#onChange(callback)

设置数值变化监听

注意:只监听由用户手动触发的数值变化,若为编程时设置的数值,则忽略

参数 : callback {(value)=>{}}

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//设置选中的下标
seek.onChange((value)=>{
    //..
});
//取消监听 seek.onChange(null);

#onTouchStart(callback)

监听触摸开始

用户用手指滑动时，当触摸开始时回调。若要取消监听，则设置为null即可。

参数 : callback {()=>{}} 回调

版本 : 1.9.5

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//监听触摸开始
seek.onTouchStart(()=>{
    //..
});

#onTouchStop(callback)

监听触摸结束

用户用手指滑动时，当触摸结束时回调。若要取消监听，则设置为null即可。

参数 : callback {()=>{}} 回调

版本 : 1.9.5

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//监听触摸结束
seek.onTouchStop(()=>{
    //..
});

#getMin()

获取最小值

在安卓8.0以上的设备中，会获取最小值，否则就获取当前进度。

返回 : {int} 当前数值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//获取最小值
let minVal = seek.getMin();

#getMax()

获取最大值

返回 : {int} 当前数值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//获取最大值
let maxVal = seek.getMax();

#setValue(value)

设置数值

参数 : value {int} 数值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//设置数值
seek.setValue(50);

#getValue()

获取当前数值

返回 : {int} 当前数值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//获取进度数值
let value = seek.getValue();

#setFrom(value)

设置开始值

参数 : value {int} 数值

版本 : 1.9.5

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//设置开始值
seek.setFrom(0);

#setTo(value)

设置结束值

参数 : value {int} 数值

版本 : 1.9.5

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let seek = ui.id("mSeek");
//设置结束值
seek.setTo(50);


---
