# $root - ROOT与Shell命令

- 更新时间:2026-02-08 19:43:41

ROOT与Shell工具

> ## ⚠️ 使用前必读：`$root` 的「静默搞死」陷阱
>
> **1. `exeRootShellSync()` 不能阻塞在 UI 线程里「等很久」。**
> 在已经 `ui.show()` 起来的实例里调它，如果命令本身不返回（例如卡在交互式命令、`su` 没授权、设备真卡住），
> 就会**永久不返回、不报错、不超时** —— 界面直接假死。
> **但短命令（毫秒~1 秒级）用同步版是完全正确的做法**，不要因为怕卡死就一律上异步。
>
> **2. 用同步还是异步，只看一件事：这条命令要跑多久。**
>
> **2026-11 实测（客户端「运行」按钮启动的健康实例、`ui.show()` 之后、同一段脚本里 A/B 对照）：**
>
> ```
> hasPermit = true
> sync#1 用时  6ms -> uid=0(root) ...
> sync#2 用时  8ms -> uid=0(root) ...
> sync#3 用时 11ms -> uid=0(root) ...
> async 已发出
> async 1.5s 后 = line:uid=0(root) ...      ← 回调正常触发
> async 4s   后 = exit=0 用时2006ms          ← 约 2 秒才完成
> async 之后 sync 再测 用时 2ms -> uid=0(root) ...   ← 互不干扰
> ```
>
> 结论：**同步和异步在这个实例里都能用**；区别只是**同步 6~11ms，异步约 2 秒**。
> 所以「`exeRootShellSync` 放在 UI 线程必卡死」这条旧说法**是错的**，已作废。
>
> | 场景 | 用哪个 | 实测依据 |
> |---|---|---|
> | `iptables`、`echo`、`cat` 小文件、`test -e` | **同步 `exeRootShellSync()`** | 6~11ms，最快最稳 |
> | `am force-stop`、`pm`、`cp` 几十 MB | 同步也可以 | 接受这段时间线程被占 |
> | 解压大包、拷贝几百 MB（>5 秒） | **异步 + 超时兜底，且等待期间绝不 `sleep`** | 长命令不能占死线程 |
>
> **3. ⚠️ 异步回调的前提：线程必须「还手」。**
> `exeRootShell(cmd, onLine, onErr, onExit)` 的回调是靠 JS 事件循环送达的。
> 如果你发完命令就 `sleep(3000)` / 大循环 / 长同步流程，**线程被占死，回调排不上队，永远不会执行**。
> 2026-11 实测（关键，别再踩）：
> ```javascript
> $root.exeRootShell('id', l => flag = l, e => {}, c => flag = 'done');
> sleep(3000);  // → flag = none     回调没执行
> sleep(5000);  // → flag = none     还是没执行
> ```
> 表现就是「命令其实执行成功了，但你一直收不到回调，最后被自己的 12 秒超时误判成失败」。
> **所以：要么用同步版；要么整条流程改成 `setTimeout` 串联的事件驱动，全程不 `sleep`。**
> 反例对照：项目里 `modules/lockcloud.js`、`modules/accountManager.js` 用异步回调**工作正常** ——
> 因为它们都是「点一下按钮 → 发命令 → 立刻 return」，线程还回去了。
>
> **4. 不要调用 `getPermit()`。** 它会把整条 root 通道搞坏 —— 之后 `exeRootShellSync()` 永久不返回。
> 只需要判断权限就用 `hasPermit()`（无副作用）。
>
> **5. 调试通道启动的实例是「残废」的。** 用 `adb broadcast runJs` / WS `runJsCode` 启动的实例里，
> 异步回调**全都不触发**、同步调用**卡死**。判断某个 API 能不能用，**一定要用客户端「运行」按钮启动**。
>
> 完整案例与验证方法见 `guide/Agent执行协议.md` 第一章、`guide/踩坑记录.md` 第十一章。

### hasPermit()

是否获得ROOT权限

- 返回 : {boolean} 是否获得ROOT权限

- 版本 : 1.0.0

```javascript
let has = $root.hasPermit();
alert("是否有root权限",has);

```
### getPermit()

获得root权限

