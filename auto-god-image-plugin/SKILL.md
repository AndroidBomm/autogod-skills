---
name: "auto-god-image-plugin"
description: "AutoGOD/AiGame 冉遗鱼全分辨率图色插件专家（对齐 v5.0.4）。提供基于 OpenCV 的找图、找色、图像预处理、轮廓检测、字库识字、悬浮窗绘制等功能的 API 查询和使用指导。Invoke when user asks about 图色插件, 图色, 冉遗鱼, imageHandler, findImg, findColor, 找图, 找色, 比色, 轮廓检测, 图像预处理, OpenCV 图像处理, 屏幕绘制, 悬浮窗绘制, showRectOverlay, showCircleOverlay, showImageOverlay."
triggers:
  - "imageHandler"
  - "OperHandler"
  - "captureScreenMat"
  - "findImg"
  - "findColor"
  - "findMultiColor"
  - "findImgBySurf"
  - "findImgBySift"
  - "findImgByORB"
  - "冉遗鱼"
  - "图色插件"
  - "全分辨率找图"
  - "找图"
  - "找色"
  - "比色"
  - "轮廓检测"
  - "图像预处理"
  - "OpenCV"
---

# AutoGOD 全分辨率图色插件开发专家

## 概述

本 Skill 提供 AutoGOD/AiGame 全分辨率图色插件的完整 API 文档和使用指南。图色插件基于 OpenCV，提供企业级的计算机视觉能力，包括：

- 全分辨率找图（SURF/SIFT/ORB 特征点算法）
- 多点找色、比色
- 图像预处理（滤波、二值化、形态学）
- 轮廓检测与分析
- 字库找字（需自制字库，非 OCR）
- 图像变换与绘制

> **路径说明**：本技能已被 DSH 安装为独立技能包，全部文档就在本技能的**基础目录**下（加载时 DSH 会给出 `Base directory for this skill: ...`）。
> 上文出现的「本技能基础目录」即指该目录；DSH 会自动把相对路径解析到它，请勿再按「项目根目录」查找。

## 官方在线文档（权威来源 · 优先查阅）

本技能的本地文档来自官方文档站的**快照，可能滞后**。遇到本地文档没有、或与实现不符的 API，务必查阅官方在线文档：

| 用途 | 地址 |
|---|---|
| **官方文档站（人工查阅）** | http://www.ylancf.com/showdoc/web/#/645898090/179425265 |
| **文档 API（推荐：可程序化抓单页）** | `http://www.ylancf.com/showdoc/server/index.php?s=/api/page/info&page_id=<页面ID>` |
| **目录树 API（拿全部页面ID）** | `http://www.ylancf.com/showdoc/server/index.php?s=/api/item/info&item_id=645898090` |

- 文档站 `item_id` = **645898090**（标题：EasyClick图色插件新版），首页 `page_id` = **179425265**
- 抓单页返回 JSON，正文在 `data.page_content`（showdoc 的 markdown）
  - ⚠️ **坑**：响应用 `Invoke-WebRequest` 取 `.Content` 会按 Latin-1 解码成乱码，必须取原始字节
    `[Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())` 再 `ConvertFrom-Json`
- 想批量核对「官方有哪些页、本地缺哪些」：先拉目录树 API，再和本技能目录逐条比

### 📋 与官方文档站的核对结果（最近一次全量核对）

- 目录树 **156 页**，全部抓取成功；与本地 160 个 md 逐页做了「方法名 + 参数表 + 返回值表」签名段比对
- **没有遗漏的新增/改名函数**：本地已覆盖 `梯度特征匹配扩展`、`颜色替换`、`OCR文本`、`悬浮窗（新）`6 页等 5.x 新页
- 有 1 处**官方文档站自身写错**，已在 `16-图像IO与转换/Mat截图.md` 标注：
  `captureScreenMat` 网站列了 6 个参数，但 v5.0.4 源码是零形参，参数会被静默忽略
- 复核脚本要点：比对前必须 `HtmlDecode` + 去 `[TOC]` + 去空行，否则 `&quot;` 之类会误报大面积差异

