## 案例-动态组件


#案例-动态组件 

更新时间:2026-06-15 07:53:04

  
  

本案例将演示如何动态添加和移除布局组件。

#Xml代码

位于 /项目/main.xml

<ui>
    <statusbar/>
    <coord w="max" h="max">
        <appbar-layout w="max">
            <appbar w="max" id="mAppbar" back="true" title="我的应用">
                <item icon="ic_article_outline" text="日志"/>
                <item icon="ic_picture_in_picture_outline" text="日志悬浮窗"/>
            </appbar>
        </appbar-layout>
        <linear behavior="appbar" dir="h" w="max" h="max" gravity="start">
            <rail id="rail" weight="0.1">
                <menu icon="ic_home_fill" text="主页"/>
                <menu icon="ic_dehaze_outline" text="菜单"/>
                <menu icon="ic_settings_fill" text="设置"/>
            </rail>
            <!--布局主体-->
            <linear id="layout" gravity="center|top" weight="0.9" h="max">
            </linear>
        </linear>
    </coord>
</ui>

#Xml代码 - 主页

位于 /项目/主页.xml

<ui>
    <linear id="layout" gravity="center|top" h="max" w="max">
        <card w="max" margin="15">
            <linear dir="v" w="max" gravity="center|top">
                <img url="https://q1.qlogo.cn/g?b=qq&nk=3502037911&s=100" w="100" h="100"/>
                <text text="他连得" size="20"/>
            </linear>
        </card>
    </linear>
</ui>

#Xml代码 - 菜单

位于 /项目/菜单.xml

<ui>
    <linear id="layout" gravity="center|top" h="max" w="max">
        <!--设置选项-->
        <text gravity="center" h="50" selectable="true" text="设置选项 item标签" />
        <drop w="max">
            <item text="吃饭" />
            <item text="睡觉" />
        </drop>
        <!--设置风格-->
        <text gravity="center" h="50" selectable="true" text="设置风格 style=outline" />
        <drop style="outline" w="max">
            <item text="吃饭" />
            <item text="睡觉" />
        </drop>
        <!--设置主题颜色-->
        <text gravity="center" h="50" selectable="true" text="设置主题颜色 color=颜色" />
        <drop style="outline" color="#F44236" def="睡觉" hint="你的爱好" w="max">
            <item text="吃饭" />
            <item text="睡觉" />
        </drop>
    </linear>
</ui>

#Xml代码 - 设置

位于 /项目/设置.xml

<ui>
    <linear id="layout" gravity="center|top" h="max" w="max">
        <button style="outline" text="斜体文本" typeface="italic" w="max" />
        <button style="outline" text="粗体文本" typeface="bold" w="max" />
        <button style="outline" text="粗体斜体文本" typeface="bold_italic" w="max" />
        <check check="true" color="#518855" text="吃饭" />
        <check check="true" color="#C94F4F" text="睡觉" />
        <check check="true" color="#3471E9" text="游戏" />
        <chip text="看我尺寸" textSize="10" />
        <chip text="看我尺寸" textSize="15" />
        <chip text="看我尺寸" textSize="18" />
    </linear>
</ui>

#JS代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
mAppbar.back(() => {
    ui.finish();
});
//XView当中的XLayout类型
let layout = ui.id("layout");
let rail = ui.id("rail");
//解析三个布局(UI)
let mainUi = $ui.layout("主页.xml");
let menuUi = $ui.layout("菜单.xml");
let setUi = $ui.layout("设置.xml");
//先默认显示主页
layout.addView(mainUi.getView());//主页
//动态添加和移除组件(不推荐)
rail.menu((str) => {
    if (str === "主页") {
        layout.addView(mainUi.getView());//主页
        layout.removeView(menuUi.getView());//菜单
        layout.removeView(setUi.getView());//设置
    }
    if (str === "菜单") {
        layout.addView(menuUi.getView());//菜单
        layout.removeView(mainUi.getView());//主页
        layout.removeView(setUi.getView());//设置
    }
    if (str === "设置") {
        layout.addView(setUi.getView());//设置
        layout.removeView(mainUi.getView());//主页
        layout.removeView(menuUi.getView());//菜单
    }
});
//显示界面(为了保证不出错)
ui.show();


---
