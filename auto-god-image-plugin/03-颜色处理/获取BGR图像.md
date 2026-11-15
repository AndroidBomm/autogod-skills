[TOC]

##### 简要描述

- 获取BGR图像,或其中一种通道图像

##### 方法名
- ` getBGR `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|type |是  |int |-1表示BGR图像, 0表示B通道图像, 1表示获取G通道图像, 2表示获取R通道图像 |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Mat   |返回指定类型的图像  |

##### 代码示例
```javascript
   // 读取或者截图
    let srcMat=imageHandler.readResMat("ceshi.png");
    //获取BGR图像
    let BGR=imageHandler.getBGR(srcMat,-1);
    //获取B图像 蓝色值图像
    let B=imageHandler.getBGR(srcMat,0);
   //获取G图像 绿色值图像
    let G=imageHandler.getBGR(srcMat,1);
    //获取R图像 红色值图像
    let R=imageHandler.getBGR(srcMat,2);
    //保存
    logd("保存结果:"+imageHandler.saveMat(BGR,"/storage/emulated/0/Pictures/BGR.png"));
    logd("保存结果:"+imageHandler.saveMat(B,"/storage/emulated/0/Pictures/B.png"));
    logd("保存结果:"+imageHandler.saveMat(G,"/storage/emulated/0/Pictures/G.png"));
    logd("保存结果:"+imageHandler.saveMat(R,"/storage/emulated/0/Pictures/R.png"));
    //回收
    imageHandler.recycle(srcMat,BGR,B,G,R);

```
##### 结果示例
原图
![原图](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=6aec17730d97bb1d0cf627a35b4a555b "原图")

BGR图像
![BGR](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=3f8ca0d5008bffb47af323ae6760c860 "BGR")

B图像
![B图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=a0a09d086091bade5f423793cb33531b "B图像")

G图像
![G图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=ac72f3f31f623f52705d97c6e15e690e "G图像")

R图像
![R图像](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=ecb0f820631da6ae3f5eca7bb2d33b8d "R图像")



##### 备注