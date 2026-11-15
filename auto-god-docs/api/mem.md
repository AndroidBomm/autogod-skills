# $mem - 内存读写库

- 更新时间:2026-10-08 18:42:49
- 版本 : 2.0.3

内存读写库。可以把它理解成一个「遥控器」：先用 `init(pid, mode)` 连上目标进程，连上之后才能做读取、写入、扫描、打补丁、转储这些事。

操作**自己所在的进程不需要 Root**；操作**别的 App 的进程需要 Root 或 ptrace 权限**，否则连接直接失败。

---

## ⚠️ 三条硬规则（先看这里，再看方法表）

### 1. 所有方法返回的都是 **JSON 字符串**

第一件事就是 `JSON.parse()` 后看 `ok` 字段：

- `ok: true` → 结果数据在同级的其它字段里（`hex` / `bytes` / `addresses` / `handle` ...）
- `ok: false` → 失败原因在 `error` 字段里
- **没连接进程就调读写类方法** → `{"ok":false,"error":"尚未连接进程"}`

```javascript
let r = JSON.parse($mem.read(0x7f00000000L, 16, true));
if (!r.ok) { $log.e("mem: " + r.error); return; }
// r.hex 才是数据
```

### 2. 地址字面量**必须带 `L` 后缀**

AutoGOD 的 JS 引擎里，超过 `int` 范围的地址必须写成 long 字面量：

```javascript
$mem.read(0x7f00000000L, 16, true);   // ✅ 正确
$mem.read(0x7f00000000, 16, true);    // ❌ 会失败，甚至把目标进程搞崩
```

**常见错误**：从别处（调试器、反汇编工具）拷贝了**十进制**地址直接用 —— 同样会失败甚至崩溃。务必确认是十六进制且带 `L`。

### 3. 补丁 / 备份 / ptrace **必须在 `finally` 里恢复**

`createPatch` / `createBackup` / `trace(true)` 都是**改变目标进程状态**的操作。不恢复的后果：

- 补丁没还原 → 目标进程一直运行被改过的代码
- ptrace 没分离 → 目标进程**被永久挂住**（表现是卡死、无响应）
- 句柄没释放 → 底层 C++ 里的句柄泄漏

**标准写法**（照抄这个骨架）：

```javascript
let handle = 0;
let attached = false;
try {
    // 1. 连接
    let init = JSON.parse($mem.init(pid, $mem.syscall));
    if (!init.ok) { $log.e("连接失败: " + init.error); return; }

    // 2. 确认地址权限（保险丝，能避免大量崩溃）
    let pt = JSON.parse($mem.checkPointer(addr, 8));
    if (!pt.ok || !pt.writable) { $log.e("地址不可写"); return; }

    // 3. 备份 → 打补丁
    let bak = JSON.parse($mem.createBackup(addr, 8));
    handle = bak.ok ? bak.handle : 0;

    let pat = JSON.parse($mem.createPatch(addr, "90 90", $mem.x86_64, false));
    if (!pat.ok) { $log.e("打补丁失败: " + pat.error); return; }

    // 4. 做你要验证的事 ...

} finally {
    // 5. 无论如何都要恢复
    if (handle) $mem.restorePatch(handle);
    if (attached) $mem.trace(false);
}
```

> 注意：`createBackup` / `createPatch` 的句柄保存在**底层 C++ 里**，进程被杀或**重新 `init()` 都会失效** —— 重新连接前把旧句柄丢掉。

---

## 常量

### const {int} syscall

内存读写方式一：**系统调用**。走 `process_vm_readv` / `process_vm_writev` 这两个内核接口，速度快、开销小，**不需要 Root 也能用**；但部分厂商内核把它关掉了，这时改用 `$mem.proc`。

```javascript
let json = $mem.init(pid, $mem.syscall);
```

### const {int} proc

内存读写方式二：**/proc 内存文件**。走 `/proc/<目标PID>/mem` 读写，**兼容性最好**，几乎所有内核都支持；缺点是需要 Root 或足够权限，而且比系统调用方式慢一些。

