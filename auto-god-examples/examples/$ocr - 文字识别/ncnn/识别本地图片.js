//指定ocr引擎为ncnn
$ocr.v("ncnn");
//ncnn识别引擎需要初始化,但是mlkit不用
$ocr.init();

//开始识别本地图片
let res = $ocr.detectPath("./example/$ocr - 文字识别/imgs/t01.png");

alert("识别结果",res);