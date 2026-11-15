[TOC]

##### 简要描述

- 根据字库全屏对未知文字进行识别（v4.9.0）
- 内部对 "." "," "，"三个符号特殊处理，默认它们不是首位和末尾
- 注：制作字库时若是手动分割的，宁可窄点也不要有重叠

##### 方法名
- ` ocrText `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|mat |是  |Mat |原图   |
|colorInfo |是  |string |颜色字符串（必填）  例如 <br> "#903A00-0x101010丨#000000-0x101010",|
|sx |否  |int |起点x 默认0  |
|sy |否  |int |起点y 默认0  |
|ex |否  |int |终点x 默认0 |
|ey |否  |int |终点y 默认0 |
|threshold |否  |double |阈值 默认 0.9   |
|colorFilter |否  |boolean |是否用设定的colorInfo对字库进行筛选,默认 false;  如果是true,有助于提供效率(前提是你的字库的颜色于设定colorInfo一致)   |
|charInterval |否  |double | 结果字间距，以行字符平均宽度为单位(符号除外)，默认1.0个单位   |
|fontName |否  |string |指定字库名称 例如 myFontName，不写则使用默认字库   |

##### 返回值说明

|类型|说明|
|:-----  |:-----|
|RectEx[]或null   |返回区域数组或null |

##### 代码示例
#####方式一 简单的使用方式

```javascript
	let r= imageHandler.setDict("testzk.txt","uuu");
	if (!r) {
		logd("字库设置失败！");
	}

	let srcMat=imageHandler.captureScreenMat();

	let rects=imageHandler.ocrText(srcMat,"#929190-0x131312|#D7D7D7-0x282929",0,0,0,0,0.9,false ,1,"uuu");

	if (rects) {
		for(let rect of rects){
			logd(JSON.stringify(rect));
		}
	}

	imageHandler.recycle(srcMat);

```

##### 结果展示

![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=8176ce2d02ba9a00974a9c396b00d7bf)

##### 备注
字库最好用代码截的图进行制作，减少色差
