[TOC]

##### 简要描述

- 获取HSV图像,或其中一种通道图像

##### 方法名
- ` getHSV `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|type |是  |int |-1表示HSV图像, 0表示H通道图像, 1表示获取S通道图像, 2表示获取V通道图像   |

##### 返回值说明 

|类型|说明|
|:-----  |:-----|
|Mat   |返回指定类型的图像  |

##### 代码示例
```javascript
    // 读取或者截图
    let srcMat=imageHandler.readResMat("ceshi.png");
    //获取HSV图像
    let HSV=imageHandler.getHSV(srcMat,-1);
    //获取H图像   H代表颜色
    let H=imageHandler.getHSV(srcMat,0);
    //获取S图像   S代表饱和度
    let S=imageHandler.getHSV(srcMat,1);
    //获取V图像   V代表明暗程度
    let V=imageHandler.getHSV(srcMat,2);
    //保存
    logd("保存结果:"+imageHandler.saveMat(HSV,"/storage/emulated/0/Pictures/HSV.png"));
    logd("保存结果:"+imageHandler.saveMat(H,"/storage/emulated/0/Pictures/H.png"));
    logd("保存结果:"+imageHandler.saveMat(S,"/storage/emulated/0/Pictures/S.png"));
    logd("保存结果:"+imageHandler.saveMat(V,"/storage/emulated/0/Pictures/V.png"));
    //回收
    imageHandler.recycle(srcMat,HSV,H,S,V);

```
##### 结果示例
原图
![原图](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=c447cf4fd8b7f0ab4ef31fb91fa4665e "原图")

HSV图像
![HSV图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=a1cd18e634df35f8a5ca16b925879f9c "HSV图像")

H图像
![H图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=6eaa4384ec4fc0c11baeb60bc52ba7f5 "H图像")

S图像
![S图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=1352635ab147a904a4cbe7afbf871a28 "S图像")

V图像
![V图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=96b3d57ac5aef3d424bca4ef83ba780f "V图像")


##### 备注