> ⚠️ 本地文档基于 **v4.7.6 快照**，之后的内容已逐版补进本技能：
> v4.8.2 颜色替换（`replaceColor`）、v4.9.2 `ocrText` 全屏找字、v4.9.4 梯度特征匹配扩展（`gradientShapeMatchEx`）、
> **v5.0.0 悬浮窗整套换新（旧悬浮窗全部删除）**、v5.0.1 / v5.0.2 找色提速、v5.0.3 骨架提取优化、v5.0.4 修复快速找图弱化版（原生库）。
>
> **当前对齐版本：v5.0.4**。官方仍在更新，新 API 以官方站为准，禁止凭记忆编造。
>
> 📌 **版本口径提醒**：`OperHandler.js` 顶部写死 `_version_ = "v5.0.4"`，这是判断插件版本的**唯一可靠依据**。
> 注意 **AutoGod 原生包可能滞后于 AutoJs 版**（用户手上的 `G:\autogod图色插件4.9.4\` 就是 4.9.4），
> 所以「有没有某个方法」要以**手上那份 `OperHandler.js`** 为准，不能只看本技能文档。
>
> ✅ **AutoGod 版 5.0.4 已移植并真机验证通过**（雷电模拟器 Android 9）：
>
> | 项 | 结果 |
> |---|---|
> | `require("./OperHandler.js")` | ✅ OK |
> | `imageHandlerInit()`（`$ext.loadDex` + `$Match` + `loadSO`） | ✅ OK |
> | `captureScreenMat()` | ✅ Mat 720x1280 |
> | `findColor()` | ✅ found 3 |
> | `showRectOverlay()` / `clearOverlay()` / `hideOverlay()` | ✅ 全部 true |
> | `recycleAllMat()` | ✅ OK |
> | `version()` | ✅ `js版本：v5.0.4;    插件版本：v5.0.4;`（**不要读 `_version_`，实例上没有这个属性**） |
> | `matToBase64()` | ✅ 返回 `java.lang.String`；`.length` 是方法，先 `String(b)` 再取长度 |

## ⛔ 找图找色三条硬规则（2026-11 真机实测踩出来的）

这三条每一条都会导致**函数静默返回 null、不报错**，都是花了两天查出来的。

### 1. 用 `findImgFast`，不要用 `findImg`

```javascript
// ✅ 官方图色工具 TuSeToolWPF 的代码生成器用的就是这个
let arr = imageHandler.findImgFast(srcMat, tempMat, threshold, sx, sy, ex, ey, count, false);
// arr[0] = { left, top, right, bottom, similarity }，插件不返回中心，要自己算
let cx = (arr[0].left + arr[0].right) / 2, cy = (arr[0].top + arr[0].bottom) / 2;

// ❌ findImg 内部「先按 resize 缩图 → 再用原始像素 ROI 裁剪」，两者混用会抛
//    cv::Exception (-215:Assertion failed) ... in function 'Mat'
//    而插件把这个异常自己 catch 吞掉只写日志，调用方只能看到 null
```

### 2. 范围参数是 0~10000 归一化坐标，**不是像素**

```javascript
// 想找屏幕右下角 x 1140~1280、y 100~520 这块（1280x720 屏）
let nx = (px, total) => Math.round(px * 10000 / total);
imageHandler.findImgFast(mat, tpl, 0.85,
    nx(1140,1280), nx(100,720), nx(1280,1280), nx(520,720), 1, false);
```

传像素值的话 ROI 会被解释成极小的一块（如 `1140` ≈ 全屏的 11.4% 位置），**永远找不到**。

### 3. 第 1 个参数必须是 **Mat**，不能是 Image

```javascript
// ✅ captureScreenMat() / readMat() 返回的都是 Mat
let mat = imageHandler.captureScreenMat();

// ❌ $screen.getScreen() 返回的是 Image → 报「请使用Mat格式图片」并被吞成 null
imageHandler.findImgFast($screen.getScreen(), tpl, ...);   // ← 错
```

日志里出现 `function findImgFast 第 1 张图片请使用Mat格式图片` 就是这条。

> 这三条的原始排查记录在 `guide/踩坑记录.md` 的 `auto-god-docs` 技能里；官方工具本体在
> `H:\冉遗鱼图色工具高级版7.1.5\...\TuSeToolWPF.exe`，它自带的 `MakeCodeFun.js` 就是官方代码生成模板库，
> 不确定签名时可以直接去翻。

## 文档目录结构

```
本技能基础目录/
├── 01-基础信息/              # 插件介绍、教程、更新内容
├── 02-图像预处理/            # 灰度、二值化、滤波
├── 03-颜色处理/              # HSV/HLS/BGR、颜色范围
├── 04-形态学操作/            # 膨胀、腐蚀、开闭操作
├── 05-轮廓检测/              # 轮廓提取、外接矩形、凸包
├── 06-形状检测/              # 直线、圆形检测
├── 07-图像运算/              # 位运算、掩膜、透视变换
├── 08-投影与连通域/          # 投影分析、连通域
├── 09-找色功能/              # 单点/多点找色、比色
├── 10-找图功能/              # 快速找图、全分辨率找图
├── 11-资源管理/              # 加载/释放资源
├── 12-图像变换/              # 缩放、旋转、剪切
├── 13-图像绘制/              # 在图片上绘制
├── 14-图像哈希/              # 感知哈希、汉明距离
├── 15-屏幕绘制/              # ⛔ 悬浮窗（旧）—— v5.0.0 已删除，仅供历史参考
├── 16-图像IO与转换/          # Mat/Bitmap/Base64 转换
├── 17-字库/                  # 字库设置、找字、识字
├── 18-插件加载/              # 混合模式、本地加载
├── 19-常见问题/              # 问题排查
├── 20-实战示例/              # 滑块、识别实例
├── 21-悬浮窗新/              # ✅ 现行方案（v5.0.0+）：showRectOverlay 等整套
└── OperHandler.js           # 操作类，包含所有功能方法

