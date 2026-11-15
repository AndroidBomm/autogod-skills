## 04.第三方自动化APP联动


#04.第三方自动化APP联动 

市面上有很多可视化自动化工具，例如比较著名的Tasker，它可以自定义一些定时任务。

在 Tasker 中，你可以通过配置文件发送 Intent 动作，将手机的其他事件（如 NFC 刷卡、连接特定 WiFi 等）与 ADB 调试指令绑定。以下为各项功能的 Tasker 配置参数。

注意：需要打开本应用的adb调试功能，在应用左侧的菜单栏中可以看到调试面板下方有个adb调试开关。

#设置项目路径

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:setProjectPath:/sdcard/MyProject

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#运行 JS 脚本

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:runJs:/sdcard/MyProject/main.js

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#停止运行 JS

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:stopJs

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#清空日志

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:clearLog

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#显示 Toast 消息

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:toast:正在通过Tasker调试

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#解压文件

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。执行后需配合 Tasker 的文件读取动作轮询 /sdcard/AutoGod/adb/unzipSuccess 文件以确认结果。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:unzip:/sdcard/temp/project.zip###/sdcard/Projects/MyApp

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#压缩文件夹

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。执行后需配合 Tasker 的文件读取动作轮询 /sdcard/AutoGod/adb/zipSuccess 文件以确认结果。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:zip:/sdcard/Projects/MyApp###/sdcard/backup/project.zip

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver

#清理状态文件

在 Tasker 的动作中选择 Action 分类下的 Send Intent 进行配置。在每次触发解压或压缩任务前，建议先执行此动作清理旧状态，防止 Tasker 读取到上次的文件而提前结束等待。

Action: com.gitee.kodesh.ADB_DEBUG_ACTION

Extra: data:clearAdbFile

Package: org.auto.god

Class: com.gitee.kodesh.debug.adb.AdbDebugReceiver


---
