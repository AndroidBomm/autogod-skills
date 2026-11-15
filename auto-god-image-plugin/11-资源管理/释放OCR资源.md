[TOC]

##### 简要描述

- 当不再使用OCR时 释放所有资源

##### 方法名
- ` releaseAll `
##### 参数   
   无

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|boolean   |true 释放成功,false释放失败  |

##### 代码示例
```javascript
    let r=ocrHandler.initOcr("/storage/emulated/0/Pictures/tessdata","chi_my");
    logd("OCR初始化结果"+r);
    //截图
    let bitmap=image.captureScreenBitmap("png",0,0,0,0,100);

    logd("bitmap"+bitmap);
    let result=ocrHandler.ocrBitmap(bitmap,0,0,0,0,70,3,true);
    if(result){
        logd(result[0].label)
        logd(JSON.stringify(result));
    }
    image.recycle(bitmap);
    //如果不在使用 释放所有ocr资源
    logd(ocrHandler.releaseAll());
```
##### 备注
