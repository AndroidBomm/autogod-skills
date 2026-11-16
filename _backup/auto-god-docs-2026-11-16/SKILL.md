---
name: auto-god-docs
description: AutoGOD/AiGame 编码参考手册。提供 $act/$screen/$ocr/$http/$floaty/$file 等全套 API 文档、UI 框架指南、开发规范和踩坑记录；可运行的完整示例源码在同机安装的 auto-god-examples 技能里。Invoke when user asks about AutoGOD/AiGame scripting, API usage, UI layout, image recognition, OCR, network requests, file operations, multi-threading, or Android automation.
---

# AutoGOD 编码参考手册

## ⛔ 三条红线（违反必出「不报错」的故障）

> 这三条的共同特征是**全程没有报错**：界面正常、日志安静、行为诡异。
> 看到这个组合，**先回来查这里**，别去猜业务逻辑。

1. **`$root` 的两条真实边界（2026-11 A/B 实测，旧说法「同步必卡死」已作废）。**
   健康实例里同步 `$root.exeRootShellSync()` **只要 6~11ms**，异步 `$root.exeRootShell()` 约 2 秒，两者可混用、互不干扰。
   真正会卡死/不回调的是这两个前提：① 本次运行**调过 `$root.getPermit()`**（毒化整条通道）；
   ② 实例是 **`adb broadcast runJs` 启动的**（残废实例，异步回调全不触发）。
   详见 `guide/踩坑记录.md` 第十二章、`api/root.md` 顶部。
2. **不要调用 `$root.getPermit()`。**
   它会把整条 root 通道搞坏（之后任何同步 root 命令永久卡死）。判断权限**只用 `$root.hasPermit()`**。详见 `api/root.md`。
3. **所有 `$log.*` 只接受一个参数。**
   `$log.i("a", b)` 会抛异常，并**中断抛出它的那个回调** —— 如果这行写在按钮的 `click` 里，
   它后面的绑定**全部静默失效**（界面正常、日志安静、点按钮没反应）。详见 `api/log.md` 顶部。

**调试时还要记住**：`adb broadcast runJs` 启动的实例是「残废」的（异步回调全不触发、同步调用直接卡死）。
**判断某个 API 能不能用，必须用客户端「运行」按钮启动**（详见 `debug/adb-setup.md`）。
**开关 WiFi 断网必须成对下发**：`su -c 'nohup sh -c "svc wifi disable; sleep 4; svc wifi enable" >/dev/null 2>&1 &'`。
从电脑端单独执行 `svc wifi disable` 会连 adb 一起关掉（模拟器只有 wlan0），实例直接报废。
这是唯一能让游戏**秒级**弹「连接中断」的手段（约 4 秒，iptables 要 57~120 秒）。详见 `guide/踩坑记录.md` 第十三章。

---

## 概述

本手册提供 **AutoGOD（AiGame）** 平台的完整 API 文档和编码参考，覆盖安卓自动化的各个方面：

- **手势动作**：点击、滑动、手势、节点查找（`$act`, `act-UiSelector.md`）
- **图色识别**：找图、等图、找色、图色函数（`$ag`, `$img`, `$color`）
- **屏幕与 OCR**：截屏、亮度控制、文字识别 ncnn/mlkit/ppv5（`$screen`, `$ocr`）
- **UI 界面构建**：17 种布局 + 30+ 控件，XML 模板引擎（`ui/`）
- **悬浮窗与对话框**：系统级/应用级悬浮窗、阻塞对话框、悬浮球菜单（`$floaty`, `$tip`, `$arc`）
- **文件与存储**：文件读写、键值存储、SQLite 数据库（`$file`, `$storage`, `$sqlite`）
- **网络通信**：HTTP 请求、WebSocket（`$http`, `$ws`）
- **应用与设备**：应用管理、设备信息、系统设置（`$app`, `$device`, `$sys`）
- **线程与并发**：线程、定时循环、倒计时锁（`$thread`, `engine`, `event`）
- **YOLO 目标检测**：模型训练、推理、结果处理（`api/yolo*.md`）
- **权限管理**：无障碍、悬浮窗、存储、Shizuku 权限（`$permit`）
- **内存读写**：进程内存读/写、特征码扫描、打补丁、备份、ptrace、硬件断点、远程调用（`$mem`）
- **模块与 Java 交互**：`require()` 模块系统、Java 类导入