```javascript
let json = $mem.init(pid, $mem.proc);
```

### const {int} arm32 / arm64 / x86 / x86_64

处理器架构常量，**只有 `createPatch(..., architecture, ...)` 写汇编补丁时才用到**：

| 常量 | 架构 | 场景 |
|------|------|------|
| `$mem.arm32` | 32 位 ARM（armeabi-v7a） | 老设备 |
| `$mem.arm64` | 64 位 ARM（arm64-v8a） | **现在绝大多数手机** |
| `$mem.x86` | 32 位 x86 | 老式模拟器、部分 x86 平板 |
| `$mem.x86_64` | 64 位 x86 | **电脑上的安卓模拟器多数是这个** |

---

## 环境检测（不需 init，随时可调）

### isSoLoad()

原生库是否已加载成功。**排查问题的第一步**：只有它为 `true`，后面的读写能力才谈得上。

- 返回 : {boolean} true 表示原生库已加载成功；false 表示加载失败
- 版本 : 2.0.3

```javascript
if (!$mem.isSoLoad()) {
    // 立刻拿失败原因：常见是 APK 里打进了不匹配的 ABI，或设备架构不在支持范围内
    $log.e("原生库加载失败：" + $mem.getLoadError());
    return;
}
```

### getLoadError()

原生库加载失败的原因。与 `isSoLoad()` 配套：加载成功时返回 `null`，失败时返回具体说明（找不到文件、ABI 不匹配、依赖缺失等）。

- 返回 : {string} 加载失败的原因说明；加载成功时为 null
- 版本 : 2.0.3

```javascript
let reason = $mem.getLoadError();
if (reason != null) { $log.e("原生库加载失败：" + reason); }
```

### info()

获取运行环境信息（**跑通环境的第一个检查项**）。返回 ABI、系统 SDK 版本、自身进程号、用户 ID、是否 Root 等。出问题时先把这份数据发出去，能快速判断是「环境不支持」还是「权限不够」。

- 返回 : {string} JSON 字符串，形如 `{"ok":true,"abi":"arm64-v8a","sdk":33,"pid":1234,"uid":10123,"root":false,"keystone":true,"library":"_mem"}`
- 版本 : 2.0.3

```javascript
let info = JSON.parse($mem.info());
// info.abi / info.sdk / info.pid / info.root / info.keystone
```

> `keystone: true` 表示汇编翻译可用 —— `createPatch(..., assembly=true)` 依赖它。

### selfTest()

**判断这台设备能不能用的最快方式**。会在自己进程里真刀真枪跑一遍：两种内存方式、读写、备份、补丁、扫描、ELF、指针校验、汇编。哪一项是 `false`，就说明这项能力在当前设备上不可用。

- 返回 : {string} JSON 字符串，形如 `{"ok":true,"syscall":true,"procMem":true,"readWrite":true,"backup":true,"patchRestore":true,"patternScan":true,"elfScan":true,"pointerValidation":true,"keystoneAssembly":true}`
- 版本 : 2.0.3

```javascript
let r = JSON.parse($mem.selfTest());
// false 的字段就是那一关没过：syscall / procMem / readWrite / backup /
// patchRestore / patternScan / elfScan / pointerValidation / keystoneAssembly
```

### checkPointer(address, length)

检查地址的**读写执行权限**（动手之前的保险丝）。写入、打补丁之前先查一次，能避免大量把目标进程搞崩的情况。

- 参数 : address {long} 要检查的起始地址（**带 L 后缀**）
- 参数 : length {int} 要检查的字节长度
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"readable":true,"writable":false,"executable":true}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> 结果只代表「检查的那一刻」——内存权限随时可能被目标进程自己改掉。

```javascript
let pt = JSON.parse($mem.checkPointer(0x7f00000000L, 8));
if (pt.writable) { /* 可以安全写入 */ }
```

