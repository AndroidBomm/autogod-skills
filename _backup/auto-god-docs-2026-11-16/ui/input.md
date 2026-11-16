## 输入框


#输入框 

更新时间:2026-06-15 07:53:04

输入框-input

组件原生类型:{com.google.android.material.textfield.TextInputEditText}

布局原生类型:{com.google.android.material.textfield.TextInputLayout}

  
  

输入框：一个可以输入文字的地方。

#一、基础用法

简单写一个登录的小案例，当点击登录按钮的时候就获取用户输入的信息，当点击取消按钮的时候就清空用户输入的内容：

<ui>
    <statusbar />
    <linear w="max" dir="v" gravity="center" h="max" padding="20">
        <input id="count" prefix="账号:" w="max" />
        <input id="pass" prefix="密码:" type="pass" w="max"  />
        <button-group dir="h" w="max">
            <button id="login" text="登录" style="outline" weight="1"/>
            <button id="cancel" text="取消" style="outline" weight="1" textColor="#B44A4A" />
        </button-group>
    </linear>
</ui>

let ui = $ui.layout("ui.xml");
ui.show();
//[登录]获取用户输入的信息
ui.id("login").click(() => {
    let count = ui.id("count").getText();
    let pass = ui.id("pass").getText();
    alert("账号信息", "账号：" + count + "\n" + "密码：" + pass);
});
//[取消]清空用户输入的内容
ui.id("cancel").click(() => {
    ui.id("count").setText("");
    ui.id("pass").setText("");
    toast("已清空");
});

#二、常用属性

#style - 样式

设置样式

可选:fill,outline

<ui>
    <statusbar />
    <linear dir="v" gravity="center" w="max">
        <input style="outline" text="轮廓样式" w="max" />
        <input style="fill" text="填充样式" w="max" />
    </linear>
</ui>

#hint - 提示文本

提示文本

<ui>
    <statusbar />
    <input hint="请输入" w="max" />
</ui>

#text - 文本

设置文本

<ui>
    <statusbar />
    <input text="我是文本" w="max" />
</ui>

#def - 文本

设置文本

<ui>
    <statusbar />
    <input def="我是文本" w="max" />
</ui>

#textColor - 文本颜色

设置文本颜色

<ui>
    <statusbar />
    <input text="我是文本" textColor="#57965C" w="max" />
</ui>

#textSize - 文本尺寸

设置文本尺寸

<ui>
    <statusbar />
    <linear dir="v" gravity="center" w="max">
        <input text="尺寸:10" textSize="10" w="max" />
        <input text="尺寸:20" textSize="20" w="max" />
    </linear>
</ui>

#len - 字数限制

设置字数限制

<ui>
    <statusbar />
    <input len="10" text="123" w="max" />
</ui>

#maxLines - 最大行数

最大行数

<ui>
    <statusbar />
    <input maxLines="5" w="max" />
</ui>

#minLines - 最少行数

最少行数

<ui>
    <statusbar />
    <input minLines="3" w="max" />
</ui>

#singleLine - 单行模式

单行模式

<ui>
    <statusbar />
    <text gravity="center" h="50" selectable="true" text="设置单行模式 singleLine=true" />
    <input singleLine="true" w="max" />
</ui>

#help - 帮助文字

帮助文字

<ui>
    <statusbar />
    <input help="请输入名称" w="max" />
</ui>

#prefix - 前缀

设置前缀

<ui>
    <statusbar />
    <input prefix="邮箱:" w="max" />
</ui>

#prefixColor - 前缀

设置前缀

<ui>
    <statusbar />
    <input prefix="邮箱:" prefixColor="#C94F4F" w="max" />
</ui>

#suffix - 后缀

设置后缀

<ui>
    <statusbar />
    <input suffix="@qq.com" w="max" />
</ui>

#suffixColor - 后缀颜色

设置后缀颜色

<ui>
    <statusbar />
    <input suffix="@qq.com" suffixColor="#C94F4F" w="max" />
</ui>

#type - 输入类型

设置输入类型

可选:pass,number,phone

