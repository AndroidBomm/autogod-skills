//显示图片
showImg("./example/$qr - 二维码工具/imgs/t01.png");
//解析这个二维码内容
let content = $qr.parse("./example/$qr - 二维码工具/imgs/t01.png");
//显示内容
alert("二维码内容",content);