---

## ⚠️ 先读这些，再动手（强制阅读顺序）

**不要一上来就翻 `api/` 的方法表。** 按下面的顺序读，顺序反了会写出「看起来对、跑起来错」的东西：

1. **`guide/Agent执行协议.md`** —— **AI 怎么做事**（七阶段编排、动作四要素、修复内环、交付六段式）。优先级高于本文件里任何 API 细节。
2. **`guide/Agent执行协议.md` 的〈线程模型铁律〉** —— 违反它会让界面**直接卡死且不报错**。核心一句：**主线程就是 UI 线程，同步阻塞 API 绝不能放 UI 线程。**
3. **`guide/自检清单.md`** —— 写完代码逐条核对（含〈线程模型与阻塞红线〉和〈细节坑〉两章）。
4. **`guide/开发规范.md`** + **`guide/踩坑记录.md`** —— API 命名规则、参数顺序、权限申请顺序、真机实测的坑。
5. 最后才按需查 `api/` / `ui/` 的方法表。

> 需要**真机把脚本跑起来**时，直接跳到下面的「调试与连接」一节。

## 调试与连接（真机 / 模拟器）

需要把脚本真正跑起来、或在设备上调试时，先读 `debug/` 目录：

| 文件 | 内容 |
|------|------|
| `debug/adb-setup.md` | **雷电模拟器 + ADB 广播调试 实操（已实测跑通）**：环境事实、完整命令、开发循环、验证脚本是否执行的技巧、踩坑记录、**〈WS 取值回路〉**、**〈第十二节：uiautomator 按文字定位 + validateJs 语法校验〉** |
| `debug/adb.md` | ADB 调试协议（广播指令全集） |
| `debug/ws.md` | 局域网调试协议（WebSocket，双向：实时日志/截屏/传文件/runJsCode） |
| `debug/intent.md` | 第三方 APP 开放文档 |
| `debug/tasker.md` | 第三方自动化 APP 联动 |

**两条调试路线怎么选**：

| 需求 | 走哪条 |
|------|--------|
| 单向触发（跑脚本、设路径、弹 toast、停脚本） | **ADB 广播**（轻，不用长连接） |
| `zip` / `unzip`（唯一有文件回执的广播指令） | **ADB 广播** + 轮询 `/sdcard/AutoGod/adb/` 下的 `zipSuccess`/`unzipFail` |
| 要业务回包（文件 CRUD、`ls` 列表、截图、剪贴板） | **局域网 WS `ws://<设备IP>:15431`** —— 广播**完全没有**这些能力 |
| **要拿脚本的返回值** | **WS + 剪贴板中转**（`runJsCode` 里 `setClip(...)` → `getClip` 读 `clipContent:`）。详见 `debug/adb-setup.md` 的〈WS 取值回路〉 |

要点速记：
- 调试前**必须**在应用内打开「开发调试 → ADB」开关，否则广播被静默忽略、不报错
- `Broadcast completed: result=0` **不代表脚本执行成功**，要用「脚本 `$file.write` 写文件 → `adb shell cat` 读回」验证
- 截图必须用 `cmd /c "... > x.png"`，PowerShell 的 `>` 会破坏二进制
- ⚠️ **`adb broadcast runJs` 启动的脚本实例可能与用户点「运行」启动的实例行为不同** —— 本项目实测：广播实例的异步回调不触发、同步 shell 死锁。**不要用广播实例判断某个 API 能不能用**，要用真机正常启动路径复验。详见 `guide/踩坑记录.md` 第十一章。
- ⚠️ **Action 与接收器类名不要照抄上游文档** —— 上游公开文档写的是 `top.kodesh.app.ADB_DEBUG_ACTION`（另一构建），本机可用的是 `com.gitee.kodesh.ADB_DEBUG_ACTION`。用错会**直接把调试通道弄断**。实际可用的值见 `debug/adb-setup.md`。

## 触发条件（必须触发）

