//生成二维码
let img = $qr.make("欢迎来到AIGame!");

//显示图片
img.show();//或者调用 showImg(img); 全局函数也可也显示图片

//保存到本地
img.save("/sdcard/qr.png");