### decodeArmCmd(instruction, address, arm64)

**反汇编一条 ARM 指令**。把 4 个字节的指令字翻译成人能读懂的汇编语句，只翻译传进来的这 4 个字节，不会去读目标进程内存，所以**不需要先连接进程**。

- 参数 : instruction {int} 4 个字节的指令机器码，例如 `0xd2800001`
- 参数 : address {long} 这条指令所在的地址，只影响显示出来的跳转目标和相对地址
- 参数 : arm64 {boolean} true 按 64 位 ARM 解析；false 按 32 位 ARM 解析
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"instruction":"mov x1, #0x1"}`
- 版本 : 2.0.3

```javascript
let r = JSON.parse($mem.decodeArmCmd(0xd2800001, 0x7f00000000L, true));
// r.instruction === "mov x1, #0x1"
```

---

## 进程与结构（需先 init）

### lsProc()

列出可见进程（**找目标 PID 用**）。扫描 `/proc`，把当前权限范围内能看到的进程号和进程名都列出来。

- 返回 : {string} JSON 字符串，形如 `{"ok":true,"processes":[{"pid":1234,"name":"com.xxx"}]}`；失败形如 `{"ok":false,"error":"无法读取 /proc"}`
- 版本 : 2.0.3

> 安卓 8.0 以后很多进程名已经读不到了 —— **看不到不代表进程不存在**。

```javascript
let r = JSON.parse($mem.lsProc());
// r.processes 里找目标进程的 pid
```

### init(pid, mode)

**连接目标进程（所有内存操作的第一步）**。连上之后，后续所有读写、扫描、补丁都针对这个进程。

- 参数 : pid {int} 目标进程号，可从 `lsProc()` 拿；**传错会直接连接失败**
- 参数 : mode {int} 读写方式，填 `$mem.syscall` 或 `$mem.proc`；**填其它值按系统调用处理**
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"pid":1234,"name":"目标进程名"}`；失败形如 `{"ok":false,"error":"初始化失败，请确认目标进程存在且当前进程有访问权限"}`
- 版本 : 2.0.3

> ⚠️ **重复调用会先清空旧的补丁和备份句柄** —— 重新连接前请把之前保存的句柄全部丢掉（最好先 `restorePatch` / `restoreBackup`）。

> ⚠️ 连接自己的进程一般能成功；连接别人的进程需要 Root 或 ptrace 权限。失败时检查：SELinux 策略、Root 授权、目标进程是否还活着。

```javascript
// 绝大多数情况先用系统调用方式
let json = $mem.init(pid, $mem.syscall);
// 连不上再换成 /proc/<pid>/mem 方式试一次
let json2 = $mem.init(pid, $mem.proc);
```

### lsMap(filter)

列出目标进程的**内存映射**（找可读范围用）。映射就是进程把文件、堆、栈、动态库「贴」到自己地址空间的每一块 —— 只有落在可读映射里的地址才能读，只有可写映射里的才能写。

- 参数 : filter {string} 路径过滤关键字；**填 `null` 或空串表示全部列出**，只保留路径里包含该关键字的映射
- 返回 : {string} JSON 字符串，形如 `{"ok":true,"total":120,"maps":[{"start":"0x7f0000","end":"0x7f1000","size":4096,"perms":"r-xp","path":"/system/lib64/libc.so"}]}`；未连接时形如 `{"ok":false,"error":"尚未连接进程"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let all = JSON.parse($mem.lsMap(""));                 // 全部映射，重点看 perms 有没有 r / w
let one = JSON.parse($mem.lsMap("lib_mem.so"));       // 只看某个动态库
```

### lsElf()

列出目标进程**已加载的 ELF 文件**（找动态库基址用）。ELF 就是 `.so` 动态库的格式，这里列出所有动态库的起始地址、结束地址、大小和完整路径 —— 拿到基址加上符号偏移，就能定位到具体函数或变量。

