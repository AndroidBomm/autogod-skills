let path = "/sdcard/qr.png";
if ($file.exists(path)) {
    //显示图片
    showImg(path);
    //解析这个二维码内容
    let content = $qr.parse(path);
    //显示内容
    alert("二维码内容",content);
}else{
    alert("本地图片","图片不存在:\n"+path);
}