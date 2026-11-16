## 范围


#范围 

更新时间:2026-06-15 07:53:04

范围-range

原生类型:{com.google.android.material.slider.RangeSlider}

  
  

范围条：用来选择范围的滑动条。

#一、常用属性

#from - 开始值

设置开始值

<ui>
    <statusbar />
    <range from="0" to="100" w="max" />
</ui>

#to - 结束值

设置结束值

<ui>
    <statusbar />
    <range from="0" to="100" w="max" />
</ui>

#fromValue - 左初始值

设置左初始值

<ui>
    <statusbar />
    <range from="0" fromValue="10" to="100" w="max" />
    <range from="0" fromValue="20" to="100" w="max" />
</ui>

#toValue - 右初始值

设置右初始值

<ui>
    <statusbar />
    <range from="0" fromValue="10" to="100" toValue="50" w="max" />
    <range from="0" fromValue="20" to="100" toValue="50" w="max" />
</ui>

#step - 进步值

设置进步值

<ui>
    <statusbar />
    <range from="0" fromValue="10" step="1" to="100" toValue="50" w="max" />
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <range color="#57965C" from="0" fromValue="10" to="100" toValue="50" w="max" />
    <range color="#C94F4F" from="0" fromValue="10" to="100" toValue="50" w="max" />
    <range color="#3574F0" from="0" fromValue="10" to="100" toValue="50" w="max" />
</ui>

#label - 标签文字

设置标签文字

<ui>
    <statusbar />
    <range label="比例:" w="max" />
</ui>

#labelEnd - 标签文字尾部

设置标签文字尾部

<ui>
    <statusbar />
    <range labelEnd="%" w="max" />
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <range bg="#57965C" w="max" />
    <range bg="#C94F4F" w="max" />
    <range bg="#3574F0" w="max" />
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <range bgImg="example/$ui - 交互界面/19.range-范围条/img/img.png" w="max" />
</ui>

#二、常用函数

#onLabel(callback)

设置标签格式化

参数 : callback {(floatValue)=>{ return "标签"; }} 格式化回调

#onChange(callback)

设置变化监听

参数 : callback {(from,to)=>{}} 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let range = ui.id("mRange");
//设置数据变化监听
range.onChange((from,to)=>{
    //..
});

#getRange()

获取范围

返回 : {number[]}

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let range = ui.id("mRange");
//获取数据(开始,结束)
range.getRange();

#setData(from, to)

设置数据

参数 : from {float} 开始值(当前值一致)

参数 : to {float} 结束值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let range = ui.id("mRange");
//设置数据(开始,结束)
range.setData(0,100);


---
