## 按钮组


#按钮组 

更新时间:2026-06-15 07:53:03

按钮组-button-group

是布局父类的(XLayout)的子类

原生类型:{com.google.android.material.button.MaterialButtonToggleGroup}

#一、常用属性

#dir - 布局方向

设置布局方向

可选参数:v(纵向),h(横向)

<button-group dir="h">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#bg - 背景颜色

设置背景颜色

<button-group bg="#FF0000">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#bgImg - 背景图片

设置背景图片

<button-group bgImg="/res/t01.png">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#singleSelect - 是否是单选模式

是否是单选模式

<button-group singleSelect="false">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#selectRequire - 是否至少选一个

是否至少选一个

只在单选模式下有效

<button-group selectRequire="false">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#padding - 内边距

设置内边距

参数顺序:左,上,右,下(单位:dp)

<button-group padding="0,0,0,0"/>

#gravity - 重力

设置重力

可选值参考重力参数表

<button-group gravity="center">
    <button text="按钮1"/>
    <button text="按钮2"/>
</button-group>

#check(index)

选中按钮

参数 : index {int} 按钮下标

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获得控件
let bg = ui.get("mButtonGroup");
//选中按钮
bg.check(0);

#onCheck(callback)

监听选中按钮的下标

参数 : callback ((index)=>{}) 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获得控件
let bg = ui.id("mButtonGroup");
//监听选中按钮的下标
bg.onCheck((index)=>{
    $ui.toast(index);
});


---
