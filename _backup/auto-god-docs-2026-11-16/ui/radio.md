## 单选按钮


#单选按钮 

更新时间:2026-06-15 07:53:04

单选按钮-radio

原生类型:{com.google.android.material.radiobutton.MaterialRadioButton}

  
  

单选按钮：一般需要配合单选按钮组(radio-group)的配合才能实现互相排斥的效果，这个控件常用在只需要在多个选择中选择一个的情况。

#一、常用属性

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio color="#3574F0" text="吃饭" />
        <radio color="#518855" text="睡觉" />
        <radio color="#B44A4A" text="游戏" />
    </radio-group>
</ui>

#check - 选中状态

设置选中状态

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio color="#3574F0" text="吃饭" />
        <radio check="true" color="#518855" text="睡觉" />
        <radio color="#B44A4A" text="游戏" />
    </radio-group>
</ui>

#text - 文本

设置文本

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio color="#3574F0" text="我是文本1" />
        <radio color="#518855" text="我是文本2" />
    </radio-group>
</ui>

#textColor - 文本颜色

设置文本颜色

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio color="#3574F0" text="我是文本1" textColor="#57965C" />
        <radio color="#518855" text="我是文本2" textColor="#C94F4F" />
    </radio-group>
</ui>

#minW - 最小宽度

设置最小宽度

<ui>
    <statusbar />
    <radio-group dir="v" w="max">
        <radio bg="#57965C" minW="100" text="最小宽度:100" />
        <radio bg="#3574F0" minW="150" text="最小宽度:150" />
        <radio bg="#C94F4F" minW="200" text="最小宽度:200" />
    </radio-group>
</ui>

#minH - 最小高度

设置最小高度

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio bg="#57965C" minH="50" text="最小高度:50" />
        <radio bg="#3574F0" minH="60" text="最小高度:60" />
        <radio bg="#C94F4F" minH="70" text="最小高度:70" />
    </radio-group>
</ui>

#padding - 内边距

设置内边距

<ui>
    <statusbar />
    <radio-group dir="v" w="max">
        <radio bg="#57965C" padding="10" text="内边距:10" />
        <radio bg="#3574F0" padding="20" text="内边距:20" />
        <radio bg="#C94F4F" padding="30" text="内边距:30" />
    </radio-group>
</ui>

#gravity - 重力

设置重力

<ui>
    <statusbar />
    <!--将宽度设置到最大才能看到效果-->
    <radio-group dir="v" w="max">
        <radio gravity="start" text="开始" w="max" />
        <radio gravity="center" text="中间" w="max" />
        <radio gravity="end" text="结束" w="max" />
    </radio-group>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <radio-group dir="v" w="max">
        <radio bg="#57965C" text="看我背景颜色" />
        <radio bg="#3574F0" text="看我背景颜色" />
    </radio-group>
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <radio-group dir="h" w="max">
        <radio bgImg="example/$ui - 交互界面/17.radio-单选按钮/img/img.png" color="bg"
            gravity="center" text="睡觉" textColor="bg" weight="0.2" />
        <radio bgImg="example/$ui - 交互界面/17.radio-单选按钮/img/img_1.png" color="bg"
            gravity="center" text="游戏" textColor="bg" weight="0.2" />
        <radio bgImg="example/$ui - 交互界面/17.radio-单选按钮/img/img_2.png" color="bg"
            gravity="center" text="吃饭" textColor="bg" weight="0.2" />
    </radio-group>
</ui>

#storeKey - 存储布尔值

存储布尔值

通过storeKey(存储关键字)指定一个存储布尔值的关键字，获取值时可以直接通过$storage($存储)获取布尔值。

注意：不同的控件存储的类型不同，对于本控件(开关)则存储的是布尔值类型，表达当前是否被选中

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyAppRadio"); -->
<ui store="MyAppRadio">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppRadio").getBool("eat"); -->
    <!-- 使用storeDef(存储默认值)属性，指定默认值，等价于使用代码：let data = $storage.create("MyAppRadio").getBool("eat",true); -->
    <radio storeDef="true" storeKey="eat" text="吃饭" />
    <radio storeDef="false" storeKey="sleep" text="睡觉" />
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyAppRadio");//名称要一致
//获取数据
let data = storage.getBoolean("eat",false);//数据类型是布尔值

#二、常用函数

#isChecked()

判断选中状态

返回 : {boolean} 是否选中了

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//判断选中状态
if(radio.isChecked()){
    log("选中了");
}

#check(checked)

设置选中状态

参数 : checked {boolean} 是否选中

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置选中状态
radio.check(true);

#onCheck(callback)

设置选中状态回调事件

参数 : callback {(isChecked)=>{}} 回调事件

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置选中状态回调事件
radio.onCheck((isChecked)=>{
    //..
});

#setGravity(gravity)

设置控件的对齐方式

参数 : gravity {String} 例如:"center|bottom"

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置控件的对齐方式
radio.setGravity("center|bottom");

#setText(text)

设置文字

参数 : text {String} 文字

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置文字
radio.setText("吃饭");

#getText()

获得文字

返回 : {String} 文字

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//获得文字
let text = radio.getText();

#setColor(color)

设置主题颜色

参数 : color {String} 颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置主题颜色
radio.setColor("#26282E");

#setTextColor(color)

设置文字颜色

参数 : color {String} 颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let radio = ui.id("mRadio");
//设置文字颜色
radio.setTextColor("#26282E");


---
