[TOC]

##### 简要描述

- Mat格式同步截图(v3.8)，封装 $screen.getScreen()，截取全屏
- 注：此方法封装了 AutoGOD 的 $screen.getScreen() 并转为 Mat 对象，无参数，不支持区域截图
- 如需区域截图，先用 captureScreenMat() 截全屏，再用 cropMat() 裁剪

##### 方法名
- ` captureScreenMat `
##### 参数

无参数，截取全屏返回 Mat


##### 返回值说明

|类型|说明|
|:-----  |:-----|
|Mat或null   |Mat对象  |

##### 代码示例
```javascript
	 //截图或读取图片
    let srcMat=imageHandler.captureScreenMat();
    //回收
    imageHandler.recycle(srcMat);
```
##### 备注

> [!WARNING] 官方文档站的参数表是错的（v5.0.4 源码核实）
>
> 文档站这一页如今列了 `format / x / y / ex / ey / q` 六个参数，
> 但 v5.0.4 的 `OperHandler.js` 里签名为 `function captureScreenMat()` —— **一个形参都没有**，
> 传进去的参数会被静默忽略，永远截全屏。
>
> 所以**不要指望用 `captureScreenMat("jpg", 0, 0, 100, 100, 80)` 截区域**。
> 要区域截图：先 `captureScreenMat()` 截全屏，再用 `cropMat()` 裁剪。

