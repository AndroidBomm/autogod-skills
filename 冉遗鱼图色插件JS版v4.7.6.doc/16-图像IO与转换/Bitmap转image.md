[TOC]

##### 简要描述

- 将Bitmap图片对象转成EC的Image图片对象

##### 代码示例
```javascript
	
    //读取或截图一张Bitmap 图片
    let bitmap=readResBitmap("tu.png");
    //Bitmap 转 Image
    let img=image.bitmapToImage(bitmap);
    //回收Bitmap图片
    imageHandler.recycle(bitmap,img);
```
##### 备注