> ### 🚫 不要调用这个函数
>
> **它会破坏整条 root 通道** —— 调用之后 `$root.exeRootShellSync()` 会**永久不返回**（它会「返回」，
> 但之后任何同步 root 命令都卡死，且不报错、不超时）。2026-10 实测定位：
> 本项目 `netControl.js` 读 UID 卡死十几秒超时，根因就是启动流程里先调了 `getPermit()`。
>
> **一律只用 `hasPermit()` 判权限**（无副作用、可反复调用）：
>
> ```javascript
> if (!$root.hasPermit()) {
>     $log.i("[root] 没有权限，请先去首页授权");
>     return;
> }
> // 权限已经有了，直接干活
> ```
>
> 详见 `guide/踩坑记录.md` 11.2、`guide/自检清单.md` §3.4。

- 返回 : {boolean} 是否获得root权限

- 版本 : 1.0.0

```javascript
$root.getPermit();

```
### enablePointer(enable)

启用指针

打开或者关闭开发者调试的指针位置选项

- 参数 : enable {boolean} 是否启用

- 版本 : 1.4.1

```javascript
//打开指针位置显示
$root.enablePointer(true);

```
### click(x, y)

点击

- 参数 : x {int} 点击位置x

- 参数 : y {int} 点击位置y

- 版本 : 1.0.0

```javascript
//点击手势
$root.click(500,800);

```
### click(x, y, dur)

点击

- 参数 : x {int} 点击位置x

- 参数 : y {int} 点击位置y

- 参数 : dur {int} 点击时长

- 版本 : 1.0.0

```javascript
//点击手势(长按)
$root.click(500,800,1500);

```
### click(x, y, dur, delay)

点击

- 参数 : x {int} 点击位置x

- 参数 : y {int} 点击位置y

- 参数 : dur {int} 点击时长

- 参数 : delay {int} 点击前延迟

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
$root.click(500,800,1500,100);

```
### click(index)

点击

- 参数 : index {int[]} 点击位置

- 版本 : 1.0.0

```javascript
//点击
$root.click([500,800]);

```
### click(index, dur)

点击

- 参数 : index {int[]} 点击位置

- 参数 : dur {int} 点击时间

- 版本 : 1.0.0

```javascript
//点击
$root.click([500,800],50);

```
### click(index, dur, delay)

点击

- 参数 : index {int[]} 点击位置

- 参数 : dur {int} 点击时间

- 参数 : delay {int} 延迟

- 版本 : 1.0.0

```javascript
//点击
$root.click([500,800],50,2000);

```
### click(index)

点击

- 参数 : index {Point} 点击位置

- 版本 : 1.0.0

```javascript
//点击手势
let point = new org.opencv.core.Point(500,800);
$root.click(point);

```
### click(index, dur)

点击

- 参数 : index {Point} 点击位置

- 参数 : dur {int} 点击时长

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
let point = new org.opencv.core.Point(500,800);
$root.click(point,1500);

```
### click(index, dur, delay)

点击

- 参数 : index {Point} 点击位置

- 参数 : dur {int} 点击时长

- 参数 : delay {int} 点击前延迟

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
let point = new org.opencv.core.Point(500,800);
$root.click(point,1500,100);

```
### press(x, y)

长按

- 参数 : x {int} 长按位置x

- 参数 : y {int} 长按位置y

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
$root.press(500,800);

```
### press(x, y, dur)

长按

- 参数 : x {int} 长按位置x

- 参数 : y {int} 长按位置y

- 参数 : dur {int} 长按后延迟

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
$root.press(500,800,1500);

```
### press(x, y, dur, delay)

长按

- 参数 : x {int} 长按位置x

- 参数 : y {int} 长按位置y

- 参数 : dur {int} 长按后延迟

- 参数 : delay {int} 长按前延迟

- 版本 : 1.0.0

```javascript
//点击手势(长按)(延迟一秒)
$root.press(500,800,1500,100);

```
### move(x1, y1, x2, y2)

滑动

- 参数 : x1 {int} 起点x

- 参数 : y1 {int} 起点y

- 参数 : x2 {int} 终点x

- 参数 : y2 {int} 终点y

- 版本 : 1.0.0

```javascript
//滑动手势
$root.move(500,0,500,800);

