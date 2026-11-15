//AIGame官方示例

let ui= $ui.layout(`
<ui>
    <statusbar/>
    <appbar back="true" id="mAppbar" title="显示画布图片" w="max"/>
    <img id="mImg" w="max" h="max" gravity="center|top" padding="10"/>
</ui>
`);
ui.show();
ui.id("mAppbar").back(()=>{
    ui.finish();
});

//创建画布对象
let canvas = $canvas.create(500,500);
//创建画笔
let paint = $canvas.paint();
paint.setColor($color.RED);//红色
//绘制红色方框
canvas.drawRect(30,30,400,400,paint);
//布局显示画布中的图片
ui.id("mImg").setImg(canvas.getBitmap());



//示例结束