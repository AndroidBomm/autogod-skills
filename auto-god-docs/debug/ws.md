## 01.局域网调试协议文档


#01.局域网调试协议文档 

本文档定义了 PC 端（客户端）与 Android 端（服务端）调试服务之间的文本通信协议。通信基于纯文本帧，格式通常为 指令:参数 或 纯指令。

#一、 消息提示功能

#1. 显示 Toast

在 Android 设备上显示一条提示信息。如果应用拥有悬浮窗权限，则显示悬浮窗 Toast，否则显示普通 Toast。

发送格式：toast:提示内容

Java 示例：

webSocket.send("toast:PC端连接成功");

#二、 环境与配置功能

#1. 设置项目路径

设置 Android 端的全局项目工作路径。

发送格式：setProjectPath:绝对路径

Java 示例：

webSocket.send("setProjectPath:/sdcard/MyWorkspace/Project1");

#三、 文件与目录操作功能

#1. 删除文件或目录

请求删除指定的文件或文件夹。

发送格式：del:文件或目录绝对路径

接收格式：删除成功返回 delSuccess，删除失败返回 delFail

Java 示例：

webSocket.send("del:/sdcard/temp.txt");
// 之后监听返回值
// 成功: "delSuccess"
// 失败: "delFail"

#2. 创建文件

在指定路径创建一个空文件。

发送格式：touch:文件绝对路径

接收格式：创建成功返回 touchSuccess，失败返回 touchFail

Java 示例：

webSocket.send("touch:/sdcard/new_file.txt");

#3. 创建文件夹

递归创建目录。

发送格式：mkdir:目录绝对路径

接收格式：创建成功返回 mkdirSuccess，失败返回 mkdirFail

Java 示例：

webSocket.send("mkdir:/sdcard/new_folder/sub_folder");

#4. 文件重命名 (指定新名称)

在原文件所在的目录下修改文件名称。

发送格式：rename:原文件绝对路径###新名称

接收格式：成功返回 renameSuccess，失败返回 renameFail

Java 示例：

webSocket.send("rename:/sdcard/old.txt###new.txt");

#5. 文件移动或重命名 (指定目标路径)

将文件移动或重命名到指定的完整目标路径。

发送格式：renameTo:原文件绝对路径###目标完整路径

接收格式：成功返回 renameToSuccess，失败返回 renameToFail

Java 示例：

webSocket.send("renameTo:/sdcard/old.txt###/sdcard/backup/new.txt");

#6. 罗列目录文件

获取指定目录下的文件和文件夹列表。列表经过了特定规则排序：项目文件夹优先，其次普通目录，最后是文件（按 js、lua、xml、json、png、zip 及其他后缀优先级排序）。

发送格式：ls:目录绝对路径

接收格式：ls:是否是文件#是否是项目#名称#绝对路径_是否是文件#是否是项目#名称#绝对路径_...

Java 示例：

webSocket.send("ls:/sdcard/");
// 接收示例数据解析:
// false#true#MyApp#/sdcard/MyApp_  (代表这是一个项目文件夹)
// true#false#main.js#/sdcard/main.js_ (代表这是一个js文件)

#四、 文件下载功能

注意：下载功能采用流式传输，大文件会分块发送，客户端需监听进度和结束标志。分块大小固定为 1MB。

#1. 下载文件或文件夹

请求 Android 端发送文件。如果指定的是文件夹，Android 端会自动将其压缩为 ZIP 后发送。

发送格式：downloadFile:文件或文件夹绝对路径

接收格式流：

开始标志：downloadFileStart:文件对象toString

数据块：downloadFile:Base64数据块

进度更新：downloadFileProgress:百分比数值 (如 45.50)

结束标志：downloadFileEnd:true (成功) 或 downloadFileEnd:false (失败)

Java 示例：

webSocket.send("downloadFile:/sdcard/config.json");
// 在 onMessage 中处理流式数据
public void onMessage(String message) {
    if (message.startsWith("downloadFileStart:")) {
        // 开始接收，初始化文件流
    } else if (message.startsWith("downloadFile:")) {
        // 解析 Base64 并追加写入文件
        String base64Chunk = message.substring("downloadFile:".length());
        // 写入逻辑...
    } else if (message.startsWith("downloadFileProgress:")) {
        // 更新进度条
        String progress = message.substring("downloadFileProgress:".length());
    } else if (message.equals("downloadFileEnd:true")) {
        // 接收完成，关闭文件流
    } else if (message.equals("downloadFileEnd:false")) {
        // 接收失败
    }
}

#2. 下载项目

请求下载当前配置的项目，传输机制与下载文件完全一致，仅指令前缀不同。

发送格式：downloadProject:项目标识或路径参数