- 返回 : {string} JSON 字符串，形如 `{"ok":true,"count":50,"elfs":[{"base":"0x7f0000","end":"0x7f8000","size":32768,"path":"/system/lib64/libc.so"}]}`；未连接时形如 `{"ok":false,"error":"尚未连接进程"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let r = JSON.parse($mem.lsElf());
```

### lsThread()

列出目标进程的**线程号**。返回的线程 ID 正是 `watchMem(threadId, ...)` 需要的第一个参数。

- 返回 : {string} JSON 字符串，形如 `{"ok":true,"threads":[1234,1235,1236]}`；未连接时形如 `{"ok":false,"error":"尚未连接进程"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let r = JSON.parse($mem.lsThread());
let tid = r.threads[0];
```

### lsSoInfo(nativeBridge)

列出**链接器的 soinfo 记录**（看隐藏的加载清单）。soinfo 是安卓加载器为每一个动态库建立的内部档案 —— 里面能查到在 `lsMap()` 里被隐藏或改过名字的动态库。

- 参数 : nativeBridge {boolean} true 列出 NativeBridge（指令集兼容层）的清单；false 列出系统加载器 linker 的清单
- 返回 : {string} JSON 字符串，形如 `{"ok":true,"count":50,"soinfo":[{"pointer":"0x7f0000","base":"0x7f1000","size":8192,"path":"/system/lib64/libc.so"}]}`；未连接时形如 `{"ok":false,"error":"尚未连接进程"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let normal = $mem.lsSoInfo(false);
let bridge = $mem.lsSoInfo(true);   // 走 NativeBridge（兼容别的指令集）时传 true
```

---

## 读写

### read(address, length, skipInaccessiblePages)

**按字节读取内存**（最常用的读取方法）。结果以两位十六进制、空格分隔的形式返回。

