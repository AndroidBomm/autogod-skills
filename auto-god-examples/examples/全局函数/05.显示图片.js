//官方示例

//【方式一】显示图片路径上的图片
showImg("example/全局函数/t01.png");

//【方式二】显示图片对象(Image)
let imgPath = "example/全局函数/t01.png";
let img = $img.read(imgPath);//获取(Image)图片对象
showImg(img);//显示图片对象(Image)



//示例结束