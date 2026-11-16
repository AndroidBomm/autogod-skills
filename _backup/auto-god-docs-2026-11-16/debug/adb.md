## 02.ADB调试协议文档


#02.ADB调试协议文档 

本文档定义了通过 ADB 向 Android 端发送调试指令的协议规范。该机制通过精准向指定组件发送系统广播实现，无需网络连接。

注意：执行前需确保 Android 端应用内的 ADB 调试开关已开启，否则指令将被忽略。
核心参数说明：-n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver 用于确保广播精准送达，避免被其他应用拦截或因应用未启动而导致广播丢失。

#ADB工具下载

Windows：点击前往下载

Mac：点击前往下载

下载好后去系统环境变量中添加，方便自己后续使用。

#设置项目路径

设置 Android 端的全局项目工作路径。此操作无回调状态。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "setProjectPath:/sdcard/MyProject" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#运行 JS 脚本

在子线程中异步执行指定路径的 JS 脚本文件。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "runJs:/sdcard/MyProject/main.js" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#停止运行 JS

终止当前正在运行的 JavaScript 脚本。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "stopJs" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#清空日志

清空当前的调试日志缓存或界面内容。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "clearLog" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#显示 Toast 消息

在 Android 设备上显示提示信息。如果应用拥有悬浮窗权限则显示悬浮窗提示，否则显示普通 Toast。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "toast:正在通过ADB执行调试" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#解压文件

将指定的 ZIP 文件解压到目标文件夹。由于广播无法直接返回数据给 PC 端，系统会在 /sdcard/AutoGod/adb/ 目录下生成状态文件：成功生成 unzipSuccess，失败生成 unzipFail。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "unzip:/sdcard/temp/project.zip###/sdcard/Projects/MyApp" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#压缩文件夹

将指定的源文件夹压缩为 ZIP 文件。结果反馈同样通过 /sdcard/AutoGod/adb/ 目录下的状态文件体现：成功生成 zipSuccess，失败生成 zipFail。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "zip:/sdcard/Projects/MyApp###/sdcard/backup/project.zip" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver

#清理状态文件

清空 /sdcard/AutoGod/adb/ 目录下的所有状态文件（如 unzipSuccess、unzipFail、zipSuccess 等）。其核心用途是重置环境状态：因为广播通信是单向的，PC 端或第三方 APP 只能通过读取该目录下的文件来判断上一次压缩或解压是否完成。在发起下一次解压或压缩任务前，务必先调用此指令清除上一次遗留的成功或失败标记，以免造成状态误判。

adb shell am broadcast -a com.gitee.kodesh.ADB_DEBUG_ACTION --es "data" "clearAdbFile" -n org.auto.god/com.gitee.kodesh.debug.adb.AdbDebugReceiver


---