- 参数 : address {long} 起始地址，必须是目标进程里的有效虚拟地址；**写完记得加 `L` 后缀**
- 参数 : length {int} 要读取的字节数，**范围 1 到 1048576（1 MiB）**，超过会直接失败
- 参数 : skipInaccessiblePages {boolean} true 跳过不可读的内存页（能读完大范围里读不到的地方）；false 遇到不可读页就返回已读到的部分
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"bytes":16,"hex":"7f 45 4c 46"}`；失败形如 `{"ok":false,"error":"地址或长度无效（最大 1 MiB）"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let r = JSON.parse($mem.read(0x7f00000000L, 16, true));
// r.hex === "7f 45 4c 46 02 01 01 00"
```

### write(address, hex)

**按 HEX 写入内存**（改数值、改标志位用）。传入十六进制文本，被转成字节写入目标地址。

- 参数 : address {long} 要写入的目标地址，必须是**可写**的虚拟地址
- 参数 : hex {string} 十六进制数据，**长度必须偶数位**，支持空格分隔，例如 `"90 90"` 或 `"9090"`
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"bytes":4}`；失败形如 `{"ok":false,"error":"地址或十六进制数据无效"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> 写入前建议先 `checkPointer()` 确认可写，并且先 `createBackup()` 备份原始数据 —— 写错了还能还原。

```javascript
let json = $mem.write(0x7f00000000L, "01 02 03 04");
```

### readStr(address, maxLength)

**按 UTF-8 读取字符串**（读文本用）。从目标地址开始读，一直读到结尾的 0 字节或达到最大长度。

- 参数 : address {long} 字符串的起始地址
- 参数 : maxLength {int} 最多读取的字节数，范围 1 到 1048576；达到上限还没遇到结尾就截断
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"value":"Hello","bytes":5}`；失败形如 `{"ok":false,"error":"地址或最大长度无效"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> 只适合读文本；**读二进制数据请一律用 `read()`**。

```javascript
let r = JSON.parse($mem.readStr(0x7f00000000L, 64));
// r.value === "Hello"
```

### writeStr(address, value)

**按 UTF-8 写入字符串**（改文本内容用）。

- 参数 : address {long} 要写入的目标地址，必须可写，**并且要预留出额外的 1 个字节**
- 参数 : value {string} 要写入的文本内容，按 UTF-8 编码写入
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"bytes":6}`；失败形如 `{"ok":false,"error":"字符串写入失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> ⚠️ 写入时会**自动在末尾补一个 0** 作为字符串结尾 —— 目标位置必须比字符串本身**多留 1 个字节**，否则会踩到后面的数据，**导致目标进程崩溃**。

```javascript
// 写 5 个字符，加上自动补的结尾，一共占用 6 个字节
let json = $mem.writeStr(0x7f00000000L, "Hello");
```

---

## 搜索与补丁

### scanPattern(start, end, idaPattern, resultLimit)

**按特征码扫描内存**（定位代码或数据用）。所谓 IDA 特征码就是用十六进制描述一段规律字节，其中 `??` 代表「这一位是什么都行」—— 适合在版本更新后**重新定位**一段代码或数据。

- 参数 : start {long} 扫描起始地址，**必须大于 0**
- 参数 : end {long} 扫描结束地址，**必须大于起始地址**
- 参数 : idaPattern {string} IDA 风格特征码，十六进制字节之间用空格隔开，`??` 表示通配该字节
- 参数 : resultLimit {int} 最多返回多少个结果地址，**不足 1 时按 1 处理**
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"count":2,"addresses":["0x7f00001000"]}`；失败形如 `{"ok":false,"error":"扫描范围无效"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> 扫描范围请从 `lsMap()` 里取 —— **范围越大越慢**。

```javascript
let r = JSON.parse($mem.scanPattern(0x7f00000000L, 0x7f01000000L, "7F 45 4C 46", 200));
// 中间几位不确定的写法
let r2 = $mem.scanPattern(0x7f00000000L, 0x7f01000000L, "7F ?? ?? 46", 200);
```

### createPatch(address, code, architecture, assembly)

**创建并立即生效补丁**（改逻辑指令用）。补丁就是把目标地址的那几个字节替换掉。

- 参数 : address {long} 要打补丁的指令地址，通常是代码段里一条指令的开始处
- 参数 : code {string} 补丁内容；`assembly` 为 true 时写**汇编语句**（多条用分号隔开），为 false 时写 **HEX**
- 参数 : architecture {int} 目标架构，填 `$mem.arm32` / `arm64` / `x86` / `x86_64`
- 参数 : assembly {boolean} true 表示把 code 当汇编处理（由 **Keystone** 现翻成机器码）；false 表示把 code 当 HEX 处理
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"handle":1,"original":"48 89","current":"90 90"}`；失败形如 `{"ok":false,"error":"补丁创建失败；IO 内存访问权限不足或输入无效"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> ⚠️ **成功后一定要记下返回的 `handle`，并在用完后调用 `restorePatch(handle)` 还原**，建议写在 `finally` 里 —— 否则目标进程会一直运行被改过的代码。

```javascript
// 方式一：直接按机器码打补丁（90 是 x86 的 nop 空指令）
let hexPatch = $mem.createPatch(0x7f00000000L, "90 90", $mem.x86_64, false);
// 方式二：写汇编语句，由底层自动翻译，可读性更好
let asmPatch = $mem.createPatch(0x7f00000000L, "mov eax, 1; ret", $mem.x86_64, true);
```

### restorePatch(handle)

**还原并释放补丁句柄**（务必成对调用）。把 `createPatch()` 改掉的字节写回原样，并释放句柄。

- 参数 : handle {long} 补丁句柄，来自 `createPatch()` 返回值里的 `handle` 字段
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"补丁句柄不存在"}` 或 `{"ok":false,"error":"恢复补丁失败"}`
- 版本 : 2.0.3

> 同一个句柄**重复恢复会失败**，因为还原成功后句柄就被删掉了。**强烈建议放在 `finally` 里**。

```javascript
try {
    $mem.createPatch(address, "90", $mem.x86_64, false);
} finally {
    $mem.restorePatch(handle);
}
```

### createBackup(address, length)

**备份一段原始内存**（动手改之前先留后路）。只抄下原始字节，**不会改动目标内存**，非常安全。

- 参数 : address {long} 要备份的起始地址
- 参数 : length {int} 要备份的字节数
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"handle":2,"original":"48 89 65 f8"}`；失败形如 `{"ok":false,"error":"备份创建失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> 句柄保存在底层 C++ 里，**进程被杀或者重新 `init()` 都会失效**。

```javascript
let r = JSON.parse($mem.createBackup(0x7f00000000L, 8));
```

### restoreBackup(handle)

**用备份还原内存并释放句柄**。

- 参数 : handle {long} 备份句柄，来自 `createBackup()` 返回值里的 `handle` 字段
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"备份句柄不存在"}` 或 `{"ok":false,"error":"恢复备份失败"}`
- 版本 : 2.0.3

```javascript
let json = $mem.restoreBackup(handle);
```

---

## 符号与调用

### findSymbol(elfName, symbolName)

**查找动态符号地址**（调用函数前的必经一步）。在指定动态库里查找**导出符号**的地址，拿到地址后才能在 `remoteCall()` 里调用它。

- 参数 : elfName {string} 动态库文件名，例如 `"libc.so"`、`"lib_mem.so"`，**支持路径片段**
- 参数 : symbolName {string} 要查找的动态符号名，例如 `"open"`、`"JNI_OnLoad"`
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"address":"0x7f12345000"}`；失败形如 `{"ok":false,"error":"未找到 ELF"}` 或 `{"ok":false,"error":"未找到符号"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> `elfName` 用 `lsElf()` 里列出来的文件名；**符号必须在导出表里才找得到**。

```javascript
let r = JSON.parse($mem.findSymbol("libc.so", "open"));
```

### remoteCall(functionAddress, arguments)

**在目标进程里调用函数**（让目标替你干活）。函数地址一般先用 `findSymbol()` 查出来。

- 参数 : functionAddress {long} 要调用的函数地址，通常来自 `findSymbol()`
- 参数 : arguments {long[]} 参数数组，**最多取前 6 个元素**；没有参数时传空数组
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"result":"0x7f12346000"}`；失败形如 `{"ok":false,"error":"远程函数调用失败"}`
- 版本 : 2.0.3
- 前提 : **必须先 `trace(true)` 附加成功**
- 危险 : 调用约定、参数个数弄错**大概率会把目标进程搞崩**，务必先小范围验证

