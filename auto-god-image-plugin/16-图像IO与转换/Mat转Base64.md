[TOC]

##### 简要描述

- Mat转base64 （v4.7.4）

##### 方法名
- ` matToBase64 `
##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|srcMat |是  |Mat |图片   |
|format |否  |string |格式 png(无损)或jpg(有损) 默认jpg   |
|q |否  |int |质量 0-100 默认100 png格式无效   |

##### 返回值说明 

|类型|说明|
|:-----  |:-----|
|string|base64 字符串（实际是 Java 的 java.lang.String，见备注）  |

##### 代码示例
```javascript
let srcMat = imageHandler.captureScreenMat();

let encode = imageHandler.matToBase64(srcMat, "jpg", 100);

// 转成普通 JS 字符串再用
let b64 = String(encode);
logd("长度 = " + b64.length);          // ✅ JS 字符串的 length
logd("开头 = " + b64.substring(0, 30));

imageHandler.recycle(srcMat);
```
##### 结果示例
```
/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYF...
```

##### 备注 

> [!NOTE] 返回 java.lang.String（v5.0.4 真机验证）
>
> - 类型是 **`java.lang.String`**，不是 `byte[]`，`isArray=false`
> - 但 `encode.length` 拿到的是**方法对象**（Java 的 `length()`），不是数字
>   —— 直接 `"长度=" + encode.length` 会印出一段函数源码
> - 正确做法：`String(encode)` 转成普通 JS 字符串，再用 `.length`
> - 插件没有 `Array.getLength`；要反射取数组长度得用 `java.lang.reflect.Array.getLength`