接收格式流：将上述示例中的 downloadFile 替换为 downloadProject 即可。

#五、 截屏与 UI 树获取功能

#1. 获取截屏

获取当前 Android 屏幕的截图，以 Base64 编码返回。

发送格式：captureScreen

接收格式：screenShot:Base64图片数据

Java 示例：

webSocket.send("captureScreen");
// 接收后解码
// String base64 = message.substring("screenShot:".length());
// byte[] imageBytes = Base64.getDecoder().decode(base64);

#2. 获取截屏与节点信息

同时获取截图及 UI 控件节点信息。服务端优先获取 JSON 格式的节点信息，如果没有则获取 XML 格式。只有成功获取截屏后才会去获取节点信息。

发送格式：screenAndNodeInfo

接收格式：

带JSON节点：screenAndNodeInfo:Base64图片##JSON##JSON节点数据

带XML节点：screenAndNodeInfo:Base64图片##XML##XML节点数据

Java 示例：

webSocket.send("screenAndNodeInfo");
String data = message.substring("screenAndNodeInfo:".length());
if (data.contains("##JSON##")) {
    String[] parts = data.split("##JSON##");
    String imageBase64 = parts[0];
    String nodeJson = parts[1];
    // 处理图片和JSON...
} else if (data.contains("##XML##")) {
    String[] parts = data.split("##XML##");
    String imageBase64 = parts[0];
    String nodeXml = parts[1];
    // 处理图片和XML...
}

#六、 脚本执行控制功能

#1. 运行指定路径的 JS 脚本

运行 Android 端指定路径下的 JS 文件。

发送格式：runJs:脚本绝对路径

Java 示例：

webSocket.send("runJs:/sdcard/Project1/main.js");

#2. 运行 JS 代码片段

直接发送代码字符串执行，并指定运行时的上下文路径。

发送格式：runJsCode:JS代码内容###上下文路径

Java 示例：

String jsCode = "let app = getApp(); console.log(app.getVersion());";
String contextPath = "/sdcard/Project1";
webSocket.send("runJsCode:" + jsCode + "###" + contextPath);

#3. 停止运行 JS

终止当前正在运行的 JavaScript 脚本。

发送格式：stopJs

Java 示例：

webSocket.send("stopJs");

#七、 剪贴板操作功能

注意：从安卓 12 开始允许设置剪切板为敏感数据，且后台操作剪切板可能受到系统限制。

#1. 获取剪切板内容

读取 Android 设备当前的剪贴板文本。

发送格式：getClip

接收格式：clipContent:剪贴板文本内容

Java 示例：

webSocket.send("getClip");
// String clipText = message.substring("clipContent:".length());

#2. 设置剪切板内容

向 Android 设备的剪贴板写入文本。

发送格式：setClip:要复制的文本内容

Java 示例：

webSocket.send("setClip:这是从PC端复制的配置代码");

#八、 文件上传功能

注意：上传文件时，请将文件进行 Base64 编码后分块发送，避免单帧数据过大导致内存溢出。服务端接收到数据后会以追加模式写入文件。

#1. 开始上传文件 (初始化)

通知 Android 端准备接收文件，服务端会自动创建父目录，如果存在同名文件则会将其删除。

发送格式：uploadFileStart:目标保存绝对路径

Java 示例：

webSocket.send("uploadFileStart:/sdcard/upload/target.apk");

#2. 传输文件数据块

发送文件的 Base64 编码分块数据。

发送格式：uploadFile:目标保存绝对路径###Base64数据块

Java 示例：

String filePath = "/sdcard/upload/target.apk";
FileInputStream fis = new FileInputStream("local_file.apk");
byte[] buffer = new byte[1024 * 512]; // 建议 512KB 或 1MB 分块
int bytesRead;
while ((bytesRead = fis.read(buffer)) != -1) {
    String base64Chunk = Base64.getEncoder().encodeToString(Arrays.copyOf(buffer, bytesRead));
    webSocket.send("uploadFile:" + filePath + "###" + base64Chunk);
    Thread.sleep(50); // 稍作延迟，防止将 Android 端缓冲区打满
}
fis.close();

#九、 项目上传功能

项目上传采用先传 ZIP 包，再由 Android 端自动解压的机制。

#1. 开始上传项目 (初始化)

通知 Android 端准备接收项目的 ZIP 压缩包，服务端会创建父目录并删除旧的同名 ZIP 文件。

发送格式：uploadProjectStart:ZIP包临时存储绝对路径.zip

Java 示例：

webSocket.send("uploadProjectStart:/sdcard/temp/project.zip");

#2. 传输项目 ZIP 数据块

发送项目 ZIP 包的 Base64 编码分块数据。

发送格式：uploadProject:ZIP包临时存储绝对路径.zip###Base64数据块

