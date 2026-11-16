## example-video-player - 简易播放器

# 案例-简易播放器

更新时间:2026-06-22 19:00:00

使用 Video 组件实现简易视频播放器，支持播放/暂停控制和进度显示。

## 核心代码

```xml
<!-- 播放器界面布局 -->
<linear dir="v" w="max" h="max">
  <video id="mVideo" src="res/video.mp4" w="max" h="max" />
  <linear dir="h" w="max" h="wrap" bg="#333">
    <button id="mPlay" text="播放" />
    <seek id="mSeek" w="max" h="wrap" />
  </linear>
</linear>
```

## JavaScript 交互

```javascript
// 加载播放器布局
let ui = $ui.layout("video_player.xml");
let video = ui.id("mVideo");
let playBtn = ui.id("mPlay");
let seek = ui.id("mSeek");

// 播放按钮点击事件
playBtn.click(() => {
    video.play();
});

// 进度条拖动事件
seek.change((value) => {
    video.seekTo(value);
});
```


---