```javascript
let args = [handle, bufAddr, len];
let r = JSON.parse($mem.remoteCall(0x7f12345000L, args));
// r.result 是函数返回值
```

### remoteSyscall(syscallNumber, arguments)

**在目标进程里执行系统调用**。绕过 Java 层，直接让目标执行一条原生 syscall。

- 参数 : syscallNumber {long} 系统调用号，**必须符合目标进程所在 CPU 架构的编号表**，用**十进制**（不需要写 `0x`）
- 参数 : arguments {long[]} 参数数组，**最多取前 6 个元素**；没有参数时传空数组
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"result":"0x0"}`；失败形如 `{"ok":false,"error":"远程系统调用失败"}`
- 版本 : 2.0.3
- 前提 : **必须先 `trace(true)` 附加成功**
- 危险 : 调用号和参数个数必须和 CPU 架构、ABI 完全对得上，**填错会直接搞崩目标进程**

```javascript
let nums = [1, 2, 3];
let r = JSON.parse($mem.remoteSyscall(63, nums));   // 63 是 x86_64 的 read
```

---

## ptrace 与断点

### trace(attach)

**ptrace 附加或分离**（远程调用和单步的前置动作）。只有附加成功之后，才能做 `traceControl()` 单步、`remoteCall()` 远程调用等高级操作。

- 参数 : attach {boolean} true 附加到目标进程；false 从目标进程分离
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"attached":true}`；失败形如 `{"ok":false,"error":"ptrace attach 失败"}` 或 `{"ok":false,"error":"ptrace detach 失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

> ⚠️ **用完一定要传 `false` 分离，否则目标进程会一直被挂住。**

```javascript
let attached = $mem.trace(true);
// ... 做事 ...
// 建议写在 finally 里保证一定执行
let detached = $mem.trace(false);
```

### traceControl(operation, value)

**执行 ptrace 控制操作**（调试目标进程的总开关）。这一个方法集成了附加、抢占附加、分离、暂停、继续、单步等多种能力，靠 `operation` 数字区分：

| operation | 含义 | 备注 |
|-----------|------|------|
| 0 | 附加 | |
| 1 | 抢占式附加 | |
| 2 | 分离 | **不需要配合 value** |
| 3 | 停止（暂停目标进程） | **不需要配合 value** |
| 4 | 继续 | |
| 5 | 单步 | |
| 6 | 等待单步 | |
| 7 | 等待系统调用 | **不需要配合 value** |

- 参数 : operation {int} 控制类型（上表）
- 参数 : value {int} 附加的线程号、单步步数、继续时的信号等；**最小值会被自动抬到 1**
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"未知 trace 操作"}` 或 `{"ok":false,"error":"trace 操作失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let stop = $mem.traceControl(3, 0);   // 暂停目标进程
let cont = $mem.traceControl(4, 0);   // 恢复目标进程
let step = $mem.traceControl(6, 1);   // 单步一次，value 表示步数
```

