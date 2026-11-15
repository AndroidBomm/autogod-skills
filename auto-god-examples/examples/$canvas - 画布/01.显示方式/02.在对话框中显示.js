//AIGame官方示例

//创建画布对象
let canvas = $canvas.create(500,500);

//创建画笔
let paint = $canvas.paint();
paint.setColor($color.RED); //红色

//绘制红色方框
canvas.drawRect(30,30,400,400,paint);

//转换成Image对象后显示(AIGame的内置对象:$img的操作对象)
canvas.show();

//或者使用 canvas.toImg().show();    来显示图片
//或者使用 $img.show(canvas.toImg());来显示图片





//示例结束