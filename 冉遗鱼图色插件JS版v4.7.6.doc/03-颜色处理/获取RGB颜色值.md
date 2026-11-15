[TOC]

##### 简要描述
- 版本:3.5
- 获取图片的RGB十六进制颜色值(大写) 此方法是为了替换getRGBColor   例如 #1F23FD

##### 方法名
- ` getPixelColor `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|x |是  |int |坐标x   |
|y |是  |int |坐标y   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|string   |十六进制颜色字符串  |

##### 代码示例
```javascript
	  //截图或读取图片
    //截图或者读取图片
    let srcMat=imageHandler.captureScreenMat();
    let rgb=imageHandler.getPixelColor(srcMat,100,200);
    logd(rgb);
    imageHandler.recycle(srcMat);

	  
```
##### 备注

