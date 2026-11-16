## 进度条


#进度条 

更新时间:2026-06-15 07:53:04

进度条-progress

圆形原生类型:{com.google.android.material.progressindicator.CircularProgressIndicator}
线性原生类型:{com.google.android.material.progressindicator.LinearProgressIndicator}

  
  

进度条：比如下载进度，游戏进度，进度条就是用来显示进度的控件

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <linear w="max" dir="h">
            <progress w="max" padding="10" run="true" />
            <progress w="max" color="#518855" padding="10" run="true" />
            <progress w="max" color="#B44A4A" padding="10" run="true" />
        </linear>
        <progress w="max" style="line" run="true" padding="10" />
        <progress w="max" style="line" color="#518855" padding="10" run="true" />
        <progress w="max" style="line" color="#B44A4A" padding="10" run="true" />
    </linear>
</ui>

#一、基础用法

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 指定进度条的id -->
        <progress id="circularProgress" w="max"/>
        <progress id="lineProgress" w="max" style="line"/>
    </linear>
</ui>

//解析布局
let ui = $ui.layout("ui.xml");
ui.show();//显示界面
//获取圆形/线性进度条
let cp = ui.id("circularProgress");
let lp = ui.id("lineProgress");
//动态模拟进度条的走动
for (let i = 1; i <= 10; i++) {
    sleep(150);
    //[核心]:设置进度
    cp.setProgress(i * 10);
    lp.setProgress(i * 10);
}

#二、常用属性

#visible - 可见性

设置可见性

<progress visible="false" />

#style - 样式

设置样式

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 默认样式 -->
        <progress w="max" />
        <!-- 直线样式 -->
        <progress w="max" style="line" />
    </linear>
</ui>

#thickness - 厚度

设置厚度

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 设置厚度 thickness="10" -->
        <progress w="max" thickness="10" />
        <progress w="max" style="line" thickness="10" />
    </linear>
</ui>

#run - 动画

设置动画

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 默认样式 -->
        <progress w="max" run="true"/>
        <!-- 直线样式 -->
        <progress w="max" style="line" run="true"/>
    </linear>
</ui>

#color - 颜色

设置颜色

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 设置颜色 color="#518855" -->
        <progress w="max" color="#518855" />
        <progress w="max" style="line" color="#B44A4A" />
    </linear>
</ui>

#padding - 内边距

设置内边距

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 设置内边距 padding="20" -->
        <progress padding="20" />
        <progress style="line" padding="35" />
    </linear>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 设置背景颜色 -->
        <progress w="max" padding="10" bg="#518855"/>
        <progress w="max" style="line" bg="#B44A4A" padding="10" />
    </linear>
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <linear w="max" padding="10">
        <!-- 设置背景图片 bgImg="/res/bg_pg.png" -->
        <progress w="max" padding="10" bgImg="/res/bg_pg.png" />
        <!-- 设置背景图片 bgImg="/res/bg_pgLine.png" -->
        <progress w="max" style="line" padding="10" bgImg="/res/bg_pgLine.png" />
    </linear>
</ui>

#storeKey - 应用内存储

应用内存储

通过storeKey(存储关键字)指定一个存储整数的关键字，获取值时可以直接通过$storage($存储)获取进度值。

注意：不同的控件存储的类型不同，对于本控件(进度条)则存储的是整数类型，表达当前进度值

<!-- 你必须在ui(界面)节点中通过store(存储)指定$storage($存储)的命名空间，等价于使用代码：let storage = $storage.create("MyAppProgress"); -->
<ui store="MyAppProgress">
    <statusbar />
    <!-- 使用storeKey(存储关键字)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppProgress").getInt("progress"); -->
    <!-- 使用storeDef(存储默认值)属性，指定关键字，等价于使用代码：let data = $storage.create("MyAppProgress").getInt("progress",50); -->
    <progress storeKey="progress" storeDef="50" />
</ui>

如果我们已经配置好了应用内存储，则可以直接获取数据：

注意：一、要使用应用内存储，必须在ui(界面)节点指定属性store(存储)的值，该值指定存储的命名空间；
二、不是所有的控件都支持应用内存储；
三、不同的控件存储的数据类型可能都不一致，例如：输入类型的控件存储的是字符串类型，开关、多选框存储的就是布尔类型的数据。

//创建(或者加载)存储对象
let storage = $storage.create("MyAppProgress");//名称要一致
//获取数据
let data = storage.getInt("progress",50);//数据类型是整数

#三、常用函数

#setProgress(curVal)

设置进度

此方法需要安卓7.0以上生效

参数 : curVal {int} 进度值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let progress = ui.id("mProgress");
//设置进度
progress.setProgress(50);

#setMax(max)

设置最大进度

参数 : max {int} 最大值

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let progress = ui.id("mProgress");
//设置最大进度
progress.setMax(100);

#getProgress()

获得进度

返回 : {int} 进度

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let progress = ui.id("mProgress");
//获得进度
let p = progress.getProgress();

#show()

显示进度条

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let progress = ui.id("mProgress");
//显示进度条
progress.show();

#hide()

隐藏进度条

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let progress = ui.id("mProgress");
//隐藏进度条
progress.hide();


---
