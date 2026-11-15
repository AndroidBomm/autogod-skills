//指定ocr引擎为mlkit
$ocr.v("mlkit");

//开始识别本地图片
let res = $ocr.detectPath("./example/$ocr - 文字识别/imgs/t01.png");

alert("识别结果",res);

//注意:mlkit无法计算出相似度,所以similar固定为0.85