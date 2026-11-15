[TOC]

##### 简要描述

- 将Bitmap图片对象转成高效的Mat图片对象

##### 方法名
- ` bitmapToMat `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|bitamp |是  |Bitmap |原图   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Mat   |opencv的Mat图片对象  |

##### 代码示例
```javascript
   //读取一张BufferedImage 图片
    let bitmap=readResBitmap("tu.png");
    //BufferedImage 转 Mat
    let srcMat=imageHandler.bitmapToMat(bitmap);
    //回收bitmap, Mat 图片
    imageHandler.recycle(bitmap,srcMat);
```
##### 备注

