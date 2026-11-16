# $log - 日志框架

- 更新时间:2026-02-08 19:43:40

日志框架

> ## ⚠️ 全文件唯一红线：所有 `$log.*` 只接受 **一个** 参数
>
> 下面每个方法的签名都写着 `{string...}`，**这是文档的错**。运行时只吃一个参数：
>
> ```javascript
> $log.i("信息");              // ✅
> $log.i("弱网", msg);         // ❌ 抛「找不到方法 "...i(string,dj.xxx)」」
> $log.i("[弱网] " + msg);     // ✅ 要带上下文就自己拼串
> ```
>
> **为什么这个坑特别毒**：异常会**中断抛出它的那个回调**。如果这行写在按钮的 `click` 里，
> 它后面的代码**全部静默失效** —— 界面完全正常、日志一片安静、点按钮毫无反应。
> 2026-10 实测：本项目「弱网」按钮整段绑定就是这样失效的（见 `guide/踩坑记录.md` 11.3）。
> 排查时不要只看「日志没打出来」，要看**绑定函数是否从头执行到尾**。

### i(args)

打印信息日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.i("信息");

```
### info(args)

打印信息日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.info("信息");

```
### d(args)

打印调试日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.d("调试");

```
### debug(args)

打印调试日志

- 参数 : args {string...} 日志

- 版本 : 1.2.8

```javascript
$log.debug("调试");

```
### w(args)

打印警告日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.w("警告");

```
### warn(args)

打印警告日志

- 参数 : args {string...} 日志

- 版本 : 1.2.8

```javascript
$log.warn("警告");

```
### e(args)

打印异常日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.e("异常");

```
### err(args)

打印异常日志

- 参数 : args {string...} 日志

- 版本 : 1.2.8

```javascript
$log.err("异常");

```
### v(args)

打印冗余日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.v("冗余");

```
### log(args)

打印日志

- 参数 : args {string...} 日志

- 版本 : 1.0.0

```javascript
$log.log("hello");

```
### print(args)

打印日志

- 参数 : args {string...} 日志

- 版本 : 1.2.0

```javascript
$log.print("hello");

```
### floaty()

打开日志悬浮窗

- 版本 : 1.0.0

```javascript
$log.floaty();

```
### closeFloaty()

关闭日志悬浮窗

- 版本 : 1.8.6

```javascript
$log.closeFloaty();

```
### activity()

打开日志界面

- 版本 : 1.1.2

```javascript
$log.activity();

```
### delete()

删除本地缓存

- 版本 : 1.0.6

```javascript
$log.delete();

```
### toast(msg)

土司提示

- 参数 : msg {String} 显示内容

- 版本 : 1.9.6

```javascript
$log.toast("提示信息");

```
### alert(msg)

对话框

- 参数 : msg {String} 信息

- 版本 : 1.9.6

```javascript
$log.alert("信息");

```
### alert(title, msg)

对话框

- 参数 : title {String} 标题

- 参数 : msg {String} 信息

- 版本 : 1.9.6

```javascript
$log.alert("标题", "信息");

```
### show()

显示悬浮日志框

- 版本 : 1.9.6

```javascript
$log.show();

```
### close()

关闭悬浮日志框

- 版本 : 1.9.6

```javascript
$log.close();

```
### ui()

显示日志界面

- 版本 : 1.9.6

```javascript
$log.ui();

```
---