### watchMem(threadId, address, type, length, timeoutMs)

**监视内存访问（硬件断点，找出谁改了这里）**。借用 CPU 的性能监控单元盯住某个地址，一旦有人读它或写它，就记录一条样本 —— 非常适合排查「不知道被谁改掉了」的问题。

- 参数 : threadId {int} **线程号**（TID，不是进程号！），取自 `lsThread()`，必须大于 0
- 参数 : address {long} 要盯住的地址，必须大于 0；**建议做页对齐后使用**
- 参数 : type {int} 监视类型：**1 只读、2 只写、3 读或写、4 执行**；必须落在 1 到 4 之间
- 参数 : length {int} 监视的字节长度，**范围 1 到 8**
- 参数 : timeoutMs {int} 最长等待时间（毫秒），**超过 10000 会按 10000 处理**
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true,"samples":[{"ip":"0x7f1111","address":"0x7f00000000","pid":1234,"tid":1235,"time":123456}]}`；失败形如 `{"ok":false,"error":"watchpoint 参数无效"}` 或 `{"ok":false,"error":"硬件 watchpoint 创建失败"}`
- 版本 : 2.0.3

> 这个功能**依赖设备内核开放 perf 事件，部分设备用不了**。

```javascript
// type 3 = 同时监视读和写，盯 4 个字节，最多等 3000 毫秒
let r = JSON.parse($mem.watchMem(1235, 0x7f00000000L, 3, 4, 3000));
```

---

## 转储

### dumpRange(start, end, destination)

**把一段地址范围导出成文件**（原始取证）。适合用十六进制编辑器慢慢分析。

- 参数 : start {long} 起始地址（**包含**）
- 参数 : end {long} 结束地址（**不包含**）
- 参数 : destination {string} 要写成的文件路径，**所在文件夹必须存在且有写权限**
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"转储失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
// 范围要从 lsMap() 里挑可读的部分
let json = $mem.dumpRange(0x7f00000000L, 0x7f01000000L, "/sdcard/dump.bin");
```

### dumpMap(mappedFile, destination)

**把某个映射文件的内存导出成文件**。按「映射文件名」一次性导出对应全部内存，比 `dumpRange()` 省事，不用自己算起止地址。