> 📌 **本技能里这份 `OperHandler.js` 是「AutoGOD 移植版 v5.0.4」**（184,960 B），不是官方 AutoJs 原版。
>
> 官方 v5.0.4 包里的那份是 **AutoJs 版**（184,562 B），直接拿到 AutoGOD 里跑不起来 ——
> 它用的是 `files.read` / `images.captureScreen` / `importClass` / `"./classes-yu.dex"`。
>
> 本技能这份已经做了桥接，**可直接放进 AutoGOD 项目用**：
>
> | AutoJs 原版 | 本技能（AutoGOD 版） |
> |---|---|
> | `files.read` | `$file.read` |
> | `images.captureScreen` | `$screen.getScreen` |
> | `images.read` | `$img.read` |
> | `logi/loge` 之外的控制台输出 | `$log.log` / `$log.e` |
> | `DexClassLoader` 加载 dex | `$ext.loadDex({path, so})` |
> | `"./classes-yu.dex"`、`"./res/lib/xxx.so"` | `$task.getPath("./res/lib/...")` |
>
> 所以 dex/so 必须放在**项目根目录的 `res/lib/`** 下：
> `classes-yu.dex` + `libnative-arm64-v8a.so` / `libnative-armeabi-v7a.so` /
> `libnative-x86-64.so` / `libnative-x86.so`（按设备 ABI 自动挑）。
```

## 核心 API 分类

### 找图算法

| 方法 | 算法 | 特点 |
|------|------|------|
| `findImgBySurf()` | SURF | 尺度/旋转/光照不变 |
| `findImgBySift()` | SIFT | 精度最高 |
| `findImgByORB()` | ORB | 速度最快 |
| `findImg()` | 模板匹配 | 标准找图 |
| `findImgFast()` | 彩色快速 | 实时性高 |
| `findTranslucentImg()` | 半透明 | 透明按钮 |
| `gradientShapeMatchEx()` | 梯度特征匹配扩展 | **v4.9.4 新增**，比 gradientShapeMatch 快约 200%，**无 mask 参数** |
| `gradientShapeMatch()` | 梯度特征匹配 | 可全分/同分、可测角度、无视色差，支持 mask |

### 找色功能

| 方法 | 说明 |
|------|------|
| `findColor()` | 单点找色 |
| `findMultiColor()` | 多点找色 |
| `findMultiColorEx()` | 增强多点找色 |
| `cmpColor()` | 单点比色 |
| `cmpMultiColor()` | 多点比色 |

### 图像预处理

| 方法 | 功能 |
|------|------|
| `matToGray()` | 转灰度 |
| `binaryzationMat()` | 二值化 |
| `gaussianBlur()` | 高斯模糊 |
| `medianBlur()` | 中值滤波 |
| `dilate()` | 膨胀 |
| `erode()` | 腐蚀 |

### 轮廓检测

| 方法 | 功能 |
|------|------|
| `getContours()` | 获取轮廓 |
| `getContoursRect()` | 外接矩形 |
| `getContoursMinRect()` | 最小外接矩形 |
| `getConvexHull()` | 凸包 |
| `approxPolyDP()` | 多边形拟合 |

### 字库

| 方法 | 功能 |
|------|------|
| `setDict()` | 设置字库 |
| `findStr()` | 找字 |
| `getWords()` | 识字 |
| `ocrText()` | **v4.9.0 新增**：根据字库全屏识别未知文字；`colorInfo` 必填 |

### 悬浮窗（新 · v5.0.0+）

⚠️ 与 `15-屏幕绘制` 里的 `drawRectShow` / `drawCircleShow` / `drawPointShow`（悬浮窗**旧**）是**两套不同 API**，不要混用。

> **版本归属订正（重要）**：官方文档写「支持 v4.9.4 之后的版本」，但实测 **v4.9.4 的 `OperHandler.js` 里根本没有这 5 个方法**，
> 到 **v5.0.0** 起全部换成这套。旧悬浮窗在 **v5.0.0 已被删除**，调用旧写法会直接报「方法不存在」。

要求：**悬浮窗权限**；**无法在 root 模式下运行**；**所有方法都是异步的，同时调用顺序不保证**（要顺序就加 `sleep`）；
密集计算（如 yolo 循环检测）时 UI 可能来不及清除，也加 `sleep`。

| 方法 | 功能 |
|------|------|
| `showRectOverlay(matches)` | 绘制矩形悬浮窗（传 `RectEx`、`Match` 或 `RectEx[]`） |
| `showCircleOverlay(ps)` | 绘制圆心悬浮窗（传 `PointEx` 或 `PointEx[]`，取 `.x/.y/.r`） |
| `showImageOverlay(mat, x, y, w, h)` | 绘制图片悬浮窗；`x`/`y` 不写或 <0 时自动居中，`w`/`h` 默认取图宽高 |
| `clearOverlay()` | 只清空内容，**不删除**悬浮窗 |
| `hideOverlay()` | 清空内容**并删除**悬浮窗、释放图片 |

### ⚠️ v5.0.0 破坏性变更速查

**对你的脚本有影响的只有一条：旧悬浮窗方法全部没了。**

| 旧方法（v4.9.4 及更早） | v5.0.4 状态 | 改用 |
|---|---|---|
| `drawRectShow` / `drawRectShow2` | ❌ 已删除 | `showRectOverlay(matches)` |
| `drawCircleShow` / `drawPointShow` | ❌ 已删除 | `showCircleOverlay(ps)` |
| `drawImageShow` | ❌ 已删除 | `showImageOverlay(mat, x, y, w, h)` |
| `removeFloaty` | ❌ 已删除 | `clearOverlay()` |
| `releaseFloaty` | ❌ 已删除 | `hideOverlay()` |

**对普通脚本无影响的一条：java 层方法改名。** 改的是 `OperHandler.js` 内部 `this.Oper.Xxx` 的调用，
**JS 层的调用名没变**（`findImgBySurf()`、`findStr()`、`getWords()` 照旧调用）。
只有你要直接调 java 层、或读源码对照时才需要这张表：

```
findImgBySurfEx          → findImgBySurf
findLine                 → findLines
findImgByOriginalSurf    → findImgBySurfEx
findImgByOriginalSift    → findImgBySiftEx
findImgByOriginalORB     → findImgByORBEx
UseFontLibrary           → useDict
RemoveFontLibrary        → removeDict
SetFontOcrMap            → setDict
LocalOcr                 → findStr
LocalOcrEx               → findStrEx
FindImgByPyramid2        → FindImgByPyramid
LocalOcrCombinationHelper→ findStrComb
LocalOcrRecognition      → getWords
```

### 颜色替换

| 方法 | 功能 |
|------|------|
| `replaceColor(img, lowerColor, upperColor, color, sx, sy, ex, ey, alpha, mode)` | **v4.8.0 新增**。替换指定颜色；`alpha=1.0` 替换颜色，`alpha=0.0` 做透明图；`mode` 支持 `RGB`/`HSV`/`HLS` |

## 快速开始

### 1. 插件加载

```javascript
//无需加载 直接使用imageHandler即可
```

### 2. 截图

```javascript
let mat = imageHandler.captureScreenMat();
```

### 3. 找图

```javascript
// 全分辨率找图
let template = imageHandler.readResMat("template.png");
let points = imageHandler.findImgBySurf(mat, template);

