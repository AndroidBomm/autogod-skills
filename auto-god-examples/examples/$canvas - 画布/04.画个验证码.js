//AIGame官方示例

//创建画布对象
let size = 20;
let canvas = $canvas.create(100,size+10);

//生成6位验证码
let vcode = random(10)+""+random(10)+random(10)+random(10)+random(10)+random(10);

//创建画笔
let txtPaint = $canvas.paint("#000000");
txtPaint.setTextSize(size);

//绘制文字
canvas.drawText(vcode,0,size,txtPaint);

//布局显示画布
canvas.show();




//示例结束