```
### move(x1, y1, x2, y2, dur)

滑动

- 参数 : x1 {int} 起点x

- 参数 : y1 {int} 起点y

- 参数 : x2 {int} 终点x

- 参数 : y2 {int} 终点y

- 参数 : dur {int} 滑动时间

- 版本 : 1.0.0

```javascript
//滑动手势
$root.move(500,0,500,800,500);

```
### move(x1, y1, x2, y2, dur, delay)

滑动

- 参数 : x1 {int} 起点x

- 参数 : y1 {int} 起点y

- 参数 : x2 {int} 终点x

- 参数 : y2 {int} 终点y

- 参数 : dur {int} 滑动时间

- 参数 : delay {int} 滑动延迟

- 版本 : 1.0.0

```javascript
//滑动手势
$root.move(500,0,500,800,500.1000);

```
### lock()

锁屏

- 版本 : 1.0.0

```javascript
$root.lock();

```
### unlock()

解锁屏幕

- 版本 : 1.0.0

```javascript
$root.unlock();

```
### power()

电源按键

- 版本 : 1.0.9

```javascript
$root.power();

```
### exec(cmd)

执行ROOT命令

- 参数 : cmd {string} 命令

- 版本 : 1.5.9

```javascript
//手机变砖(别用!!!!)
//$root.exec("rm -rf /data");

```
### exeRootShell(cmd)

执行ROOT命令

- 参数 : cmd {string} 命令

- 版本 : 1.0.0

```javascript
//手机变砖(别用!!!!)
//$root.exeRootShell("rm -rf /data");

```
### exeRootShell(cmd, output)

执行ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 版本 : 1.0.0

```javascript
//查看系统网络配置
$root.exeRootShell("cat /data/misc/dhcp/mac",(line)=>{
    log(line);
});

```
### exeRootShell(cmd, output, terminate)

执行ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 参数 : terminate {(err)=>{}} 命令中止(回调:原因)

- 版本 : 1.0.0

```javascript
//查看系统网络配置
$root.exeRootShell("cat /data/misc/dhcp/mac",(line)=>{
    log(line);
},(err)=>{
    $log.e(err);
});

```
### exeRootShell(cmd, output, terminate, complete)

执行ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 参数 : terminate {(err)=>{}} 命令中止(回调:原因)

- 参数 : complete {(exitCode)=>{}} 命令完成(回调:退出码)

- 版本 : 1.0.0

```javascript
//查看系统网络配置
$root.exeRootShell("cat /data/misc/dhcp/mac",(line)=> {
    log(line);
},(err)=> {
    $log.e(err);
},(exitCode)=> {
    $log.i("执行完毕，退出码 " + exitCode);   // ⚠️ $log.i 只能一个参数
    // 原文写的是 $log.i("执行完毕",exitCode) —— 会抛异常，别照抄
});

```
### exeRootShellSync(cmd)

同步执行ROOT命令

> ### ✅ 短命令就该用它（别再被"绝对不能同步"误导）
>
> **判据只有一条：这条命令要跑多久。**
> - `iptables` / `echo` / `cat` / `test -e` 这类**毫秒级**命令 —— **直接用同步版，最简单也最可靠**。
>   2026-11 实测：`exeRootShellSync('id')` 返回 `uid=0(root) ...`，**耗时 4ms**；
>   `exeRootShellSync('iptables -I ...')` 同样毫秒级返回。
> - 只有「可能长时间不返回」的命令（交互式、网络、拷贝大文件）才需要异步。
>
> **什么时候它会真的卡死你**（这才是要防的）：
> ① 命令本身不返回（`su` 没授权、命令在等输入）；② 先调过 `getPermit()` 把通道搞坏了；
> ③ 在 `adb broadcast runJs` / WS 启动的「残废实例」里调。
>
> **如果你确实需要异步（长命令），注意回调不会在 `sleep` 期间执行** —— 见文档顶部第 3 条：
> 发完命令必须把线程还回去（`setTimeout` 串联），否则回调永远排不上队，只能被超时兜底误判成失败。
> 异步兜底写法（长命令时用）：
>
> ```javascript
> function runRoot(cmd, timeoutMs, cb) {
>     let done = false;
>     let timer = setTimeout(function () {
>         if (done) return;
>         done = true;
>         cb(new Error("root 命令超时: " + cmd), null);   // 兜底：绝不让界面干等
>     }, timeoutMs || 12000);
>
>     let out = [];
>     $root.exeRootShell(cmd,
>         function (line) { out.push(line); },
>         function (err) {
>             if (done) return;
>             done = true; clearTimeout(timer);
>             cb(new Error(err), null);
>         },
>         function (exitCode) {
>             if (done) return;
>             done = true; clearTimeout(timer);
>             cb(null, { exitCode: exitCode, lines: out });
>         });
> }
> ```
>
> 纯脚本实例（没有被 `ui.show()` 污染过的）里它是能用的 —— 但**不要赌这一点**，
> 因为你永远不知道调用它的那一刻界面是不是已经起来了。

- 参数 : cmd {string} 命令 $"命令"$

- 返回 : {string} 命令输出的结果

- 版本 : 1.9.1

```javascript
//罗列文件列表
let res = $root.exeRootShellSync("ls /");
//处理结果
let fileArr = res.split("\n");
for (let i = 0; i < fileArr.length; i++) {
    console.log(fileArr[i]);
}

