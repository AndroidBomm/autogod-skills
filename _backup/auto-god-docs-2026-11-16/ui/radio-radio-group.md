## 单选按钮组


#单选按钮组 

更新时间:2026-06-15 07:53:04

单选按钮组-radio-group

在此布局中，单选按钮会自动取消和选中，保证一组按钮只被选中一个

是布局父类的(XLayout)的子类

原生类型:{android.widget.RadioGroup}

#一、常用属性

#dir - 排列方向

设置排列方向

可选:v:竖向排列,h:横向排列

<radio-group dir="h" />

#color - 主题颜色

设置主题颜色

<radio-group color="#57965C" text="主题色为绿色" />

#padding - 内边距

设置内边距

<!--padding顺序是:左,上,右,下-->
<!--padding只设置一个值：则设置所有方向的内边距-->
<!--padding只设置两个值：则设置左右和上下方向的内边距-->
<radio-group padding="20" text="内边距" />

#gravity - 重力

设置重力

<radio-group gravity="start" h="100" margin="20" text="重力:start" w="max" />

#bg - 背景颜色

设置背景颜色

<radio-group bg="#1E1F22" text="背景颜色" />

#bgImg - 背景图片

设置背景图片

<radio-group bgImg="./img.png" text="背景图片" />

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储整数的关键字，获取值时可以直接通过$storage($存储)获取进度值。

注意：不同的控件存储的类型不同，对于本控件(进度条)则存储的是整数类型，表达当前进度值

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyRadioGroup"); -->
<ui store="MyRadioGroup">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyRadioGroup").getInt("index"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MyRadioGroup").getInt("index",0); -->
    <radio-group storeKey="index" storeDef="0">
        <radio text="吃饭"/>
        <radio text="睡觉"/>
        <radio text="游戏"/>
    </radio-group>
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyRadioGroup");//名称要一致
//获取数据
let data = storage.getInt("index",0);//数据类型是整数

#check(index)

设置选中的下标

参数 : index {int} 下标

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rg = ui.id("mRadioGroup");
//设置选中的下标
rg.check(0);

#onCheck(callback)

设置选中下标的事件回调

参数 : callback {(index)=>{}} 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rg = ui.id("mRadioGroup");
//设置选中下标的事件回调
rg.onCheck((index)=>{
    //..
});

#getCheckedIndex()

获取选择下标

返回 : {int} 下标 (-1表示没有选择)

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rg = ui.id("mRadioGroup");
//获得选择下标
let index = rg.getCheckedIndex();

#getCheckedText()

获取选择的文本

返回 : {string} 名称 (null表示没有选择)

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let rg = ui.id("mRadioGroup");
//获得选择的文本
let text = rg.getCheckedText();


---