Java 示例：

String zipPath = "/sdcard/temp/project.zip";
// 分块读取并发送逻辑与“传输文件数据块”完全一致
String base64Chunk = Base64.getEncoder().encodeToString(zipChunkBytes);
webSocket.send("uploadProject:" + zipPath + "###" + base64Chunk);

#3. 结束上传项目 (触发解压)

通知 Android 端项目 ZIP 包已发送完毕。Android 端会等待文件就绪，执行解压，删除临时 ZIP 文件，并返回准备就绪信号。

发送格式：uploadProjectEnd:成功状态###ZIP包临时存储绝对路径.zip

接收格式：preparedRunCode

Java 示例：

String zipPath = "/sdcard/temp/project.zip";
webSocket.send("uploadProjectEnd:true###" + zipPath);
// 等待服务端解压完成
// 收到 "preparedRunCode" 后，即可安全地发送 runJs 指令让 Android 端执行项目代码

#十、 服务端主动推送日志功能

服务端在执行各项操作时，会主动向客户端推送不同级别的日志信息，便于 PC 端在控制台展示。

推送格式：

详细日志：log_v:日志内容

信息日志：log_i:日志内容

调试日志：log_d:日志内容

警告日志：log_w:日志内容

错误日志：log_e:日志内容

Java 示例：

public void onMessage(String message) {
    if (message.startsWith("log_e:")) {
        // 提取错误信息并在 PC 端控制台标红显示
        String errLog = message.substring("log_e:".length());
        System.err.println("[Android Error] " + errLog);
    } else if (message.startsWith("log_i:")) {
        String infoLog = message.substring("log_i:".length());
        System.out.println("[Android Info] " + infoLog);
    }
    // 其他级别同理处理...
}

#十一、远程调试

如果使用的是远程调试，则需要在传输指令之前添加标识和对方设备号码。

在远程调试中，PC端和Android移动端都属于客户端，远程服务器需要部署在自己的服务器中。

#1.PC端给移动端发指令

pc2phone#移动端号码#指令
例如:
pc2phone#15224789963#toast:PC端链接成功

#2.移动端给PC端发指令

phone2pc#PC端号码#指令
例如:
phone2pc#25638985465#toast:移动端端链接成功

其他的所有指令都是按照这个格式。


---

# 附录：实现级要点与踩坑（本机实测补充，不是官方原文）

> 上面 11 章是官方协议原文。下面是照着**实际实现 + 真机实测**补的落地要点 —— 官方文档里没有、但接的时候一定会踩。
> 动手前先读 `debug/adb-setup.md` 第九节〈局域网调试（WS）：双向 + 取值回路〉，那里有可运行的完整示例和实测记录。

## A. 连接与端口（官方文档没写）

| 项目 | 值 |
|---|---|
| 端口 | **固定 15431**（`ws://<设备局域网IP>:15431`） |
| 鉴权 | **没有** —— 无应用层登录、无口令、无加密（明文 `ws://`） |
| 本机实测 | 设备 `192.168.0.12:15431` LISTEN，PC `192.168.0.2` 可连（`Test-NetConnection` → True） |
| 兜底 | `adb forward tcp:18431 tcp:15431` → `ws://127.0.0.1:18431` |

## B. ⚠️ 没有请求 ID —— 这是最容易踩的坑

**协议里没有请求 ID。** 异步回包只能**按前缀关联**。

- 需要关联回包的命令（`ls` / `del` / `mkdir` / `rename` / `touch` / `getClip`…）**不要并发发送**，一条一条来。
- 日志推送（`log_*`）是**非请求回包**，随时可能插进来，解析时要先跳过所有 `log_*` 帧再匹配业务回包。
- 实测：一次连接里先发 `runJsCode`、再发 `getClip`、再发 `ls`，各回包都能靠前缀区分；但如果没有前缀匹配逻辑，就会被日志帧干扰。

## C. ⚠️ `###` 是保留分隔符，且没有通用转义

参数分隔符是 `###`。**路径里如果含 `###` 会让 `zip` / `unzip` / `rename` / `renameTo` / `upload*` 全部错位。**

只有 `ls` 的返回字段做了 percent-encoding（见下），**命令参数本身没有转义机制** —— 路径里不要出现 `###`。

## D. `ls` 的 percent-encoding 规则（实现级，官方原文没写）

`ls` 每条记录以 `_` 结尾，字段用 `#` 分隔。名称与路径按顺序转义：

| 原字符 | 转义后 |
|---|---|
| `%` | `%25` |
| `#` | `%23` |
| `_` | `%5F` |
| `+` | `%2B` |

> ⚠️ 客户端各做**一次** UTF-8 percent-decoding：
> - **不要**用会把 `+` 转成空格的表单解码器（`+` 在这里就是字面加号）
> - **不要**重复解码

