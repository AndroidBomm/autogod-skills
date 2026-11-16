## 案例-日志框架


#案例-日志框架 

更新时间:2026-06-15 07:53:04

一个简单的日志框架综合案例

#Xml代码

<ui>
    <statusbar/>
    <coord w="max" h="max">
        <appbar-layout w="max">
            <appbar w="max" id="mAppbar" back="true" title="我的应用">
                <item icon="ic_article_outline" text="日志"/>
                <item icon="ic_picture_in_picture_outline" text="日志悬浮窗"/>
            </appbar>
        </appbar-layout >
        <log behavior="appbar" id="log" w="max" h="max"/>
        <fab behavior="fab" id="fab" icon="ic_delete_outline_fill" iconTint="red" layoutGravity="bottom|end" margin="30"/>
    </coord>
</ui>

#Js代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
mAppbar.back(()=>{
   ui.finish();
});
mAppbar.menu((txt)=>{
    if (txt==="日志"){
        //显示日志主界面
        $log.activity();
    }
    if (txt==="日志悬浮窗"){
        //显示日志悬浮窗
        $log.floaty();
    }
});
//悬浮按钮
let fab = ui.id("fab");
fab.click(() => {
    //删除日志缓存
    $log.delete();
});
//显示界面
ui.show();


---
