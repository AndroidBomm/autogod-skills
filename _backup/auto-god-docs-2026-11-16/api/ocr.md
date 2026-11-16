# $ocr - 文字识别

- 更新时间:2026-04-07 10:13:44

文字识别

文字识别是指通过计算机视觉技术，将图片中的文字提取出来，转换为程序可处理的文本格式。文字识别在很多场景下都有广泛的应用，比如文档扫描、图片识别、验证码识别等等。

目前本应用内涵盖三种识别引擎,分别是 PaddleOcr、PpOcrV5、GoogleMlkit。

### v(name)

设置要使用的OCR引擎

下面我简单介绍几个识别引擎的特点,ncnn速度最快,但是部分手机会出现识别混乱的现象;
mlkit是google提供的OCR引擎,速度较慢,但是识别准确率较高,并且兼容性比ncnn好很多;
ppv5是2025年比较流行的一款OCR识别方案,支持识别中英文以及特殊字符,精确度高,不过它是和ncnn同系列的产品;

- 参数 : name {string} 可选:ncnn,mlkit(默认),ppv5

- 版本 : 1.2.2

```javascript
//此函数要放在识别之前调用
$ocr.v("mlkit");//设置要使用的OCR引擎

```
### init()

初始化ocr

在使用OCR(文字识别)之前,需要加载文字模型,因此需要进行初始化,不过目前版本来看,初始化速度都很快,一般都在1秒左右

实际上mlkit是不需要初始化的,此外如果你忘记了初始化,在进行识别文字的时候,也会自动进行初始化

- 返回 : {DetectResult} 结果

- 版本 : 1.0.0

```javascript
$ocr.init();

```
### getPoint(word, options)

识别文字拿位置

识别后将把每行结果去除空格和换行符后,判断是否包含指定文字,如果包含则返回该文字识别出来的位置

该函数其实是对detect函数的封装,只是在识别到文字后,会判断文字关系是否包含指定文字,如果包含则返回该文字识别出来的位置

- 参数 : word {string} 文字

- 参数 : options {OcrOptions} 配置

- 返回 : {Point} 位置

- 版本 : 1.0.0

```javascript
//配置方式1:灰度化识别
let options = {
    region: [0,0,200,100], //(可选)识别范围(为空则识别整个屏幕)
    gray: true, //(必须)开启灰度化(默认:false),开启后会将图片转换为灰度图,识别速度会快很多,但是识别准确率会低一些
    save: true, //(可选)是否保存图片(默认:false),开启后会将识别到的图片保存到指定路径
    savePath: "/sdcard/ocr.png" //(可选)保存图片路径(为空则不保存图片),仅开启保存图片功能时有效
};
//配置方式2:二值化识别
let options = {
    region: [0,0,200,100], //(可选)识别范围(为空则识别整个屏幕)
    color: "#EEEEEE", //(必须)文字颜色(默认:#EEEEEE)
    threshold: 20, //(可选)二值化阈值(默认:20)推荐在20-50之间
    save: true, //(可选)是否保存图片(默认:false),开启后会将识别到的图片保存到指定路径
    savePath: "/sdcard/ocr.png" //保存图片路径(为空则不保存图片),仅开启保存图片功能时有效
};
//上面的配置自己根据自身需求选择一个即可
//返回opencv的Point对象
let point = $ocr.getPoint("文字", options);
if (point != null) {
    //直接点击opencv的Point对象
    $act.click(point);
}

```
### line(options)

识别单行文字

识别的方式有二值化和灰度化，自行配置即可，识别完成后会对识别的结果进行包装处理，提取出文字为单行字符串，并且去除不需要的空格和换行符。

当你开启提取数字的时候,该函数会把提取的数字按照','号进行分隔。

该函数是对detect函数的封装,只是在识别到文字后,会先去除空白字符之后拼接成一行;

- 参数 : options {OcrOptions} 配置

- 返回 : {String} 一行字符

- 版本 : 1.0.0

```javascript
let options = {
    region: [0,0,200,100], //(推荐)识别范围(为空则识别整个屏幕)
    number: true, //(可选)是否提取数字(用,号分割)
    //其他配置项目参考detect方法
};
let result = $ocr.line(options);

```
### line(img)

识别单行文字

识别单行文字并且提取去除空格符的字符串

注意：为了兼容其他函数复用资源，不会回收传入的位图/图片对象，需要你手动释放。

- 参数 : img {Image} 图片

- 返回 : {String} 文本

- 版本 : 1.9.7

```javascript
//设置版本
$ocr.v("nnn");
//获取图片对象
let img = $img.read("t01.png");
//识别位图、拿到文本
let txt = $ocr.line(img.getBitmap());
log(txt);
//释放资源
img.recycle();

```
### line(img)

识别单行文字

识别单行文字并且提取去除空格符的字符串

注意：为了兼容其他函数复用资源，不会回收传入的位图/图片对象，需要你手动释放。

- 参数 : img {Image} 图片

- 返回 : {String} 文本

- 版本 : 1.9.7

```javascript
//设置版本
$ocr.v("nnn");
//获取图片对象
let img = $img.read("t01.png");
//识别图片、拿到文本
let txt = $ocr.line(img);
log(txt);
//释放资源
img.recycle();

```
### line(img, x, y, w, h)

识别单行文字

识别单行文字并且提取去除空格符的字符串

注意：为了兼容其他函数复用资源，不会回收传入的位图/图片对象，需要你手动释放。

- 参数 : img {Image} 图片

- 参数 : x {int} 需要识别的区域起点x值

- 参数 : y {int} 需要识别的区域起点y值

- 参数 : w {int} 需要识别的区域宽度

- 参数 : h {int} 需要识别的区域高度

