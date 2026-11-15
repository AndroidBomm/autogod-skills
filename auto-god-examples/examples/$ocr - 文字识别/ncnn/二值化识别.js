//二值化识别:截屏某个区域识别
//识别前会将图片进行二值化处理:会把主要的颜色保留成白色,其余的都是黑色
$screen.getPermit();

//指定ocr引擎为ncnn
$ocr.v("ncnn");

//ncnn识别引擎需要初始化,但是mlkit不用
$ocr.init();

//显示出图片
showImg("./example/$ocr - 文字识别/imgs/t02.png");

//根据屏幕大小计算出大致的范围(如果你的手机识别失败,请手动修改)
let si = $screen.getScreenInfo();
let re = [0,si.h/3,si.w ,si.h/3];

//绘制出大概的识别范围
$draw.rect(re[0],re[1],re[2],re[3]);

sleep(1000); //延迟1秒(免得图片还没显示,就开始识别了)

//开始识别
let result = $ocr.detect({
    region: [re[0],re[1],re[2],re[3]],
    gray: false,//关闭灰度化识别
    color: "#356EFF",//(必须)设置主要颜色(蓝色)
    threshold: 30,//(必须)二值化阈值
    save: true,//(可选)开启保存图片
    savePath: "/sdcard/ocr-thre.png",//(可选)保存位置
});


alert("识别结果",result);

if ($file.exists("/sdcard/ocr-thre.png")) {
    showImg("/sdcard/ocr-thre.png"); //显示二值化后的图片
}

$draw.closeAll(); //关闭全局绘制
//..