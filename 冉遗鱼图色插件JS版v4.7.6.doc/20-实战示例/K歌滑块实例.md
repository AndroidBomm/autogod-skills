[TOC]

##### 简要描述

-一个K歌滑块

##### 用到的方法
- ` getHSV `

- ` binaryzationMat `

- ` erode `

- ` getContoursRect `

- ` getContours `

- ` copyTo `

- ` cropMat `

- ` findImg `

##### 代码示例
```javascript

    //截图或者读取图片
    let kgImg=imageHandler.readResMat("kge5.png");

    //获取明暗通道V
    let kg_V=imageHandler.getHSV(kgImg,2);
    //获取颜色通道H
    let kg_H=imageHandler.getHSV(kgImg,0);
    let 反向二值化=imageHandler.binaryzationMat(kg_V,70,255,1);
    let 反向二值化腐蚀=imageHandler.erode(反向二值化,0,3,3);
    let rects=imageHandler.getContoursRect(反向二值化腐蚀,1,2);
    // 按比例类确定 滑块区域的宽度  以适应不同分辨率
    let w= 75/300*kg_H.getWidth();
    let 最小面积=400/(300*300)*(kg_H.getWidth()*kg_H.getHeight())
    for (let i = 0; i <rects.length ; i++) {
        //过滤在滑块区域的目标
        if(rects[i].left<=w){continue;}

        //过滤掉宽度比滑块区域大的目标
        if(rects[i].right-rects[i].left>w){continue;}

        //过滤掉 面积太小的目标
        if((rects[i].bottom-rects[i].top) * (rects[i].right-rects[i].left)<最小面积){continue;}

        //画出目标轮廓 并填充
        let 画出轮廓=imageHandler.getContours(反向二值化腐蚀,1,2,[i],-1);

        //进行H通道的掩膜复制
        let 掩膜复制H= imageHandler.copyTo(kg_H,画出轮廓);

        //把复制的区域剪切下来当 模板
        let 剪切的目标=imageHandler.cropMat(掩膜复制H,rects[i].left,rects[i].top,rects[i].right,rects[i].bottom);

        // 在H通道图像上区域模板找图
        let r= imageHandler.findImg(kg_H,剪切的目标,1,0.95,0,rects[i].top,w,rects[i].bottom,1,剪切的目标);
        if(r){
            logd("找到了")
            let 框选出结果=imageHandler.drawRect(kgImg,rects[i].left,rects[i].top,rects[i].right,rects[i].bottom);
            logd(imageHandler.saveMat(kgImg,"/storage/emulated/0/Pictures/kgImg.png"));
            logd(imageHandler.saveMat(框选出结果,"/storage/emulated/0/Pictures/框选出结果.png"));
            imageHandler.recycle(框选出结果);
        }
    }



    imageHandler.recycle(kgImg,kg_V,kg_H,反向二值化,反向二值化腐蚀);

```
##### 结果示例
原图1
![原图1](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=830b5776be1a5021db1b3ef7f3ccf761 "原图1")

结果图1
![结果图1](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=d4f2916da22fc178503d3e2d9c1b2424 "结果图1")



原图2
![原图2](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=1a5f3859d9cb9ee1ed994e2c4aea279c "原图2")

结果图2
![结果图2](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=c82d366b828f75a84a29cb9b64947c24 "结果图2")

原图3
![原图3](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=9c78d018e0e6931b366c070779e3ad15 "原图3")

结果图3
![结果图3](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=60f9be43fa7c4a639ae0937b490a89f5 "结果图3")



##### 备注
