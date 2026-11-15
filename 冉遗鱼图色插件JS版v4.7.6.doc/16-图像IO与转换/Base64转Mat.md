[TOC]

##### 简要描述

- base64转Mat （v4.7.4）

##### 方法名
- ` base64ToMat `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|encoded |是  |string |base64字符串   |

##### 返回值说明 

|类型|说明|
|:-----  |:-----|
|Mat   |Mat图片  |

##### 代码示例
```javascript

let resultMat=imageHandler.base64ToMat(encode)

imageHandler.recycle(resultMat);

```
##### 结果示例

##### 备注 

