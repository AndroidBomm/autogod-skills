[TOC]

##### 简要描述

- 将opencv的Mat图片对象转成Bitmap图片对象

##### 方法名
- ` matToBitmap `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat | mat对象   |


##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Bitmap  |返回 Bitmap图片  |

##### 代码示例
```javascript
	//截图或读取图片
    let srcMat=imageHandler.captureScreenMat();
    //Mat 图片对象转 Bitamp 图片对象
    let bitmap=imageHandler.matToBitmap(srcMat);
    //回收 Mat 图片
    imageHandler.recycle(srcMat,bitmap);
```

##### 备注
