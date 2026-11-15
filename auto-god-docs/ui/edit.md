## 编辑框


#编辑框 

更新时间:2026-06-15 07:53:03

编辑框-edit

原生类型:{androidx.appcompat.widget.AppCompatEditText}

  
  

这是一种小巧的输入框

edit比input输入框更加小巧一些，是安卓原生拓展库的组件，而input输入框是M3风格的组件。

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <edit text="我是" textColor="#57965C" />
        <edit text="一个" />
        <edit text="简约的" textColor="#C94F4F" />
        <edit text="编辑框" textColor="#3574F0" />
    </linear>
</ui>

#一、常用属性

#hint - 提示文本

设置提示文本

<ui>
    <statusbar />
    <edit hint="提示文本" w="max" />
</ui>

#text - 文本

设置文本

<ui>
    <statusbar />
    <edit text="我是文本" w="max" />
</ui>

#textColor - 文本颜色

设置文本颜色

<ui>
    <statusbar />
    <edit text="我是文本" textColor="#C94F4F" w="max" />
</ui>

#def - 默认文本

设置默认文本

<ui>
    <statusbar />
    <edit def="默认文本" w="max" />
</ui>

#type - 输入内容的类型

输入内容的类型

可选值:
pass:密码,
num:数字,
phone:手机号

<ui>
    <statusbar />
    <!--密码类型-->
    <edit text="123456???" type="pass" w="max" />
    <!--数字类型-->
    <edit text="123" type="num" w="max" />
    <!--手机号码类型-->
    <edit text="15047070177" type="phone" w="max" />
</ui>

#size - 文本尺寸

设置文本尺寸

单位:sp

<ui>
    <statusbar />
    <edit text="文本尺寸:10" textSize="10" w="max" />
    <edit text="文本尺寸:15" textSize="15" w="max" />
</ui>

#minW - 最小宽度

设置最小宽度

单位:dp

<ui>
    <statusbar />
    <edit bg="#5557965C" minW="200" text="最小宽度:200" />
    <edit bg="#55C94F4F" minW="250" text="最小宽度:250" />
</ui>

#minH - 最小高度

设置最小高度

单位:dp

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <edit bg="#5557965C" minH="100" text="最小高度:100" />
        <edit bg="#55C94F4F" minH="150" text="最小高度:150" />
    </linear>
</ui>

#gravity - 布局重力

设置布局重力

<ui>
    <statusbar />
    <!--为了演示效果，宽度设置到最大 w=max -->
    <edit gravity="start|center" text="我在左边" w="max" />
    <edit gravity="center" text="我在中间" w="max" />
    <edit gravity="end|center" text="我在右边" w="max" />
</ui>

#padding - 布局内边距

设置布局内边距

<ui>
    <statusbar />
    <edit bg="#5557965C" padding="10,0,20,30" text="看我内边距" />
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <edit bg="#5557965C" text="看我背景颜色" w="max" />
    <edit bg="#55C94F4F" text="看我背景颜色" w="max" />
    <edit bg="#553574F0" text="看我背景颜色" w="max" />
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <edit bgImg="example/$ui - 交互界面/06.edit-编辑框/img/bg-edit.png"
        text="看我背景图片" textColor="#FFFFFF" w="max" />
</ui>

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储字符串的关键字，获取值时可以直接通过$storage($存储)获取字符串。

注意：不同的控件存储的类型不同，对于本控件(编辑框)则存储的是字符串类型，表达当前输入的内容

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyAppEdit"); -->
<ui store="MyAppEdit">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppEdit").getStr("eatFoodStr"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppEdit").getStr("eatFoodStr","吃饭"); -->
    <edit storeKey="eatFoodStr" storeDef="eatFoodStr" text="吃饭" />
    <edit storeKey="playGameStr" storeDef="我爱游戏" text="游戏" />
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyAppEdit");//名称要一致
//获取数据
let data = storage.getStr("我爱吃饭","未必");//数据类型是字符串

#二、常用函数

#getText()

获取输入框内容

返回 : {string} 内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let edit = ui.id("mEdit");
//获取输入框内容
let text = edit.getText();

#setError(msg)

设置异常信息提示

参数 : msg {string} 异常提示

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let edit = ui.id("mEdit");
//设置异常信息提示
edit.setError("输入内容不能为空");

#setText(text)

设置文字

参数 : text {string} 文字内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let edit = ui.id("mEdit");
//设置文字
edit.setText("新的内容");

#onChanged(callback)

监听文本改变

参数 : callback {(text,start,before,count)=>{}} 监听回调

版本 : 1.8.0

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//监听文本改变
mInput.onChanged((text,start,before,count)=>{
    log("文本改变了:"+text);
});

#onChangedAfter(callback)

监听文本改变后

参数 : callback {(text)=>{}} 监听回调

版本 : 1.8.0

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//监听文本改变
mInput.onChangedAfter((text)=>{
    log("文本改变了:"+text);
});

#onChangedBefore(callback)

监听文本改变前

参数 : callback {(text,start,count,after)=>{}} 监听回调

版本 : 1.8.0

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//监听文本改变
mInput.onChangedBefore((text,start,count,after)=>{
    log("文本改变了:"+text);
});

#setHint(hint)

设置提示

参数 : hint {String} 提示文本

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置提示
mInput.setHint("提示");

#setTextColor(color)

设置文本颜色

参数 : color {String} 文本颜色

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置文本颜色
mInput.setTextColor("#3574F0");

#setSize(size)

设置文本尺寸

参数 : size {Number} 文本尺寸

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置文本尺寸
mInput.setSize(10);

#setMinW(width)

设置最小宽度

参数 : width {Number} 最小宽度

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置最小宽度
mInput.setMinW(100);

#setMinH(height)

设置最小高度

参数 : height {Number} 最小高度

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置最小高度
mInput.setMinW(100);

#setGravity(gravity)

设置重力

参数 : gravity {String} 重力

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置重力
mInput.setGravity("end|center");

#setBg(color)

设置背景颜色

参数 : color {String} 背景颜色

版本 : 1.9.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置背景颜色
mInput.setBg("#3574F0");


---