- 返回 : {String} 文本

- 版本 : 1.9.7

```javascript
//设置版本
$ocr.v("nnn");
//获取图片对象
let img = $img.read("t01.png");
//识别范围中的图片、拿到文本
let txt = $ocr.line(img,660,350,100,32);
log(txt);
//释放资源
img.recycle();

```
### detect(options)

识别文字

会自动截屏并且识别文字,支持灰度化识别,支持二值化(默认)识别

如果你是小白,那么请记住:二值化其实就是把图片转换为黑白的图片,而灰度化就是把图片转换为灰度的图片,经过处理之后的图片识别起来更加准确。

- 参数 : options {OcrOptions} 参数

- 返回 : {DetectResult} 结果

- 版本 : 1.0.0

```javascript
//灰度化识别
let options = {
    region: [0,0,200,100], //识别范围(为空则识别整个屏幕)
    gray: true, //开启灰度化
    save: true, //是否保存图片
    savePath: "/sdcard/ocr.png" //保存图片路径(为空则不保存图片)
};
let result = $ocr.detect(options);
//二值化识别
let options = {
    region: [0,0,200,100], //识别范围(为空则识别整个屏幕)
    color: "#EEEEEE", //文字颜色(默认:#EEEEEE)
    threshold: 20, //二值化阈值(默认:20)
    save: true, //是否保存图片
    savePath: "/sdcard/ocr.png" //保存图片路径(为空则不保存图片)
};
//最原始的识别函数
let result = $ocr.detect(options);

```
### detect64(base64)

识别base64图片

- 参数 : base64 {String} 图片base64字符串

- 返回 : {DetectResult} 结果

- 版本 : 1.0.0

```javascript
//识别base64图片
let img = $img.read("/sdcard/test.png");
let base64 = $img.toBase64(img);
//一般情况下,base64可以从服务器端获取,而上面的代码是把本地图片转成base64的
let result = $ocr.detect64(base64);

```
### detectPath(imgPath)

识别路径中图片

- 参数 : imgPath {String} 图片路径

- 返回 : {DetectResult} 结果

- 版本 : 1.0.0

```javascript
//识别本地图片
let result = $ocr.detectPath("/sdcard/test.png");

```
### detectImg(img)

识别图片

- 参数 : img {Image} 图片对象

- 返回 : {DetectResult} 结果

- 版本 : 1.0.0

```javascript
//获取本地图片对象
let img = $img.read("/sdcard/test.png");
//识别图片对象
let result = $ocr.detectImg(img);
if (result.isSuccess()) {
    //...
}

```
### detectBitmap(bitmap)

识别路径中图片

- 参数 : bitmap {Bitmap} 位图对象

- 返回 : {DetectResult} 结果

- 版本 : 1.7.0

```javascript
//获取一个位图对象
let img = $img.read("/sdcard/t01.png");
let bitmap = img.getBitmap();
//识别本地图片
let result = $ocr.detectBitmap(bitmap);

```
### onlyRec(image)

只识别文字

只识别图片中的文字，不进行文字方位检测，能够省略检测文字方位的时间。

需要注意：

需要传入的图片只能是单一文字的图片，如果过大或者比较复杂，会导致异常。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : image {Image} 图片对象

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//获取本地图片对象
let img = $img.read("/sdcard/test.png");
//识别图片对象
let word = $ocr.onlyRec(img);
log(word);

```
### onlyRec(bitmap)

只识别文字

只识别图片中的文字，不进行文字方位检测，能够省略检测文字方位的时间。

需要注意：

需要传入的图片只能是单一文字的图片，如果过大或者比较复杂，会导致异常。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : bitmap {Bitmap} 位图对象

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//获取本地图片对象
let img = $img.read("/sdcard/test.png");
//获取位图对象
let bitmap = img.getBitmap();
//识别位图对象
let word = $ocr.onlyRec(bitmap);
log(word);

```
### onlyRec(path)

只识别文字

只识别图片中的文字，不进行文字方位检测，能够省略检测文字方位的时间。

需要注意：

需要传入的图片只能是单一文字的图片，如果过大或者比较复杂，会导致异常。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : path {String} 图片路径

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//识别路径上的图片
let word = $ocr.onlyRec("/sdcard/test.png");
log(word);

```
### onlyDet(image)

只检测位置

只检测图片中的文字位置，这个速度一般非常快。

需要注意：

该函数允许传入较大的屏幕截屏图片，只检测文字的位置，不会识别文字具体是什么。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : image {Image} 图片对象

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//获取本地图片对象
let img = $img.read("/sdcard/test.png");
//识别图片对象
let result = $ocr.onlyDet(img);
log(result);

```
### onlyDet(bitmap)

只检测位置

只检测图片中的文字位置，这个速度一般非常快。

需要注意：

该函数允许传入较大的屏幕截屏图片，只检测文字的位置，不会识别文字具体是什么。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : bitmap {Bitmap} 位图对象

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//获取本地图片对象
let img = $img.read("/sdcard/test.png");
//获取位图对象
let bitmap = img.getBitmap();
//识别位图对象
let result = $ocr.onlyDet(bitmap);
log(result);

```
### onlyDet(path)

只检测位置

只检测图片中的文字位置，这个速度一般非常快。

需要注意：

该函数允许传入较大的屏幕截屏图片，只检测文字的位置，不会识别文字具体是什么。

该函数是ncnn、ppocrv5独特函数，mlkit无此功能。

- 参数 : path {String} 图片路径

- 返回 : {String} 文字

- 版本 : 1.9.6

```javascript
//识别路径上的图片
let result = $ocr.onlyDet("/sdcard/test.png");
log(result);

```
---





