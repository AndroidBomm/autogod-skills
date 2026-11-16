## 下拉框


#下拉框 

更新时间:2026-06-15 07:53:03

下拉框-drop

布局原生类型:{com.google.android.material.textfield.TextInputLayout}
组件原生类型:{com.google.android.material.textfield.MaterialAutoCompleteTextView}

  
  

下拉框类似于一个小菜单，点一下才会展开让你选，核心用途就是帮你方便、规范地挑东西。

#一、基础用法

<ui>
    <statusbar />
    <linear w="max" padding="15" gravity="center" h="max">
        <drop id="mDrop" w="max">
            <!-- 添加选项 -->
            <item text="吃饭" />
            <item text="睡觉" />
            <item text="电影" />
        </drop>
    </linear>
</ui>

//解析布局
let ui = $ui.layout("ui.xml");
ui.show();//显示界面
//为下拉框添加选中事件
ui.id("mDrop").onCheck((value, index) => {
    info("选中下标为:" + index + "的元素:" + value);
});

#二、常用属性

#item - 子选项

设置子选项

子选项使用item标签，只有text一个属性

<ui>
    <statusbar />
    <drop w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#style - 样式

设置样式

可选:fill,outline

<ui>
    <statusbar />
    <drop style="outline" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <drop style="outline" color="#F44236" def="睡觉" hint="你的爱好" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#hint - 提示文字

设置提示文字

<ui>
    <statusbar />
    <drop style="outline" hint="你的爱好" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#hintColor - 提示颜色

设置提示颜色

<ui>
    <statusbar />
    <drop style="outline" hint="你的爱好" hintColor="#C94F4F" text="吃饭" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#def - 默认文字

设置默认文字

<ui>
    <statusbar />
    <drop style="outline" def="睡觉" hint="你的爱好" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#text - 文本

设置文本

<ui>
    <statusbar />
    <drop style="outline" hint="你的爱好" text="睡觉" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#textColor - 文字的颜色

设置文字的颜色

<ui>
    <statusbar />
    <drop style="outline" def="睡觉" hint="你的爱好" textColor="#F44236" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#textSize - 文本尺寸

设置文本尺寸

单位:dp

<ui>
    <statusbar />
    <drop style="outline" def="睡觉" textSize="18" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
    <drop style="outline" def="睡觉" textSize="25" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#prefix - 前缀

设置前缀

<ui>
    <statusbar />
    <drop prefix="邮箱：" text="123456789@qq.com" textSize="18" w="max">
        <item text="123456789@qq.com" />
        <item text="222333555@qq.com" />
    </drop>
</ui>

#prefixColor - 前缀颜色

设置前缀颜色

<ui>
    <statusbar />
    <drop prefix="邮箱：" prefixColor="#C94F4F" text="123456789@qq.com" textSize="18"
        w="max">
        <item text="123456789@qq.com" />
        <item text="222333555@qq.com" />
    </drop>
</ui>

#suffix - 后缀

设置后缀

<ui>
    <statusbar />
    <drop prefix="邮箱：" suffix="@qq.com" text="123456789" textSize="18" w="max">
        <item text="123456789" />
        <item text="222333555" />
    </drop>
</ui>

#suffixColor - 后缀颜色

设置后缀颜色

<ui>
    <statusbar />
    <drop prefix="邮箱：" suffix="@qq.com" suffixColor="#C94F4F" text="123456789"
        textSize="18" w="max">
        <item text="123456789" />
        <item text="222333555" />
    </drop>
</ui>

#hideIcon - 是否隐藏后面的倒三角图标

是否隐藏后面的倒三角图标

<ui>
    <statusbar />
    <drop style="outline" hideIcon="true" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#gravity - 布局重力

设置布局重力

<ui>
    <statusbar />
    <drop style="outline" def="吃饭" gravity="start" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
    <drop style="outline" def="吃饭" gravity="center" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
    <drop style="outline" def="吃饭" gravity="end" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#padding - 布局内边距

设置布局内边距

单位:dp

<ui>
    <statusbar />
    <drop style="outline" def="吃饭" padding="10" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
    <drop style="outline" def="吃饭" padding="20" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <drop style="outline" def="吃饭" bg="#57965C" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <drop style="outline" bgImg="example/$ui - 交互界面/05.drop-下拉框/img/img.png" def="吃饭" w="max">
        <item text="吃饭" />
        <item text="睡觉" />
    </drop>
</ui>

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储字符串的关键字，获取值时可以直接通过$storage($存储)获取字符串。

注意：不同的控件存储的类型不同，对于本控件(输入框)则存储的是字符串类型，表达当前选中的内容

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyDrop"); -->
<ui store="MyDrop">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyDrop").getStr("text"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MyDrop").getStr("text","吃饭"); -->
    <drop storeKey="text" storeDef="吃饭">
        <item text="吃饭"/>
        <item text="睡觉"/>
        <item text="游戏"/>
    </drop>
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyDrop");//名称要一致
//获取数据
let data = storage.getStr("文本","吃饭");//数据类型是字符串

#三、常用函数

#onCheck(callback)

事件监听

参数 : callback {(title,index)=>{}} 回调

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//监听选中事件
drop.onCheck((title,index)=>{
    toast(title);
});

#setText(text)

设置文字

参数 : text {string} 文字

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//设置文字
drop.setText("选项1");

#getText()

获得文字

返回 : {string} 文字

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//获取文本
let text = drop.getText();

#flush(items)

设置数据

参数 : items {string[]} 数据

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//设置数据
drop.flush(["张三","李四","王五"]);

#getIndex()

获取选中下标

返回 : 下标 {int} 用户当前选中的下标(-1表示没有选中)

版本 : 1.9.6

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//设置数据
drop.flush(["张三","李四","王五"]);
//获取用户当前选中的下标(-1表示没有选中)
let index = drop.getIndex();

#setIndex(index)

设置下标

参数 : index {int} 需要设置的下标

版本 : 1.9.6

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let drop = ui.id("mDrop");
//设置数据
drop.flush(["张三","李四","王五"]);
//设置下表 1 表示设置第二个元素
drop.setIndex(1);


---
