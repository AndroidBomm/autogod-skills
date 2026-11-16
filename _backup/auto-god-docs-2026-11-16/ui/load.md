## 加载


#加载 

更新时间:2026-06-15 07:53:04

加载器-load

  
  

加载器一般配合帧布局使用，显示在其他组件的上方。

#一、基础使用

需要手动的显示和隐藏，例如我下面的操作，点击按钮后：会显示正在加载中，完成加载任务后，手动隐藏这个控件。

<ui>
    <statusbar />
    <linear gravity="center" w="max">
        <!--
        最开始的时候先隐藏这个加载器
        当点击按钮的时候再显示这个加载器
        -->
        <load id="mLoad" show="false" />
        <!--点击按钮时显示加载器-->
        <button id="mButton" text="开始加载" />
    </linear>
</ui>

let ui = $ui.layout("main.xml");
//获取控件
let mLoad = ui.id("mLoad");
let mButton = ui.id("mButton");
//绑定点击事件
mButton.click(()=>{
    //显示加载器
    mLoad.show();
    //加载中
    sleep(3000);
    //加载完毕：隐藏加载器
    mLoad.hide();
    toast("加载完毕");
});

#二、常用属性

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <load color="#57965C" marginEnd="15" />
        <load color="#3574F0" marginEnd="15" />
        <load color="#C94F4F" />
    </linear>
</ui>

#colors - 主题颜色组

设置主题颜色组

<ui>
    <statusbar />
    <load colors="#57965C,#3574F0,#C94F4F,#FFC31F,#F501F5" />
</ui>

#size - 尺寸

设置尺寸

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <load marginEnd="15" size="20" />
        <load marginEnd="15" size="25" />
        <load size="30" />
    </linear>
</ui>

#show - 显示状态

设置显示状态

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <load color="#57965C" marginEnd="15" show="true" />
        <!--第二个加载器被隐藏了，所以实际上只能看到两个加载器-->
        <load color="#3574F0" marginEnd="15" show="false" />
        <load color="#C94F4F" />
    </linear>
    <text gravity="center" h="50" selectable="true"
        text="第二个(蓝色的)加载器被隐藏了，所以实际上只能看到两个加载器" />
</ui>

#三、常用函数

#setColor(color)

设置主题颜色

参数 : color {String} 主题颜色

//解析布局,获得ui对象
let ui = $ui.layout("./main.xml");
//获得控件
let mLoad = ui.id("mLoad");
//设置主题颜色
mLoad.setColor("#C94F4F");

#setSize(size)

设置尺寸

参数 : size {Number} 尺寸

//解析布局,获得ui对象
let ui = $ui.layout("./main.xml");
//获得控件
let mLoad = ui.id("mLoad");
//设置尺寸
mLoad.setSize(30);

#show()

显示加载器

//解析布局,获得ui对象
let ui = $ui.layout("./main.xml");
//获得控件
let mLoad = ui.id("mLoad");
//显示加载器
mLoad.show();

#hide()

隐藏加载器

//解析布局,获得ui对象
let ui = $ui.layout("./main.xml");
//获得控件
let mLoad = ui.id("mLoad");
//隐藏加载器
mLoad.hide();


---
