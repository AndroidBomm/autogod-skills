[TOC]

##### 简要描述

- 全分辨率Surf找图  (不要用来找字,找字是OCR的事)
- 此方法为特征找图，原理:依靠特征点(即像素点)与周围八个方向的像素点差异的大小进行匹配,故特征点一般出现在轮廓边缘. 目标需要有足够的特征才行，  特征的数量和目标的纹理复杂度成正比。
- 原理：https://blog.csdn.net/qq_31607947/article/details/104892576

##### 方法名
- ` findImgBySurf `
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
|threshold |否  |double |匹配度  默认是0.6 只是用于最终确认用的,写的更低也是ok的比如 0.5,其他全分辨率同理|
|upright |否  | boolean |只计算直立方向？true 是， false 计算全部方向（即旋转不变性，耗时） 默认true   |
##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Point[]或null   |返回顺时针四个角的坐标,或者null  |

##### 代码示例
```javascript
    //截图或者读取图片
    let srcMat=imageHandler.captureScreenMat();

    let temp=imageHandler.readResMat("qq.png");
    //全分辨率找QQ
    let points =imageHandler.findImgBySurf(srcMat,temp,1,1,-1,0,0,0);

    if(points){
        let 中心x=(points[0].x+points[2].x)/2;
        let 中心y=(points[0].y+points[2].y)/2;
        //点击
        clickPoint(中心x,中心y);
    }
    imageHandler.recycle(srcMat,temp)

```
##### 结果示例
结果图(图色工具结果图)
![surf结果图](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=2092b7cf88b95b9551da269aff81f239 "surf结果图")

计算方向upright为false (图色工具结果图)
![计算方向](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=38e2e1acca8fa3dc1f73155441663138 "计算方向")

##### 备注
注:此属于特征找图,特征数量与纹路复杂度和角点数量成正比,对于特征少的图和圆润的图无能为力(简单的图建议用全分模板匹配).