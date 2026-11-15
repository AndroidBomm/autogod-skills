[TOC]

##### 简要描述

- ec的Image图片对象转成Bitmap图片对象 


##### 代码示例
```javascript

    ///ec的image截图
    let img=image.captureFullScreen();
    //转 Bitmap
    let bitmap=image.imageToBitmap(img);

    //回收Bitmap,image图片 (插件的回收兼容ec的)
    imageHandler.recycle(img,bitmap);
```
##### 备注 

