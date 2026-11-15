[TOC]

##### 简要描述

- 获取图片指定坐标的Red颜色值  例如 127

##### 方法名
- ` getRed `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|x |是  |int |坐标x   |
|y |是  |int |坐标y   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|number   |0~255 范围的颜色值  |

##### 代码示例
```javascript
    //截图或者读取图片
    let srcMat=imageHandler.captureScreenMat();
    let rgb=imageHandler.getRed(srcMat,100,200);
    logd(rgb);
    imageHandler.recycle(srcMat)
```
##### 备注

