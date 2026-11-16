## 案例-简易播放器


#案例-简易播放器 

更新时间:2026-06-15 07:53:05

本示例将展示一个简单的播放器

#Xml代码

<ui>
    <statusbar/>
    <linear w="max" h="max" gravity="center">
        <!--视频:当使用约束布局的时候,视频可以被展开,但未必是全屏的
        path:可以指定相对路径,也可以指定绝对路径
        autoStart:当视频加载完成之后，会自动播放视频
        loop:是否循环播放视频
        -->
        <video autoStart="true" id="video" loop="true"
               path="video.mp4" w="max"/>
        <!--跳转到指定的视频位置进行播放-->
        <slider w="max" id="slide" />
        <!--
        播放/暂停
        ic_play_arrow_fill
        ic_pause_outline
        -->
        <button id="play" style="icon" icon="ic_pause_outline" />
    </linear>
</ui>

#JS代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
if (mAppbar != null) {
    mAppbar.back(() => {
        ui.finish();
    });
}
let video = ui.id("video");
let slide = ui.id("slide");
let play = ui.id("play");
//监听(人手滑动)
slide.onChange((val)=>{
    //video 跳转 不准确性
    video.seekTo(val);
});
play.click(() => {
    if (video.isPlaying()) {
        //暂停播放
        video.pause();
        play.setIcon("ic_play_arrow_fill");
    } else {
        //开始播放
        video.start();
        play.setIcon("ic_pause_outline");
    }
});
var intervalId = setInterval(()=>{
    if(video.isPlaying()){
        slide.setTo(video.getDur());//最大值 视频的总时长
        slide.setValue(video.getCur());//当前值 视频当前的进度
    }
},10);
ui.onDestroy((activity)=>{
    //释放循环器
    clearInterval(intervalId);
});
//最好放在最后显示主界面
ui.show();


---
