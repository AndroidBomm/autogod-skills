
let url = "https://pics0.baidu.com/feed/f11f3a292df5e0feee2783e88baf3fa75fdf727e.jpeg?token=4afc91463326e4f4a44e2cde691a54a0";
let path = "/sdcard/美女.png";

//异步下载
$http.download(url,path,(cur,total,percent)=>{
    log("下载进度",percent);
},()=>{
    log("下载完毕，正在显示美女图片...");
    showImg(path);
},(res)=>{
    log("下载失败",res);
});