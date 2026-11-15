//AIGame官方示例

//创建画布对象(加载图片对象)
let canvas = $canvas.create("example/$canvas - 画布/02.拟定合同/合同.jpg");

//创建黑色彩笔
let paint = $canvas.paint("#000000");
paint.setTextSize(25);

//绘制颜色
canvas.drawText("张三丰",170,145,paint);
canvas.drawText("420321200006524388",480,145,paint);
canvas.drawText("13564962035",900,145,paint);
canvas.drawText("翻斗花园2号街A501",170,195,paint);

//显示图片
canvas.show();
//保存图片
canvas.save("/sdcard/新合同.jpg");


//示例结束