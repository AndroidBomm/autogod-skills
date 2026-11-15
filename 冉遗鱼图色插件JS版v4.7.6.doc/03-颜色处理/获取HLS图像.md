[TOC]

##### 简要描述

- 获取HLS图像,或其中一种通道图像

##### 方法名
- ` getHLS `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|type |是  |int |-1表示HLS图像, 0表示H通道图像, 1表示获取L通道图像, 2表示获取S通道图像   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Mat   |返回指定类型的图像  |

##### 代码示例
```javascript
    // 读取或者截图
    let srcMat=imageHandler.readResMat("ceshi.png");
    //获取HLS图像
    let HLS=imageHandler.getHLS(srcMat,-1);
    //获取H图像   H代表颜色
    let H=imageHandler.getHLS(srcMat,0);
	//获取L图像   L代表亮度程度
    let L=imageHandler.getHLS(srcMat,1);
    //获取S图像   S代表饱和度
    let S=imageHandler.getHLS(srcMat,2);
    //保存
    logd("保存结果:"+imageHandler.saveMat(HLS,"/storage/emulated/0/Pictures/HLS.png"));
    logd("保存结果:"+imageHandler.saveMat(H,"/storage/emulated/0/Pictures/H.png"));
    logd("保存结果:"+imageHandler.saveMat(L,"/storage/emulated/0/Pictures/L.png"));
    logd("保存结果:"+imageHandler.saveMat(S,"/storage/emulated/0/Pictures/S.png"));
    //回收
    imageHandler.recycle(srcMat,HLS,H,S,L);

```
##### 结果示例
原图
![原图](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=8fcae33475dce1802d78a55f16bb7db7 "原图")
HLS图像
![HLS](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=22dd9488d2e66f38c5765506730f60ba "HLS")
H图像
![H图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=9ab5f612b191262b60a68a3b0e83087e "H图像")
L图像
![L图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=b8c99d8a592b206d53a40da31afdf094 "L图像")
S图像
![S图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=c152458488c1b5576585b1f8040824be "S图像")

##### 备注