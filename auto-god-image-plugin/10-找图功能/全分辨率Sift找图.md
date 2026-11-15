[TOC]

##### 简要描述

- 全分辨率sift找图,精度最高,耗时也多  (不要用来找字,找字是OCR的事)
- 此方法为特征找图，原理:依靠特征点(即像素点)与周围八个方向的像素点差异的大小进行匹配,故特征点一般出现在轮廓边缘;目标需要有足够的特征才行，特征的数量和目标的纹理复杂度成正比。
- 原理：https://blog.csdn.net/qq_27529171/article/details/70113198

##### 方法名
- ` findImgBySift `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|img |是  |Mat |原图   |
|template |是  |Mat |目标小图   |
|imgResize |否  |double |大图缩放倍数 默认1.0 例如1表示不缩放0.5表示缩小一倍   |
|tempResize |否  |double |小图缩放倍数 默认1.0 例如1表示不缩放0.5表示缩小一倍   |
|sx |否  |int |起点x   |
|sy |否  |int |起点y   |
|ex |否  |int |终点x   |
|ey |否  |int |终点y   |
|threshold |否  |double |匹配度  默认是0.6 只是用于最终确认用的,写的更低也是ok的比如 0.5|

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Point[]或null   |返回顺时针四个角的坐标,或者null  |

##### 代码示例
```javascript
    //截图或者读取图片
    let srcMat=imageHandler.captureScreenMat();

    let temp=imageHandler.readResMat("lizi.png");
    //全分辨率找图
    let points =imageHandler.findImgBySift(srcMat,temp,1,1,-1,0,0,0);

    if(points){
        let 中心x=(points[0].x+points[2].x)/2;
        let 中心y=(points[0].y+points[2].y)/2;
        //点击
        clickPoint(中心x,中心y);
    }
    imageHandler.recycle(srcMat,temp)

```
##### 结果示例
sift找图
![结果](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=47497a7a90e48a5c35cfed2407de5b12 "结果")

##### 备注
注:此属于特征找图,特征数量与纹路复杂度和角点数量成正比,对于特征少的图和圆润的图无能为力(简单的图建议用全分模板匹配).