**⚠️ 只要读取到项目涉及 AutoGOD / AiGame 相关的代码（.js 脚本、.xml 布局、$ 开头的 API 调用），必须先加载本 skill。**

包括但不限于以下场景：
- 用户提到 `AutoGOD` / `AiGame` / `AIGame` / `autogod` / `aigame`
- 代码中出现 `$act`、`$screen`、`$ocr`、`$http`、`$floaty`、`$file`、`$ag`、`$ui` 等 `$` 开头的 API
- 涉及 `.xml` 布局文件（`<ui>` 根节点、`w/h/bg/dir` 类属性）
- 需要编写或修改安卓自动化脚本
- 涉及 **UI 界面构建**、图像识别、OCR 文字识别、网络请求、文件操作、多线程
- 任何需要 `require()` 模块或 Java 交互的场景

> 注意：AutoGOD 曾用名 AiGame，两者指同一平台，API 完全通用。

---

## UI 编写强制规则（重要）

当涉及 UI 界面构建或 XML 布局时，**必须按以下顺序查阅文档**：

1. 先读取 `ui/` 目录下对应控件的文档（如 `button.md`、`input.md`、`layout-linear.md` 等），**不要凭记忆写 XML 标签和属性名**
2. 再读取 `ui/examples/` 下的综合案例（`案例-登录界面.md`、`案例-标签联动.md` 等）参考完整用法
3. 最后读取 `guide/踩坑记录.md` 中的 XML 布局陷阱章节（`gravity` vs `layout_gravity`、`visibility` 不生效等）
4. **写到图标时先查 `ui/icon-list.md`**（内置 1537 个图标名清单）—— **绝对不要凭感觉猜图标名**，名字不存在会静默不显示、不报错。命名规律是 `<名字>_fill`（填充版）/ `<名字>_outline`（描边版），没有裸名。
   拿不准就去客户端现场看：**侧边栏 → 辅助信息 → 「内置图标」**（页面标题「图标库」，带搜索框可滚动浏览）。
5. 写完 UI 后对照 `guide/踩坑记录.md` **第九章「UI 组件实测陷阱」**（真机实测结论：图标名、`<card>` 背景色改不动、`button-group` 的坑等）

> ⚠️ **AutoGOD XML 不是 Android XML！** 标签小写（`<linear>` 不是 `<LinearLayout>`）、属性用缩写（`w`/`h`/`bg`/`dir`）、根节点是 `<ui>`。不查文档直接写必然出错。
>
> ⚠️ **文档里出现的属性/图标名不代表实际可用** —— 以真机实测为准，第九章专门记录这类「文档写了但不生效」的情况。

---

## 核心架构

**权限优先级链：ROOT > Shizuku > Accessibility**

- 所有 `$act` 手势操作均遵循此优先级
- `$permit` 权限方法只调用一次（内部缓存）
- `getPermit()` 是阻塞方法，不要在 UI 线程调用，UI 线程用 `$permit.wza()`

---

## 强制执行流程

### 第零步：必须查阅官方文档（强制规则）

**任何 AutoGOD 代码开发、修改、调试前，必须同时查阅以下两个官方文档网站，与本 skill 文档相互印证，确认 API 签名、参数顺序、XML 属性名准确无误：**

- **API 文档**：https://auto-god.top/api_en/act.html （全部 `$` 开头 API 的完整参考）
- **UI 文档**：https://auto-god.top/docs/en/ui/index（全部控件、布局、属性的完整参考）

> ⚠️ 本 skill 是本地速查手册，官方文档是最新最全的权威来源。两者不一致时以**官方文档为准**；官方文档也查不到的 API 不得凭空编造，必须明确告知用户"文档中不存在此 API"。

### 第一步：查阅开发规范

如果用户需要生成完整项目，先读取以下文件：

1. `guide/开发规范.md` — 项目结构、XML 布局规范、API 调用规范、常见错误
2. `guide/自检清单.md` — 代码生成前强制自检清单（生成代码前必须完成所有检查项）
3. `guide/踩坑记录.md` — 真机验证的 API 陷阱、XML 布局问题
4. `guide/悬浮窗错误修正.md` — 悬浮窗 API 常见错误与正确用法

### 第二步：查阅对应 API 文档

