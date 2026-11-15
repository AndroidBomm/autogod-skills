//生成二维码
let img = $qr.make("Hello AIGame !", {
    w: 500,//宽度(默认:500)
    h: 500,//高度(默认:500)
    margin: 2,//边距(默认:2)
    foreColor: "#2AACB8",//前景色(默认:#000000)
    bgColor: "#2B2D30",//背景色(默认:#FFFFFF)
});

if (img != null) {
    //显示图片
    img.show(); //或者调用 showImg(img); 全局函数也可也显示图片

    //保存到本地
    img.save("/sdcard/qr.png");
}





//..