<ui>
    <statusbar />
    <linear dir="v" gravity="center" w="max">
        <!--密码-->
        <input text="abcdefg" type="pass" w="max" />
        <!--数字-->
        <input text="3.1415926" type="num" w="max" />
        <!--号码-->
        <input text="123593749723" type="phone" w="max" />
    </linear>
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <input color="#C94F4F" text="主题颜色:红色" w="max" />
</ui>

#strokeColor - 边框颜色

设置边框颜色

<ui>
    <statusbar />
    <input strokeColor="#C94F4F" text="边框颜色:红色" w="max" />
</ui>

#strokeWidth - 边框宽度

设置边框宽度

<ui>
    <statusbar />
    <input strokeWidth="10" text="边框加厚" w="max" />
</ui>

#radius - 弧度

设置弧度

<ui>
    <statusbar />
    <input radius="25" text="设置四角弧度" w="max" />
    <input radius="5,20" text="设置同角弧度" w="max" />
    <input radius="30,10,10,30" text="定制对角度弧度" w="max" />
</ui>

#padding - 布局内边距

设置布局内边距

<ui>
    <statusbar />
    <input padding="15" text="内边距:15" w="max" />
    <input padding="25" text="内边距:25" w="max" />
</ui>

#gravity - 布局重力

布局重力

<ui>
    <statusbar />
    <input gravity="start" text="开始" w="max" />
    <input gravity="end" text="结束" w="max" />
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <input bg="#57965C" text="看我背景" w="max" />
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <input bgImg="example/$ui - 交互界面/10.input-输入框/img/img.png" text="看我背景"
        w="max" />
</ui>

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储字符串的关键字，获取值时可以直接通过$storage($存储)获取字符串。

注意：不同的控件存储的类型不同，对于本控件(输入框)则存储的是字符串类型，表达当前输入的内容

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyAppInput"); -->
<ui store="MyAppInput">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppInput").getStr("eatFoodStr"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppInput").getStr("eatFoodStr","我爱吃饭"); -->
    <input storeKey="eatFoodStr" storeDef="我爱吃饭" text="吃饭" />
    <input storeKey="playGameStr" storeDef="我爱游戏" text="游戏" />
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyAppInput");//名称要一致
//获取数据
let data = storage.getStr("我爱吃饭","未必");//数据类型是字符串

#三、常用函数

#setSingleLine(single)

设置单行模式

参数 : single {Boolean} 单行模式

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置单行模式
mInput.setSingleLine(true);

#setHint(hint)

设置预提示

参数 : hint {string} 预提示

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置预提示
mInput.setHint("请输入名字");

#setBgColor(color)

设置背景颜色

参数 : color {string} 颜色

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置背景颜色
mInput.setBgColor("#ff0000");//也可以是M3主题动态色，例如:colorPrimary

#setStrokeColor(color)

设置边框颜色

参数 : color {string} 颜色

版本 : 1.5.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置边框颜色
mInput.setStrokeColor("#ff0000");//也可以是M3主题动态色，例如:colorPrimary

#setStrokeWidth(strokeWidth)

设置边框宽度

参数 : strokeWidth {int} 宽度

版本 : 1.5.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置边框宽度
mInput.setStrokeWidth(5);//单位:dp

#setRadius(topLeft, topRight, bottomLeft, bottomRight)

设置弧度

参数 : topLeft {float} 左上

参数 : topRight {float} 上右

参数 : bottomLeft {float} 左下

参数 : bottomRight {float} 右下

版本 : 1.5.3

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置边框弧度
mInput.setRadius(20,20,5,5);//单位:dp

#setText(text)

设置文字

参数 : text {string} 文字内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置文本
mInput.setText("我是文字");

#getText()

获取输入框内容

返回 : {string} 内容

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//获得文本
let text = mInput.getText();

#setError(msg)

设置异常信息提示

参数 : msg {string} 异常提示

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//设置异常提示
mInput.setError("错啦");

#getEditText()

获得TextInputEditText对象

返回 : {TextInputEditText} 编辑框对象

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//获得TextInputEditText对象
let editText = mInput.getEditText();

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

#onFocusChange(callback)

监听焦点改变

参数 : callback {(hasFocus)=>{}} 监听回调

版本 : 1.8.2

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mInput = ui.id("mInput");
//监听焦点改变
mInput.onFocusChange((hasFocus)=>{
    log("焦点改变了:"+hasFocus);
});


---