根据用户需求定位对应 api/ 或 ui/ 文件，确认函数签名和参数类型。

API 模块文档在 `api/` 目录（英文文件名），按功能分类：

| 分类 | 文件 | 说明 |
|------|------|------|
| **手势动作** | `act.md` | `$act` 点击、滑动、长按、手势 |
| | `act-Node.md` | Node 节点信息 |
| | `act-UiSelector.md` | UiSelector 节点查找 |
| **图色识别** | `ag.md` | `$ag` 找图、等图、多点找色 |
| | `img.md` | `$img` 图片裁剪、缩放、灰度 |
| | `color.md` | `$color` 颜色操作、找色 |
| **屏幕与OCR** | `screen.md` | `$screen` 截屏、亮度、方向 |
| | `ocr.md` | `$ocr` ncnn/mlkit/ppv5 文字识别 |
| | `draw.md` | `$draw` 全屏绘制调试 |
| **文件与存储** | `file.md` | `$file` 读写、拷贝、移动、媒体库 |
| | `storage.md` | `$storage` 键值存储 |
| | `sqlite.md` | `$sqlite` 数据库 |
| **网络** | `http.md` | `$http` GET/POST/下载/上传 |
| | `ws.md` | `$ws` WebSocket |
| **应用与设备** | `app.md` | `$app` 启动、安装、卸载 |
| | `device.md` | `$device` 屏幕、电池、音量 |
| | `sys.md` | `$sys` 飞行模式、剪切板、保活 |
| **悬浮窗与对话框** | `floaty.md` | `$floaty` 悬浮窗（newSys/newApp/newAdj） |
| | `tip.md` | `$tip` 阻塞对话框 |
| | `arc.md` | `$arc` 悬浮球菜单 |
| **线程与引擎** | `thread.md` | `$thread` 线程、循环器 |
| | `engine.md` | `$engine` 脚本运行、暂停、停止 |
| | `event.md` | `$event` 事件监听 |
| **工具** | `str.md` | `$str` 80+ 字符串函数 |
| | `date.md` | `$date` 日期格式化 |
| | `permit.md` | `$permit` 权限工具 |
| | `global.md` | `$global` sleep/alert/log/random 全局函数 |
| **YOLO** | `yolo.md` | `$yolo` 目标检测 |
| **内存读写** | `mem.md` | `$mem` 内存读写、特征码扫描、打补丁、备份、ptrace、硬件断点、远程调用 |
| **模块与Java** | `模块化编程.md` | `require()` 模块系统 |
| | `Java交互.md` | Java 类导入与 `$import` |

UI 框架文档在 `ui/` 目录（英文文件名），覆盖 17 种布局 + 30+ 控件 + 演示文件。

### 第三步：参考代码示例

在 `examples/` 中查找对应分类的示例代码：

| 文件 | 内容 |
|------|------|
| `examples/界面与交互.md` | $alert 对话框、$ui 界面、列表、触摸 |
| `examples/图像与媒体.md` | $canvas 画布、$img 图片、$media 播放 |
| `examples/系统与设备.md` | $act 手势、$screen 屏幕、$device 设备 |
| `examples/网络与通信.md` | $http 请求/下载、$ws WebSocket |
| `examples/文件与存储.md` | $file 文件、$storage 存储、$sqlite |
| `examples/工具与框架.md` | $thread 线程、$tip 对话框、$yolo |

按 API 模块分类的可运行示例源码在**独立技能 `auto-god-examples`** 里：43 个模块目录、433 个原始 `.js`/`.xml`/`.java`/`.txt`/`.c` 文件，作者原始目录结构与文件名，另带 18 个内嵌小素材和还原脚本。需要能直接跑的样例时加载那个技能（`/auto-god-examples`），再按模块目录取文件。

本技能只保留上面 6 个分类汇总 md。图片、jar、dex、so、apk、mp4 等大二进制素材不在任何技能内，需要时从 `H:\skill\auto-god-docs-backup-20261115.zip` 解压。

在 `ui/examples/` 中查找 UI 综合案例（案例-登录界面、案例-简易播放器等）。

在 `projects/` 中查看完整项目示例（光源音乐项目、悬浮界面项目）。

### 第四步：检查踩坑记录

