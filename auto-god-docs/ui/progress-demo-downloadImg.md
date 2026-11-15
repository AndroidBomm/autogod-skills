## 案例-下载图片


#案例-下载图片 

更新时间:2026-06-15 07:53:04

进度条下载案例，当点击按钮的时候，我将异步下载一个图片，并且显示进度到进度条上。

#Xml代码

<ui>
    <statusbar/>
    <coord w="max" h="max">
        <appbar-layout w="max">
            <appbar w="max" id="mAppbar" back="true" title="我的应用">
                <item icon="ic_article_outline" text="日志"/>
                <item icon="ic_picture_in_picture_outline" text="日志悬浮窗"/>
            </appbar>
        </appbar-layout>
        <linear behavior="appbar" w="max" h="max" gravity="center">
            <progress id="mPg" style="line" padding="10"/>
            <button id="mBut" text="开始下载"/>
        </linear>
    </coord>
</ui>

#Js代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
mAppbar.back(() => {
    ui.finish();
});
//显示界面
ui.show();
let mPg = ui.id("mPg");
let mBut = ui.id("mBut");
mPg.hide();//隐藏
mBut.click(() => {
    //当点击的时候 就显示进度条 并且下载文件
    mPg.show();
    //开始下载文件
    let url = "https://pics0.baidu.com/feed/f11f3a292df5e0feee2783e88baf3fa75fdf727e.jpeg?token=4afc91463326e4f4a44e2cde691a54a0";
    let path = "/sdcard/美女.png";
    //异步下载
    $http.download(url, path, (cur, total, percent) => {
        log("下载进度", cur, total, percent);
        mPg.setMax(total);
        mPg.setProgress(cur);
    }, () => {
        log("下载完毕，正在显示美女图片...");
        // showImg(path);
    }, (res) => {
        log("下载失败", res);
    });
});


---
