[TOC]

##### 简要描述

- 速度快,可旋转,精度不如Surf 和 Sift (不要用来找字,找字是OCR的事)
- 原理:依靠特征点(即像素点)与周围八个方向的像素点差异的大小进行匹配,故特征点一般出现在轮廓边缘

##### 方法名
- ` findImgByORB `
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
|threshold |否  |double |匹配度 0~1.0 默认0.7|
|nfeatures |否  |int |选择特征点数 默认值 10000个 如果找不到目标可以试着把这个值设的更高|
|scaleFactor |否  |double |图像金字塔每层缩放倍数 默认值 1.2 必须大于1|
|nlevels |否  |int |图像金字塔组数 默认值 8  可以简单的理解为 nlevels*scaleFactor越大适应的分辨率越宽   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Point[]或null   |返回顺时针四个角的坐标,或者null  |

##### 代码示例
```javascript

    //截图或者读取图片
    let srcMat=imageHandler.captureScreenMat();
    let temp=imageHandler.readResMat("qqqq.png");
    //全分辨率找QQ
    let points =imageHandler.findImgByORB(srcMat,temp,1,1,-1,0,0,0,0.6);

    if(points){
        logd("找到了")
        let 中心x=(points[0].x+points[2].x)/2;
        let 中心y=(points[0].y+points[2].y)/2;
        //点击
        clickPoint(中心x,中心y);
    }else{
        logd("没有找到")
    }

    imageHandler.recycle(srcMat,temp)

```
##### 结果示例
图色工具结果展示
![找图结果](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=615ea7c70d87c286eeb3486663db2a28 "找图结果")

##### 备注 
注:此属于特征找图,特征数量与纹路复杂度和角点数量成正比,对于特征少的图和圆润的图无能为力(简单的图建议用全分模板匹配).