生成代码后对照 `guide/踩坑记录.md` 和 `guide/悬浮窗错误修正.md` 检查常见错误。

完成所有步骤后在回复开头声明：

```
✅ 已完成强制自检：
- [x] API 调用规范检查
- [x] 权限申请顺序检查
- [x] 资源释放检查
- [x] 异常处理检查
- [x] 代码规范检查
```

---

## 常用模式速查

按 API 模块分类，每个模块包含最常用的代码模式。

### $act - 手势动作

```javascript
// 获取无障碍权限
$act.getPermit();
// 点击
$act.click(400, 348);
// 长按
$act.press(400, 348);
// 滑动（下拉通知栏）
$act.move(400, 0, 400, 800, 1000);
// 双指手势
$act.gesture([[504,583,504,583,0,1000], [504,583,100,200,0,1000]]);
// 节点查找与点击
let node = $act.selector().text("按钮").waitFirst(5000);
if (node) node.click();
```

### $ag - 图色识别

```javascript
// 单图点击
$ag.findImgClick({ path: "/sdcard/close.png", region: [0,0,500,500], similar: 0.85 });
// 等图出现后点击
$ag.waitImgClick({ path: "/sdcard/ready.png", waitTimes: 60, waitDur: 1000 });
// 循环等图
let point = $ag.waitImg({ path: "/sdcard/ready.png", waitTimes: 60, waitDur: 1000 });
if (point) $act.click(point);
```

### $screen - 屏幕与截屏

```javascript
$screen.getPermit();
let img = $screen.getScreen();              // 全屏截图
let region = $screen.getScreen(0,0,500,500);// 区域截图
$screen.setBrightness(200);                 // 亮度控制
$screen.forceOrientation("landscape");      // 强制横屏
$screen.recoverOrientation();               // 恢复自动旋转
```

### $ocr - 文字识别

```javascript
// 指定区域灰度识别
let result = $ocr.detect({ img: img, region: [0,0,200,100], gray: true });
// 查找文字并点击
let point = $ocr.getPoint("确认", { region: [0,0,500,500], gray: true });
if (point) $act.click(point);
```

### $color - 找色

```javascript
let img = $screen.getScreen();
let point = $color.find(img, "#a55978", 5, [300,200,500,500]);
if (point) { $draw.cross(point); $act.click(point); }
img.recycle();
```

### $floaty - 悬浮窗

```javascript
// 创建系统级悬浮窗
let win = $floaty.newSys(`
<ui><frame w="200dp" h="300dp" bg="#FFFFFF">
<linear dir="v" w="max" h="max" gravity="center">
<text text="悬浮窗内容" textSize="16"/>
<button id="btnClose" text="关闭"/>
</linear></frame></ui>
`);
win.setXY(100, 200);       // 位置
win.setWH(200, 300);       // 大小
win.touch(true);           // 可触摸
win.id("btnClose").click(() => { win.close(); });
$floaty.closeAll();        // 关闭所有

// ⚠️ SysFloaty newSys 拖动实现（已验证可行）：
// let winX=100, winY=200;  // 用 JS 变量跟踪位置（因为无 getXY）
// function onDrag(event,view){
//     switch(event.getAction()){
//         case 0: //ACTION_DOWN → 记录起始位置
//         case 2: //ACTION_MOVE → 计算偏移 win.setXY()
//         case 1: //ACTION_UP   → savePos()
//     }
// }
// win.id("rootFrame").onTouch(onDrag);  // 用 XView.onTouch()，不用 setOnTouchListener
// 详见 examples/$floaty - 悬浮窗.md 中的「03.系统级悬浮窗/04.可拖动的日志窗口」
```

### $ui - 界面布局

```javascript
// 从 XML 加载布局
let ui = $ui.layout(`
<ui><statusbar/>
<appbar back="true" id="mAppbar" title="标题" w="max"/>
<linear dir="v" w="max" h="max" padding="10">
<button id="mBtn" text="点击" w="max"/>
</linear></ui>
`);
ui.show();
ui.id("mAppbar").back(() => { ui.finish(); });
ui.id("mBtn").click(() => { toast("点击了按钮"); });

// 动态创建视图
let itemUi = $ui.layout(`<ui><text id="t1" text="动态文本" w="100" h="50"/></ui>`);
let textView = itemUi.id("t1");
container.addView(textView);
```

