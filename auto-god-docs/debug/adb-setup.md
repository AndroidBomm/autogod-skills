# ADB 广播调试实操（雷电模拟器 · 已实测跑通）

> 本文是 `debug/adb.md` 协议的**实操落地版**：一套已验证可用的完整流程、可直接复制的命令、以及踩过的坑。
> 协议本身以 [官方 ADB 调试协议文档](https://auto-god.top/open/debug/02_adb.html) 与 `debug/adb.md` 为准，本文只补充「怎么真正跑起来」。

## 一、环境事实（本机实测）

| 项目 | 值 |
|---|---|
| 模拟器 | 雷电模拟器9，安装于 `D:\雷电\LDPlayer9` |
| 实例 | 实例0 = `emulator-5554`（Android 9 / x86_64 / 720x1280） |
| 模拟器控制 CLI | `D:\雷电\LDPlayer9\ldconsole.exe`（`list2` 列实例；`adb --index 0 --command "..."` 转发 adb 命令） |
| adb | PATH 里的 `H:\adb\adb.exe`(37.0.0) 与雷电自带 `D:\雷电\LDPlayer9\adb.exe`(34.0.4) **协议同为 1.0.41，两者都可用** |
| AutoGOD 客户端 | `org.auto.god` v2.0.1（versionCode 205，targetSdk 34） |
| 设备项目目录 | `/sdcard/Download/海岛助手/`（中文路径可正常传递） |
| 模拟器 ADB 开关 | `D:\雷电\LDPlayer9\vms\config\leidian0.config` 中 `"basicSettings.adbDebug": 1` |

## 二、前置条件

1. 模拟器实例已启动 —— `ldconsole list2` 输出中该实例第 5 列为 `1` 表示 Android 已启动
2. AutoGOD 客户端已安装，且**在应用内打开「开发调试 → ADB」开关**（悬浮菜单里，开关变绿）
   - ⚠️ **硬性要求**。未开启时广播会被**静默忽略**，不报任何错，极易误判
3. `adb devices` 能看到设备

## 三、连接检查

```powershell
adb devices
# 期望输出：
#   127.0.0.1:5555   device
#   emulator-5554    device
```

看不到设备时：等 2~3 秒再查一次，或

```powershell
adb connect 127.0.0.1:5555
```

## 四、核心指令（已实测可用）

广播三要素：action、`--es data "<指令>"`、`-n` 指定接收器。

```powershell
$DEV = "emulator-5554"
$ACT = "com.gitee.kodesh.ADB_DEBUG_ACTION"
$RXR = "org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver"

# 设置项目工作路径（无回调）
adb -s $DEV shell am broadcast -a $ACT --es data "setProjectPath:/sdcard/Download/海岛助手" -n $RXR

# 在子线程异步运行 JS 脚本
adb -s $DEV shell am broadcast -a $ACT --es data "runJs:/sdcard/Download/海岛助手/main.js" -n $RXR

# 停止当前脚本
adb -s $DEV shell am broadcast -a $ACT --es data "stopJs" -n $RXR

# 清空调试日志
adb -s $DEV shell am broadcast -a $ACT --es data "clearLog" -n $RXR

# 显示提示（有悬浮窗权限则悬浮窗，否则普通 Toast）
adb -s $DEV shell am broadcast -a $ACT --es data "toast:正在通过ADB调试" -n $RXR
```

压缩 / 解压（结果靠**状态文件**回传，因为广播无法返回数据）：

```powershell
# 解压：zip 路径 ### 目标目录
--es data "unzip:/sdcard/temp/project.zip###/sdcard/Projects/MyApp"

# 压缩：源目录 ### 输出 zip
--es data "zip:/sdcard/Projects/MyApp###/sdcard/backup/project.zip"

# 清理状态文件（下次压缩/解压前必须先清，否则会误判上一次的结果）
--es data "clearAdbFile"
```

状态文件位于 `/sdcard/AutoGod/adb/`：成功生成 `unzipSuccess` / `zipSuccess`，失败生成 `unzipFail` / `zipFail`。

```powershell
adb -s emulator-5554 shell "ls /sdcard/AutoGod/adb/"
```

## 五、开发循环（推荐）

```powershell
# 1) 推代码上设备
adb -s emulator-5554 push "本地路径\main.js" "/sdcard/Download/海岛助手/main.js"

# 2) 运行
adb -s emulator-5554 shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION `
  --es data "runJs:/sdcard/Download/海岛助手/main.js" `
  -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

# 3) 看日志
adb -s emulator-5554 logcat -d | Select-String "auto.god|kodesh"
```

## 六、判断脚本是否真的执行了（重要技巧）

广播是**单向**的：发出去没有返回值。`Broadcast completed: result=0` **只表示广播送达接收器，不代表脚本跑成功了**。

可靠的验证方式是「脚本写文件 → adb 读回」，比截图快且准：

```javascript
// 设备上要跑的脚本里加一行
$file.write("RESULT_OK", "/sdcard/_check.txt");
```

```powershell
adb -s emulator-5554 shell "cat /sdcard/_check.txt"
```

### ⭐ 日志去哪看：`/sdcard/AutoGod/log/log.log`（实测最省事的办法）

> ⚠️ **2.0.4 起目录从 `AIGame` 改名为 `AutoGod`**，旧路径 `/sdcard/AIGame/log/log.log` 会停在旧日期不再更新。
> 找不准时用 `adb shell ls -l /sdcard/AutoGod/log/ /sdcard/AIGame/log/ 2>&1` 比一下 mtime。
> 想看**实时**日志用跟随模式：`adb shell "tail -n 200 -F /sdcard/AutoGod/log/log.log"`（官方 IDE 就是这么做的）。

**AutoGOD 会把日志写成文件**，这是拿日志最可靠也最省事的方式：

```powershell
# AutoGOD 自己的结构化日志，每行一条 JSON
adb -s emulator-5554 shell "tail -30 /sdcard/AutoGod/log/log.log"

# 只看错误/警告
adb -s emulator-5554 shell "grep '\"l\":\"E\"' /sdcard/AutoGod/log/log.log"

# 也可以 pull 回来本地慢慢看
adb -s emulator-5554 pull /sdcard/AutoGod/log/log.log .
```

格式：`{"m":"消息内容","t":"19:48:56","l":"级别"}`，级别 `I`/`D`/`V`/`W`/`E`。

**为什么推荐它**（实测对比）：

| | 行数 | 内容 |
|---|---|---|
| `adb logcat -d` | **6,054 行** | 混着整个 Android 系统的日志，要不停 grep |
| `/sdcard/AutoGod/log/log.log` | **187 行** | **只有 AutoGOD 自己的日志，无系统噪音** |

小 30 多倍，而且**位置固定、不滚动、不清空**（`$log.delete()` 清的就是它）。

### 补充：logcat 里到底有没有？（实测澄清）

之前这里写过「`log()` 不写 logcat」——**这个结论不准确**。实测：

- 脚本的 `log()` 输出**确实会进 logcat**，但 tag 是系统复用的 `AccessibilityManager`，内容形如
  `E AccessibilityManager:  I 19:48:56 消息`，**按包名或按函数名过滤都抓不到**，所以容易被误判为「没写」
- 应用还有个日志界面（`org.auto.god/com.gitee.kodesh.log.ui.LoggerActivity`），但**未导出**，
  无法 `am start` 打开（报 `Permission denied: ... not exported from uid`）；有日志时它自己会弹出来

**结论：优先读 `log.log`；确实需要 logcat 时按下面的 tag 过滤，不要按包名。**

```powershell
adb -s emulator-5554 logcat -d | Select-String "AccessibilityManager"
```

### 兜底：脚本写文件 → adb 读回

想验证某段逻辑跑没跑、拿到结构化结果时，这招仍然最稳（不受日志级别影响）：

```javascript
$file.write("RESULT_OK", "/sdcard/_check.txt");     // 脚本里
```
```powershell
adb -s emulator-5554 shell "cat /sdcard/_check.txt"  # PC 端
```

### 附：一个可直接用的连通性测试脚本

```javascript
let L = [];
L.push("===== AutoGOD ADB 调试连通测试 =====");
L.push("执行时间 : " + new Date().toString());
L.push("分辨率   : " + $device.width + " x " + $device.height);
L.push("型号     : " + $device.model + "  (" + $device.brand + ")");
L.push("Android  : " + $device.release + "  (SDK " + $device.sdkInt + ")");
L.push("电量     : " + $device.getBattery() + "%");
L.push("可用内存 : " + Math.round($device.getAvailMem() / 1048576) + " MB");
L.push("总内存   : " + Math.round($device.getTotalMem() / 1048576) + " MB");
L.push("$file.exists -> " + $file.exists("/sdcard/Download/海岛助手/main.js"));
L.push("===== 测试结束 =====");

for (let i = 0; i < L.length; i++) { log(L[i]); }
$file.write(L.join("\n") + "\n", "/sdcard/adb_demo_log.txt");
toast("AutoGOD 连接成功");
```

### 容易记错的 API（实测踩过）

| 写法 | 结果 |
|---|---|
| `$device.info()` | ❌ 找不到函数 info —— `$device` 是**属性式**的：`$device.width` / `.height` / `.model` / `.brand` / `.release` / `.sdkInt` |
| `$device.getAvailMem()` 当 MB 用 | ❌ 返回的是**字节**，要 `/1048576` 才是 MB |
| `$file.exist(path)` | ❌ 找不到函数 —— 正确是 **`$file.exists(path)`** |
| `currentPackage()` | ❌ 未定义（那是 Auto.js 的 API，AutoGOD 没有） |
| `$app.pkgName` 当属性用 | ❌ 它是**方法**且需要参数：`$app.pkgName("应用名")` 返回包名 |
## 七、截图与模拟操作（真机 UI 调试）

```powershell
# 截图（必须用 cmd 重定向！见下方第 2 条坑）
cmd /c "adb -s emulator-5554 exec-out screencap -p > shot.png"

# 模拟点击 / 长按 / 滑动 / 输入
adb -s emulator-5554 shell input tap 360 640
adb -s emulator-5554 shell input swipe 360 1000 360 400 300
adb -s emulator-5554 shell input text "hello"
```

## 八、踩过的坑（都是实测踩出来的）

1. **`Broadcast completed: result=0` ≠ 执行成功**
   它只说明广播送到了接收器。应用内 ADB 开关没开时输出一模一样，但脚本根本不跑。
   → **必须用「写文件读回」验证**，不要凭这行输出下结论。

2. **截图不能用 PowerShell 的 `>` 重定向**
   `adb exec-out screencap -p > x.png` 在 PowerShell 里会做文本转码，存出来的 PNG 无法打开。
   → 用 `cmd /c "... > x.png"`，或走字节流写入。

3. **连续 `kill-server` 后立刻 `adb devices` 会是空的**
   杀掉 server 后设备重新识别需要 1~3 秒。等一下，或 `adb connect 127.0.0.1:5555`。
   雷电的后台服务也会自行把它的 adb server 重启起来 —— 属正常现象，不用干预。

4. **两套 adb 混用不会冲突**
   `H:\adb\adb.exe`(37.0.0) 与雷电自带(34.0.4) 协议版本都是 `1.0.41`，可以互相接力；
   当前 server 是谁在跑不影响使用。

5. **中文路径没问题**
   `adb push` 与广播的 `--es data` 都能正确处理 `/sdcard/Download/海岛助手/` 这类中文路径（实测通过）。

6. **抓应用日志**
   **别用 logcat 找** —— 优先读 `/sdcard/AutoGod/log/log.log`（AutoGOD 自己的日志文件，见第六节）。
   非要看 logcat 时，脚本的 `log()` 输出在 `AccessibilityManager` 这个 tag 下（不是包名）：
   ```powershell
   adb -s emulator-5554 logcat -c
   adb -s emulator-5554 logcat -d | Select-String "AccessibilityManager"
   ```

## 九、局域网调试（WS）：双向 + **取值回路**（2026-10 实测全通过）

广播是**单向**的 —— 这是它的根本限制：**拿不到 JS 的返回值**。需要双向能力时改用 WebSocket。

协议细节见 `debug/ws.md`，本节只讲「怎么真正跑起来」。

### 9.1 环境事实（本机实测）

| 项目 | 值 |
|---|---|
| 连接地址 | `ws://<设备局域网IP>:15431`（**端口固定 15431**） |
| 协议 | 明文 `ws://`，**无应用层登录、口令、加密** |
| 通信粒度 | 一条命令 = 一个 WebSocket 文本帧；服务端整条 `trim()` |
| 参数分隔符 | `###` |
| **请求 ID** | **没有** —— 异步回包只能按前缀关联，**需要关联回包的命令不要并发** |
| 本机实测设备 | 雷电模拟器 wlan0 IP = `192.168.0.12`，PC 以太网 = `192.168.0.2` |
| 从 PC 可达性 | ✅ `Test-NetConnection 192.168.0.12 -Port 15431` → **True**（ICMP 被挡但 TCP 通） |
| 兜底通路 | ✅ `adb forward tcp:18431 tcp:15431` 后连 `ws://127.0.0.1:18431` 也通 |

取设备 IP：

```powershell
adb -s emulator-5554 shell "ip -4 addr show wlan0"   # 找 inet x.x.x.x
# 或看服务是否在监听：
adb -s emulator-5554 shell "netstat -tlnp | grep 15431"
# 期望：tcp6 0 0 ::ffff:192.168.0.12:15431 :::* LISTEN <pid>/org.auto.god
```

### 9.2 ⭐ 取值回路（本项目实测跑通，这是 WS 最大的价值）

**广播拿不到 JS 返回值，但用「剪贴板中转」可以拿到。**

两步：

```text
runJsCode:setClip(String(你的表达式));#_#_#<上下文路径>     →  无回包
getClip                                                     →  clipContent:<值>
```

**实测验证记录（2026-10，雷电模拟器 Android 9）**：

```
--> runJsCode:console.log('PROBE-MARKER');#_#_#/sdcard/Download/海岛助手
<-- log_v:[开始执行]
<-- log_i:PROBE-MARKER                       ← ① 代码真的执行了  ② console.log 会转发到 WS！
<-- log_v:[执行结束]: 海岛助手

--> runJsCode:setClip('PROBE-CLIP');#_#_#/sdcard/Download/海岛助手
--> getClip
<-- clipContent:PROBE-CLIP                   ← ③ 取值回路成立
<-- log_d:获取剪切板内容:PROBE-CLIP
<-- log_d:注意:从安卓12开始允许设置剪切板为敏感数据，且后台操作剪切板可能受到限制

--> ls:/sdcard/Download/海岛助手
<-- ls:false#false#.git#/sdcard/Download/海岛助手/.git_false#false#modules#..._
<-- log_d:罗列成功
```

**三条原本「文档没承诺、只能实测」的前提，结果全部成立**：

| 前提 | 结果 |
|------|------|
| `LocalWsI.runJsCode` 真的执行代码（不是仓库演示占位） | ✅ **真的执行**（有 `[开始执行]` / `[执行结束]` 且有输出） |
| `console.log` 会转发到 WS 日志流 | ✅ **会转发**，级别是 **`log_i:`**（不是 `log_v:`） |
| `setClip()` 在执行环境可用（Android 12+ 后台写剪贴板可能受限） | ✅ 本机 Android 9 可用；**Android 12+ 设备需自行复验** |

### 9.3 实用的取值写法

```text
# 拿一个字符串表达式的结果
runJsCode:setClip(String(1+2));#_#_#/sdcard/MyProject
getClip                                       → clipContent:3

# 拿 JSON（结构化结果）
runJsCode:setClip(JSON.stringify({a:1}));#_#_#/sdcard/MyProject
getClip                                       → clipContent:{"a":1}
```

拿大量数据的替代路线（不占剪贴板）——**脚本写文件 + `downloadFile`**：

```text
runJsCode:$file.write(String(doWork()), "/sdcard/MyProject/out.txt");#_#_#/sdcard/MyProject
downloadFile:/sdcard/MyProject/out.txt        → downloadFileStart / downloadFile:<Base64> / downloadFileProgress / downloadFileEnd
```

也可以简单点，直接在 PC 上 `adb shell cat /sdcard/MyProject/out.txt`。

### 9.4 日志级别映射（实测）

| 脚本侧写法 | WS 推送的帧 |
|-----------|-------------|
| `console.log("x")` | `log_i:x` |
| `$log.v/i/d/w/e("x")` | `log_v:` / `log_i:` / `log_d:` / `log_w:` / `log_e:` |
| 框架自身的执行边界日志 | `log_v:[开始执行]` / `log_v:[执行结束]: <脚本名>` |

> `[执行结束]:` 后面跟的是**上下文路径的最后一段**。所以 `#_#_#/sdcard/Download/海岛助手` 会显示成 `海岛助手`。

### 9.5 何时仍该用广播

| 场景 | 用哪个 |
|------|--------|
| 跑一个已有的 .js 文件（`runJs`） | 广播（更轻） |
| 设项目路径 / 弹 toast / 停脚本 | 广播 |
| `zip` / `unzip`（**唯一有文件回执的广播指令**） | 广播 + 轮询状态文件 |
| 要**返回值** | **WS + `setClip`/`getClip`** |
| 要文件 CRUD、`ls` 目录列表、截图、读剪贴板 | **WS**（广播完全不实现这些） |
| 要**实时**看日志 | **WS**（日志主动推送，不用反复 `cat`） |

### 9.6 一个重要陷阱

> ⚠️ **`adb broadcast runJs` 启动的脚本实例，行为可能与用户点「运行」启动的实例不同。**
>
> 本项目实测：广播实例里 `$root.exeRootShellSync` 会**永久卡死**、异步回调**不触发**；而用户从客户端「运行」按钮启动的实例**完全正常**。
>
> **推论：不要用广播实例判断某个 API 能不能用** —— 会得出错误结论。要复验请用真机正常启动路径。

（另注：WS 的 `runJsCode` 走的是 `LocalWsI`，与广播的 `runJs` 是两条不同入口，本次实测 `runJsCode` 执行正常。）

---

## 十二、两个「看得见」的通道（2026-11 从官方 IDE 源码扒出来的）

官方桌面端 AutoGod Studio 的调试实现里有两条原生 ADB 通道，比截图+pull、以及盲点坐标都可靠：

### 12.1 结构化读取界面：`uiautomator dump`

**能拿到界面上每个控件的文字和坐标**，用来「按文字点按钮」而不是写死坐标。

```bash
# 1) dump 到设备
adb -s emulator-5554 shell "mkdir -p /sdcard/AutoGod/adb && uiautomator dump /sdcard/AutoGod/adb/ui.xml"
# 2) 直接 cat 回来看（不用 pull，官方也是 cat）
adb -s emulator-5554 shell "cat /sdcard/AutoGod/adb/ui.xml"
# 3) 用完删掉
adb -s emulator-5554 shell "rm -f /sdcard/AutoGod/adb/ui.xml"
```

XML 里每个 `<node>` 的 `text="..."` 和 `bounds="[x1,y1][x2,y2]"`，中心点 = `((x1+x2)/2, (y1+y2)/2)`。

**能看到的**：AutoGOD 自己的界面（`XActivity`）、系统弹窗（截屏授权框、「应用无响应」等）、第三方原生 App。
**看不到的**：Unity / Cocos 画的游戏画面（Boom Beach、多数手游）—— 里面没有安卓控件，**点格子仍然只能靠坐标 + 像素判断**。

实测本项目界面能拿到 28 个文本节点，例如：

| 文字 | 中心坐标 |
|------|---------|
| 自动声纳 | (220, 988) |
| 启动 | (535, 1208) |
| 关闭 | (185, 1208) |
| 更多 | (648, 218) |

→ 于是「点启动脚本」「点允许截屏」这类动作可以用文字定位，不用再猜坐标。

### 12.2 运行前语法校验：`validateJs`

局域网 WS 命令（端口 15431）：

```
validateJs:<入口绝对路径>
→ validateJsRes:<UTF-8 内容的 Base64>
```

**解码后精确等于 `success` 才算通过**（不是包含、不是前缀）。比 push 上去跑到一半才发现语法错要好。

### 12.3 `input text` 的空格要写成 `%s`

```bash
adb shell input text "hello%sworld"   # ✅ 打出来是 "hello world"
adb shell input text "hello world"    # ❌ 空格后面的内容会被截断
```
