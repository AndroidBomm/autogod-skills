## example-download-image - 下载图片

# 案例-下载图片

更新时间:2026-06-22 19:00:00

带进度条的图片下载示例，实时显示下载进度。

## 核心代码

```xml
<!-- 下载图片界面布局 -->
<linear dir="v" gravity="center" w="300" h="wrap" padding="20">
  <img id="mImg" w="200" h="200" />
  <progress id="mProgress" margin_top="10" />
  <button id="mBtn" text="下载" margin_top="10" />
</linear>
```

## JavaScript 交互

```javascript
// 加载下载界面布局
let ui = $ui.layout("download_img.xml");
let img = ui.id("mImg");
let progress = ui.id("mProgress");
let btn = ui.id("mBtn");

// 下载按钮点击事件
btn.click(() => {
    $http.get("https://example.com/image.png", 
        // 下载完成回调
        (resp) => {
            img.setSrc(resp.body.bytes());
            toast("下载完成");
        },
        // 下载错误回调
        (err) => {
            toast("下载失败: " + err);
        },
        // 下载配置（含进度回调）
        {
            progress: (curr, total) => {
                progress.setProgress(Math.floor(curr / total * 100));
            }
        }
    );
});
```


---