### $alert - 对话框

```javascript
// 基本
$alert.create().title("标题").msg("内容").but1("确定").but2("取消").show();
// 单选
$alert.create().title("选择").items(["A","B","C"], (di,which) => {
    info("选中:" + which);
}).but3("取消").show();
// 多选
$alert.create().title("多选").moreItems(["A","B","C"], [0], (di,which) => {
    info("选中:" + which);
}).but3("取消").show();
```

### $app - 应用操作

```javascript
$app.run("QQ");                            // 启动应用
$app.pkgExists("com.example.app");         // 判断安装
$app.uninstall("com.example.app");         // 卸载
$app.openAppSetting("AIGame");             // 打开设置
$app.openUrl("https://www.baidu.com");     // 打开链接
```

### $device - 设备信息

```javascript
let info = $device.info();
log("屏幕:", info.screen.width, "x", info.screen.height);
let battery = $device.getBattery();      // 电量
let memory = $device.getMemory();        // 剩余内存
$device.vibrate(1000);                   // 震动
$device.getMusicVolume();                // 音量
$device.setMusicVolume(10);
```

### $sys - 系统工具

```javascript
setClip("内容");                           // 剪切板
let text = getClip();
$sys.stayAwake(true);                      // 保持唤醒
$sys.stayAlive(true);                      // 保活服务
```

### $permit - 权限申请

```javascript
$permit.wza();          // 无障碍（非阻塞，推荐）
$permit.floaty();       // 悬浮窗权限
$permit.sd();           // 存储权限
$act.getPermit();       // 无障碍（阻塞式）
$szk.getPermit();       // Shizuku 权限
```

### $file - 文件读写

```javascript
$file.write("内容", "/sdcard/test.txt");   // 写入
let c = $file.read("/sdcard/test.txt");    // 读取
$file.add("追加\n", "/sdcard/test.txt");   // 追加
$file.exists("/sdcard/test.txt");           // 判断存在
$file.del("/sdcard/test.txt");             // 删除
$file.size("/sdcard/test.txt");            // 文件大小
$file.copy("a.txt", "b.txt");             // 拷贝
$file.move("a.txt", "b.txt");             // 移动
$file.mkdir("/sdcard/folder");            // 创建目录
$file.ls("/sdcard");                       // 列出目录
```

### $storage - 键值存储

```javascript
$storage.put("name", "张三");              // 存入
let name = $storage.get("name");           // 读取
$storage.remove("name");                   // 删除
$storage.contains("name");                 // 判断
```

### $sqlite - 数据库

```javascript
let db = $sqlite.open("/sdcard/data.db");
db.execute("CREATE TABLE IF NOT EXISTS user (id INT, name TEXT)");
db.execute("INSERT INTO user VALUES (?, ?)", [1, "张三"]);
let cursor = db.rawQuery("SELECT * FROM user", []);
while (cursor.next()) { log(cursor.getInt(0), cursor.getString(1)); }
cursor.close(); db.close();
```

### $http - 网络请求

```javascript
// GET
$http.get("https://api.example.com/data", (resp) => {
    let data = resp.body.json();
}, (err) => { log("失败:", err); });
// POST
$http.post("https://api.example.com/submit", {name:"张三"}, (resp) => {
    log("成功:", resp.body.string());
});
// 下载文件
$http.download("https://example.com/file.zip", "/sdcard/file.zip",
    (cur,total,percent) => { log("进度:", percent+"%"); },
    () => { log("完成"); },
    (err) => { log("失败:", err); }
);
```

### $ws - WebSocket

```javascript
let ws = $ws.newWebSocket("wss://example.com/ws");
ws.onOpen(() => { log("连接成功"); ws.send("Hello"); });
ws.onMessage((msg) => { log("收到:", msg); });
ws.onClose(() => { log("关闭"); });
ws.onError((err) => { log("错误:", err); });
ws.close();
```

### $thread - 线程与并发

