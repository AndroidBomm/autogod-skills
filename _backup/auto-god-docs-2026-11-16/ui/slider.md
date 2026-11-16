## 滑动条


#滑动条 

更新时间:2026-06-15 07:53:04

滑动条-slider

原生类型:{com.google.android.material.slider.Slider}

  
  

滚动条：常用于动态设置数字参数，通过滑动就可以变换数值。

#一、常用属性

#from - 开始值

设置开始值

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100 -->
        <slider  />
        <!-- 滑动条 设置开始值 from="20" -->
        <slider from="20" />
    </linear>
</ui>

#to - 结束值

设置结束值

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100 -->
        <slider  />
        <!-- 滑动条
        设置开始值 from="20"
        设置结束值 to="30"
        -->
        <slider from="20" to="30" />
    </linear>
</ui>

#value - 初始值

设置初始值

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置当前值为 50
        -->
        <slider value="50" />
    </linear>
</ui>

#step - 进步值

设置进步值

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置进步值为 1
        -->
        <slider step="1" />
    </linear>
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 设置主题颜色 color="#518855" -->
        <slider />
        <slider color="#518855" />
        <slider color="#B44A4A" />
    </linear>
</ui>

#label - 标签文字

设置标签文字

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置标签 label="进度:"
        -->
        <slider label="进度:" />
    </linear>
</ui>

#labelEnd - 标签文字尾部

设置标签文字尾部

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置尾部标签 labelEnd="个"
        注意：label和labelEnd只能有一个生效，避免重复设置
        -->
        <slider labelEnd="个" />
    </linear>
</ui>

#padding - 内边距

设置内边距

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100 -->
        <!--padding顺序是:左,上,右,下-->
        <!--padding只设置一个值：则设置所有方向的内边距-->
        <!--padding只设置两个值：则设置左右和上下方向的内边距-->
        <slider padding="5" />
        <slider padding="10" />
        <slider padding="15" />
    </linear>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置背景颜色 bg="#518855"
        -->
        <slider bg="#518855" />
        <slider bg="#B44A4A" />
    </linear>
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <linear w="max" h="max" dir="v" gravity="center">
        <!-- 滑动条 默认开始值是0 结束值是100
        设置背景图片 bgImg="/res/bg_slider.png"
        -->
        <slider bgImg="/res/bg_slider.png" />
    </linear>
</ui>

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储整数的关键字，获取值时可以直接通过$storage($存储)获取进度值。

注意：不同的控件存储的类型不同，对于本控件(进度条)则存储的是整数类型，表达当前进度值

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MySlider"); -->
<ui store="MySlider">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MySlider").getFloat("progress"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MySlider").getFloat("progress",50); -->
    <slider storeKey="progress" storeDef="50" />
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MySlider");//名称要一致
//获取数据
let data = storage.getFloat("progress",50);//数据类型是小数

#二、常用函数

#setBg(color)

设置背景颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置背景颜色
slider.setBg($color.RED);

#setBg(color)

设置背景颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置背景颜色
slider.setBg("#1E1F22");

#setColor(color)

设置主题颜色

参数 : color {int} 颜色值

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置主题颜色
slider.setColor($color.RED);

#setColor(color)

设置主题颜色

参数 : color {string} 颜色字符串

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置主题颜色
slider.setColor("#1E1F22");

#onLabel(callback)

设置标签格式化

参数 : callback {(floatValue)=>{ return "标签"; }} 格式化回调

#onChange(callback)

设置数值变化监听

注意:只监听由用户手动触发的数值变化,若为编程时设置的数值,则忽略

参数 : callback {(value)=>{}}

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置选中的下标
slider.onChange((value)=>{
    //..
});
//取消监听 slider.onChange(null);

#getValue()

获取当前进度值

返回 : {float} 当前数值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//获取当前进度值
let val = slider.getValue();

#setValue(value)

设置数据

参数 : value {float} 当前值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置当前值
slider.setValue(10);

#setFrom(from)

设置数据

参数 : from {float} 开始值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置开始大小
slider.setFrom(0);

#setStep(step)

设置数据

参数 : step {float} 进步值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置进步值
slider.setStep(1);

#setTo(to)

设置数据

参数 : to {float} 结束值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置结束大小
slider.setTo(100);

#setData(from, to)

设置数据

参数 : from {float} 开始值(当前值一致)

参数 : to {float} 结束值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置数据(开始,结束)
slider.setData(0,100);

#setData(from, to, value)

设置数据

参数 : from {float} 开始值

参数 : to {float} 结束值

参数 : value {float} 当前值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//设置数据(开始,结束,当前值)
slider.setData(0,100,20);

#onTouchStart(callback)

监听触摸开始

用户用手指滑动时，当触摸开始时回调。若要取消监听，则设置为null即可。

参数 : callback {()=>{}} 回调

版本 : 1.9.5

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let slider = ui.id("mSlider");
//监听触摸开始
slider.onTouchStart(()=>{
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
let slider = ui.id("mSlider");
//监听触摸结束
slider.onTouchStop(()=>{
    //..
});


---