项目判定：条目下存在 `project.json` 即为项目；`Pictures` 强制非项目。

## E. `runJsCode` 的真实格式与实测结论

**格式**：`runJsCode:<代码>#_#_#<上下文路径>`

> 注意：本文档第三章（官方原文）里写的是 `runJsCode:JS代码内容###上下文路径`（`###`），**实测以 `#_#_#` 为准**（实现里兼容旧的 `###`）。

**实测（2026-10，雷电模拟器）**：

```text
--> runJsCode:console.log('PROBE-MARKER');#_#_#/sdcard/Download/海岛助手
<-- log_v:[开始执行]
<-- log_i:PROBE-MARKER
<-- log_v:[执行结束]: 海岛助手
```

结论：
1. ✅ **`runJsCode` 真的执行代码**（不是仓库演示占位）
2. ✅ **脚本的 `console.log` 会转发到 WS 日志流**，级别是 **`log_i:`**
3. ✅ 上下文路径的**最后一段**会出现在 `[执行结束]:` 后面（上例显示 `海岛助手`）

⚠️ 尽管如此，**`runJsCode` 本身仍没有执行结果回包** —— 要拿返回值必须用下面的「剪贴板回路」。

## F. ⭐ 拿 JS 返回值的唯一实用办法

```text
runJsCode:setClip(String(你的表达式));#_#_#<上下文路径>     →  无回包
getClip                                                     →  clipContent:<值>
```

**实测通过**：`runJsCode:setClip('PROBE-CLIP');#_#_#/sdcard/Download/海岛助手` + `getClip` → `clipContent:PROBE-CLIP`。

大量数据走文件（不占剪贴板）：

```text
runJsCode:$file.write(String(结果), "/sdcard/MyProject/out.txt");#_#_#/sdcard/MyProject
downloadFile:/sdcard/MyProject/out.txt       # 四段流
# 或者直接在 PC 上 adb shell cat /sdcard/MyProject/out.txt
```

## G. 日志级别映射（实测）

| 脚本侧 | WS 推送 |
|---|---|
| `console.log("x")` | `log_i:x` |
| `$log.v/i/d/w/e("x")` | `log_v:` / `log_i:` / `log_d:` / `log_w:` / `log_e:` |
| 框架执行边界 | `log_v:[开始执行]` / `log_v:[执行结束]: <上下文路径末段>` |

## H. 本地调试能做、远程调试不能做的

| 命令 | 局域网 WS | 远程 WS |
|---|---|---|
| `dumpNodeInfo` | ❌ 未实现 | ✅ 独有 |
| 业务回包外层封装 | 直接就是 `xxxSuccess` | 需带 `phone2pc#号码#` 前缀 |

⚠️ **远程路由陷阱**（官方原文没写）：`RemoteWsClient` 收到消息后**直接按内部命令前缀解析，不解析 `pc2phone#...#` 外层封装**。中继若把完整外层字符串原样转发给手机，该消息**匹配不上任何命令**。中继必须先把 `pc2phone#号码#` 外层剥掉再转发。

## I. ADB 广播 vs WS 的能力边界

| 能力 | ADB 广播 | 局域网 WS |
|---|---|---|
| 跑已有 .js 文件 | `runJs` | `runJs` |
| 跑代码片段 | ❌ | `runJsCode` |
| 文件 CRUD / `ls` / 截图 / 节点 / 剪贴板 | ❌ **完全不实现** | ✅ |
| `zip` / `unzip` | ✅（**唯一有文件回执**的广播指令） | ❌ 不能调用 |
| `clearLog` / `clearAdbFile` | ✅ | ❌ 不能调用 |
| 实时日志 | ❌（要反复 `cat`） | ✅ 主动推送 |
| 业务回包 | ❌ 只有 zip/unzip 的文件回执 | ✅ |

**选型**：只要能开 WS 就用 WS；广播只用于「跑脚本 / 设路径 / toast / 停脚本 / 压缩解压」这些没有返回值诉求的场景。

## J. ⚠️ 不要拿广播实例的行为判断 API 可用性

本项目实测：**`adb broadcast runJs` 启动的脚本实例是「残废」的** —— `$root.exeRootShellSync` 会永久卡死、异步 `$root.exeRootShell` 回调不触发；而用户从客户端点「运行」启动的实例**完全正常**。

> 推论：用广播实例去试某个 API「能不能用」会得出错误结论。要复验请走真机正常启动路径。
> （另注：WS 的 `runJsCode` 走 `LocalWsI`，与广播的 `runJs` 是两条不同入口。本次实测 `runJsCode` 执行正常，未复验 `$root` 系列。）