```javascript
$thread.run(() => { /* 子线程执行 */ });
// 定时循环
setInterval(function() { checkStatus(); }, 3000);
// 倒计时锁（多任务等待）
let lock = new CdLock(3);
$thread.run(() => { /* 任务1 */ lock.countDown(); });
$thread.run(() => { /* 任务2 */ lock.countDown(); });
lock.wait();  // 等待所有任务完成
```

### ls - 列表操作

```javascript
ls.bindHolder((holder, data, position) => {
    holder.id("name").setText(data.name);
    holder.id("card").click(() => { /* 处理点击 */ });
});
ls.flush(dataList);     // 刷新列表
ls.del(position);       // 删除指定项
```

### 触摸与拖动（View 事件）

```javascript
view.click((e) => { log("点击:", e.x, e.y); });
view.longClick((e) => { log("长按:", e.x, e.y); });
view.startDrag((e) => { startX = e.x; startY = e.y; return true; });
view.drag((e) => { let dx = e.x-startX, dy = e.y-startY; });
```

### 等待与重试

```javascript
// 等待元素出现（超时则返回 null）
function waitForElement(text, timeout) {
    let t = Date.now();
    while (Date.now() - t < timeout) {
        let n = $act.selector().text(text).waitFirst(500);
        if (n) return n;
        sleep(200);
    }
    return null;
}

// 等待文字出现（OCR）
function waitForText(target, timeout) {
    let t = Date.now();
    while (Date.now() - t < timeout) {
        let p = $ocr.getPoint(target);
        if (p) return p;
        sleep(500);
    }
    return null;
}

// 重试执行
function retry(fn, retryCount, retryDelay) {
    for (let i = 0; i < retryCount; i++) {
        try { return fn(); } catch(e) { log("重试 "+(i+1)+": "+e); sleep(retryDelay); }
    }
    throw new Error("重试次数耗尽");
}
```

### 完整脚本模板

```javascript
// ===== 配置 =====
const CFG = { PACKAGE: "com.example.app", TIMEOUT: 10000 };

// ===== 初始化 =====
function init() {
    if (!$act.hasPermit()) $act.getPermit();
    if (!$screen.hasPermit()) $screen.getPermit();
}

// ===== 主流程 =====
function main() {
    init();
    log("脚本开始");
    // ... 业务逻辑 ...
    log("脚本结束");
}

// ===== 执行 =====
main();
```

---

## ⚠️ 常见陷阱

### 1. `$tip` 回调在后台线程执行

`$tip.input()`、`$tip.show()` 的回调函数在**后台线程**运行，不要在回调中调用：
- `$file.*`（文件操作）
- `$storage.*`（键值存储）
- 首次 `require()`（模块加载）

这些会触发 `FAILED ASSERTION` 错误。`$root.exeRootShell()` 是安全的。

✅ 正确做法：在回调中用 `$thread.run()` 包装，或标记变量后到主线程处理。

### 2. `$floaty.newSys()` 拖动实现（已验证）

`$floaty.newSys()` 创建的悬浮窗**可以实现拖动**，但有三个关键点：

1. **无 getXY/getX/getY** — SysFloaty 和 AppFloaty 只有 `setXY()`/`setX()`/`setY()`，没有对应的 getter。必须用 JS 变量（如 `winX, winY`）跟踪窗口位置
2. **用 XView.onTouch()** — 不要用 Android 原生的 `setOnTouchListener`，用 `view.onTouch((event, view)=>{})`
3. **MotionEvent 常量用数字** — `0`=ACTION_DOWN, `1`=ACTION_UP, `2`=ACTION_MOVE, `3`=ACTION_CANCEL，不要用 `android.view.MotionEvent.ACTION_*`

**透明背景：** `bg` 属性支持 `#AARRGGBB` 格式（`AA`=透明度），透明度要放在**内层容器**上：
```xml
<!-- ✅ 正确 -->
<frame>
  <linear bg="#66000000">...</linear>
</frame>
<!-- ❌ frame 上的 bg 透明度可能不生效 -->
```

**字体大小：** `textSize` 可直接用数字（如 `textSize="7"`），也可带 `dp`/`sp` 单位。纯数字更简洁，带单位更精确，根据需要选择。

✅ 参考案例：`examples/$floaty - 悬浮窗.md` 中的「03.系统级悬浮窗/04.可拖动的日志窗口」