```
### exeShell(cmd)

执行免ROOT命令

- 参数 : cmd {string} 命令

- 版本 : 1.0.0

```javascript
$root.exeShell("ls /sdcard/Pictures");

```
### exeShell(cmd, output)

执行免ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 版本 : 1.0.0

```javascript
//列出/sdcard目录下的文件
$root.exeShell("ls /sdcard",(line)=>{
    log(line);
});

```
### exeShell(cmd, output, terminate)

执行免ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 参数 : terminate {(err)=>{}} 命令中止(回调:原因)

- 版本 : 1.0.0

```javascript
$root.exeShell("ls /sdcard/Pictures",(line)=> {
    log(line);
},(err)=> {
    $log.e(err);
});

```
### exeShell(cmd, output, terminate, complete)

执行免ROOT命令

- 参数 : cmd {string} 命令

- 参数 : output {(line)=>{}} 命令输出(回调:输出)

- 参数 : terminate {(err)=>{}} 命令中止(回调:原因)

- 参数 : complete {(exitCode)=>{}} 命令完成(回调:退出码)

- 版本 : 1.0.0

```javascript
$root.exeShell("ls /sdcard/Pictures",(line)=> {
    log(line);
},(err)=> {
    $log.e(err);
},(exitCode)=> {
    $log.i("执行结束",exitCode);
});

```
### closeRootShell()

关闭rootShell

- 版本 : 1.0.0

```javascript
$root.closeRootShell();

```
### closeShell()

关闭shell

- 版本 : 1.0.0

```javascript
$root.closeShell();

```
### closeAll()

关闭所有

- 版本 : 1.0.0

```javascript
$root.closeAll();

```
### input(text)

输入文本

- 参数 : text {string} 内容

- 版本 : 1.0.0

```javascript
$root.input("我是输入的文本");

```
### killApp(pkgName)

杀死应用

需要root权限才能执行

- 参数 : pkgName {string} 包名

- 版本 : 1.0.4

```javascript
$root.killApp("com.example.app");

```
### lsRunningApps(callback)

列出所有运行的应用

- 参数 : callback {(pkg)=>{}} 回调(回调:应用包名)

- 版本 : 1.0.4

```javascript
$root.lsRunningApps((pkg)=>{
    log(pkg);
});

```
### home()

回到主页

- 版本 : 1.0.9

```javascript
$root.home();

```
### back()

返回按键

- 版本 : 1.0.9

```javascript
$root.back();

```
### menu()

菜单按键

- 版本 : 1.0.9

```javascript
$root.menu();

```
### recent()

最近任务

- 版本 : 1.0.9

```javascript
$root.recent();

```
### setWmSize(width, height)

设置手机分辨率

- 参数 : width {int} 宽度

- 参数 : height {int} 高度

$root.setWmSize(1080,2200);

### setDpi(density)

设置手机分辨率

- 参数 : density {int} 分辨率

- 版本 : 1.5.4

```javascript
$root.setDpi(320);

```
### resetWm()

重置手机分辨率与DPI

- 版本 : 1.5.4

```javascript
$root.resetWm();

```
### key(keyName)

模拟按键

- 参数 : keyName 按键名称

- 版本 : 1.5.9

```javascript
$root.key("KEYCODE_POWER");

```
---