// 快速找图
let result = imageHandler.findImg(mat, template);
```

### 4. 找色

```javascript
// 多点找色
let points = imageHandler.findMultiColor(
    mat, 
    "#FF4D8C",           // 首点颜色
    "0|0|#FFD700",       // 偏移颜色
    0.9, 0, 0, 0, 0, 5, 1
);
```

### 5. 释放资源

```javascript
imageHandler.recycle(mat, template);
```

## 文档查询规则

当用户询问图色插件相关问题时：

1. **确定功能类别**：根据用户问题判断属于哪个分类（找图/找色/预处理等）
2. **读取对应文档**：从 `本技能基础目录/` 对应分类目录读取文档
3. **禁止瞎猜API**：必须以文档中的 API 签名、参数说明为准，禁止编造或推测 API
4. **JS为辅**：OperHandler.js 仅作为辅助参考，API 准确性以文档为准
5. **避免AI致幻**：如果文档中未找到相关信息，必须明确告知用户"文档中未找到该API"，禁止自行补充或推测
6. **提供准确信息**：只使用文档中的 API 签名、参数说明、示例代码
7. **给出使用示例**：提供完整的 JavaScript 代码示例

## 注意事项

1. **资源释放**：使用完 Mat 对象后必须调用 `recycle()` 释放
2. **性能优化**：全分辨率找图比模板匹配慢但适配性更好
3. **颜色格式**：支持 `#FF0000` 和 `0xFF0000-0x101010` 格式
4. **坐标范围**：所有范围参数支持全分辨率写法（0-10000）

## 文件路径

- **文档根目录**：`本技能基础目录/`

## 作者信息
- **作者**: 冉遗鱼 QQ:244574798
- **EasyClick官方**: http://ieasyclick.com/docs/#/
