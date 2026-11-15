//读取要处理的图片
let img = $img.read("example/$img - 图片处理/img/t01.png");
//二值化操作
let resultImg = $img.threshold(img,100);
//显示二值化结果图片
resultImg.show();