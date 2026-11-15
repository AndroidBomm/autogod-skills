//AIGame官方示例

let ui= $ui.layout(`
<ui>
    <statusbar/>
    <appbar back="true" id="mAppbar" title="我的表格" w="max"/>
    <img id="mImg" w="max" h="max" gravity="center|top" padding="10"/>
</ui>
`);
ui.show();
ui.id("mAppbar").back(()=>{
    ui.finish();
});

let aw = 750; //合同宽度
let ah = 750; //合同高度
let th01_h = 45; //第1行表格线条高度("姓名之类的")
let th02_h = 45; //第2行表格线条高度("调查地址")
let th03_h = 300; //第3行表格线条高度("立案事由")
let th04_h = 60; //第4行表格线条高度("联系微信啥的")

//创建画布对象
let canvas = $canvas.create(aw,ah);

//绘制表格
let tabs = [
    1,1,aw-2,1,//上边框
    1,1,1,ah-2,//左边框
    1,ah-2,aw-2,ah-2,//下边框
    aw-2,1,aw-2,ah-2,//右边框
    //第1行表格线条高度(横线)
    1,1+th01_h,aw-2,1+th01_h,
    //第1行表格线条高度(竖线)
    70,1,70,1+th01_h,
    150,1,150,1+th01_h,
    270,1,270,1+th01_h,
    500,1,500,1+th01_h,
    570,1,570,1+th01_h,
    //第2行表格线条高度(横线)
    1,1+th01_h+th02_h,aw-2,1+th01_h+th02_h,
    100,1+th01_h,100,1+th01_h+th02_h,
    //第3行表格线条高度(横线)
    1,1+th01_h+th02_h+th03_h,aw-2,1+th01_h+th02_h+th03_h,
    100,1+th01_h+th02_h,100,1+th01_h+th02_h+th03_h,
    //第4行表格线条高度(横线)
    1,1+th01_h+th02_h+th03_h+th04_h,aw-2,1+th01_h+th02_h+th03_h+th04_h,
];
canvas.drawLines(tabs ,$canvas.paint("#000000"));
//绘制文字
let txtPaint = $canvas.paint("#000000");
txtPaint.setTextSize(20);
canvas.drawText("姓名",10,30,txtPaint);
canvas.drawText("身份证号",10+150,30,txtPaint);
canvas.drawText("号码",10+500,30,txtPaint);
canvas.drawText("调查地址",10,30+th01_h,txtPaint);
canvas.drawText("立案事由",10,30+th01_h+(th02_h+th03_h)/2,txtPaint);
let lxPaint = $canvas.paint($color.RED);
lxPaint.setTextSize(26);
canvas.drawText("1小时内联系:132584946(微信同号)偿还欠款可办理撤案",15,45+th01_h+th02_h+th03_h,lxPaint);


//布局显示画布
ui.id("mImg").setImg(canvas.getBitmap());





//示例结束