- 参数 : mappedFile {string} 映射文件路径或文件名，**支持路径片段**，例如 `"libc.so"`
- 参数 : destination {string} 要写成的文件路径，所在文件夹必须存在且有写权限
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"映射文件转储失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
// 导出的是 libc.so 的内存内容，不是磁盘上的原文件
let json = $mem.dumpMap("libc.so", "/sdcard/libc.bin");
```

### dumpElf(elfName, destination)

**把目标进程里的某个动态库导出成文件**。和 `dumpMap()` 的区别是：这个**按 ELF 结构导出**，更适合直接与反汇编工具里的结果对照。

- 参数 : elfName {string} 动态库文件名或路径片段，例如 `"lib_mem.so"`
- 参数 : destination {string} 要写成的文件路径，所在文件夹必须存在且有写权限
- 返回 : {string} JSON 字符串，成功形如 `{"ok":true}`；失败形如 `{"ok":false,"error":"未找到 ELF"}` 或 `{"ok":false,"error":"ELF 转储失败"}`
- 版本 : 2.0.3
- 前提 : 必须先 `init()`

```javascript
let json = $mem.dumpElf("lib_mem.so", "/sdcard/mem.so");
```

---

## 方法速查表

| 方法 | 需要 init | 需要 trace | 作用 |
|------|-----------|------------|------|
| `isSoLoad()` / `getLoadError()` / `info()` / `selfTest()` | ✗ | ✗ | 环境检测 |
| `decodeArmCmd()` | ✗ | ✗ | 反汇编一条 ARM 指令 |
| `lsProc()` | ✗ | ✗ | 列进程 |
| `init(pid, mode)` | — | ✗ | 连接进程 |
| `lsMap(filter)` / `lsElf()` / `lsThread()` / `lsSoInfo(bool)` | ✓ | ✗ | 内存结构 |
| `checkPointer(addr, len)` | ✓ | ✗ | 查地址权限 |
| `read` / `write` / `readStr` / `writeStr` | ✓ | ✗ | 读写 |
| `scanPattern(...)` | ✓ | ✗ | 特征码扫描 |
| `createBackup` / `restoreBackup` | ✓ | ✗ | 备份还原 |
| `findSymbol(...)` | ✓ | ✗ | 查符号 |
| `dumpRange` / `dumpMap` / `dumpElf` | ✓ | ✗ | 转储 |
| `createPatch` / `restorePatch` | ✓ | ✗ | 打补丁 |
| `trace(bool)` / `traceControl(op, val)` | ✓ | — | ptrace |
| `remoteCall` / `remoteSyscall` | ✓ | ✓ | 远程调用 |
| `watchMem(...)` | ✓ | ✗ | 硬件断点 |

---

## 常见错误速查

| 现象 | 原因 | 处理 |
|------|------|------|
| `{"ok":false,"error":"尚未连接进程"}` | 没 `init()` 就调读写 | 先 `init()` |
| 读写失败甚至目标崩溃 | 地址漏了 `L` 后缀，或用了十进制地址 | 改成 `0x...L` |
| `isSoLoad()` 返回 false | ABI 不匹配 / 架构不支持 | 看 `getLoadError()` |
| `init()` 失败 | 没 Root / SELinux 拦截 / 进程不存在 | 换 `$mem.proc` 方式；确认进程活着 |
| 目标进程卡死无响应 | `trace(true)` 后没分离 | `finally` 里 `trace(false)` |
| 目标进程行为异常 | 补丁没还原 | `finally` 里 `restorePatch(handle)` |
| 句柄全部失效 | 重新 `init()` 清空了底层句柄 | 重新连接后重新创建补丁/备份 |
| 硬件断点创建失败 | 内核没开放 perf 事件 | 该设备不支持，换设备 |

---

## 与已知边界的说明

- `$mem` 是 **v2.0.3 新增模块**，本 skill 此前完全没有收录（`api/`、`debug/` 里 grep `$mem` 零命中）。
- 操作**自己进程无需 Root**；操作**其他 App 需要 Root 或 ptrace 权限**。
- 本模块**不涉及网络**，与 `$root`（shell 命令）、`$file`（文件）、`$http`（网络）职责不重叠。