### 3. ScrollView 内容更新后滚动不准

**现象：** 浮窗日志更新后，`fullScroll(FOCUS_DOWN)` 滚动位置"慢一步"（显示旧内容底部），或底部日志"冒尖"显示不全。

**原因：** `setText()` 后 ScrollView 布局未完成，立即滚动用的是旧内容高度。

```javascript
// ❌ 错误 — 布局未完成，位置不准
sv.fullScroll(android.view.View.FOCUS_DOWN);

// ✅ 正确 — 延迟 100ms 等布局完成后再滚动
setTimeout(function() {
    sv.fullScroll(android.view.View.FOCUS_DOWN);
}, 100);
```

**注意：** 只有滚动延迟，`setText()` 是立即执行的，不影响日志实时性。

### 4. 脚本用 `$engine.run()` 而非 `require().run()`

**错误做法：** 用 `require()` 加载脚本再调用其函数，停止时无法终止：
```javascript
// ❌ 脚本在主线程运行，$engine.stopAll() 无法停止
let script = require("./scripts/myScript.js");
script.run();
```

**正确做法：** 脚本作为独立文件直接执行，末尾自动调用主逻辑：
```javascript
// myScript.js — 纯粹的脚本，没有 run() 包装，没有 module.exports
let floatys = require("../modules/floatyLog.js");
floatys.show();
// ... 主逻辑直接写在顶层 ...

// main.js — 用引擎启动
$engine.run("./scripts/myScript.js");  // ✅ 可被 $engine.stopAll() 停止
```

**停止：** `$engine.stopAll()` 可终止所有 `$engine.run()` 启动的脚本，配合 `$thread.stopAll()` 确保完全停止：
```javascript
$engine.stopAll();  // 停止引擎任务
$thread.stopAll();  // 停止线程任务
```

### 5. `$file.write(content, path)` — 内容在前，路径在后

```javascript
// ✅ 正确
$file.write("内容", "/sdcard/test.txt");

// ❌ 错误（参数顺序反了）
$file.write("/sdcard/test.txt", "内容");
```

### 6. UI 布局用 `<ui>` 根节点，不是 Android XML

```xml
<!-- ✅ AutoGOD 布局 -->
<ui>
  <linear w="max" h="max" dir="v">
    <text textSize="14" text="Hello" />
  </linear>
</ui>

<!-- ❌ Android 布局（不能用） -->
<LinearLayout xmlns:android="...">
  <TextView ... />
</LinearLayout>
```

### 7. `$thread.loop` 可用性（待测试）

根据已有文档，`$thread.loop` 可用于定时循环。但实际测试中曾出现"找不到方法"的错误。
- 如果 `$thread.loop` 不可用，可改用标准 JS 的 `setInterval` 替代
- ⚠️ 以上结论未经充分验证，请根据实际运行环境选择合适方案

---

## 核心规则

| 规则 | 说明 |
|------|------|
| API 名称 | `$act`、`$screen`、`$file` 等，不是 Android API |
| XML 布局 | `<ui>` 根节点、小写标签、`w`/`h`/`bg`/`dir` 属性，**不是 Android XML** |
| UI 编写 | **必须先查 `ui/` 对应文档**，不凭记忆写 XML 标签和属性 |
| 权限顺序 | 无障碍 > 悬浮窗 > 存储，UI 线程用 `$permit.wza()` |
| 资源释放 | Image 对象用完调用 `recycle()`，用 try-finally 确保释放 |
| 模块系统 | `require()` 导入，模块文件直接写表达式导出 |
| Java 交互 | 直接定义 Java 类或使用 `$import` |
| 参数顺序 | `$file.write(content, path)` — 内容在前，路径在后 |
| 动态视图 | 用 `$ui.layout()` 传 XML 模板，不是 `$ui.create()` |
| **⚠️ `$tip` 回调线程** | `$tip.input/$tip.show` 的回调在**后台线程**执行，不要在其中调 `$file.*`/`$storage.*`/首次 `require()`，会触发 `FAILED ASSERTION`。`$root.exeRootShell()` 是安全的。详见 `guide/踩坑记录.md` 四章 |


---

