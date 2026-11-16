## 03.第三方APP开放文档


#03.第三方APP开放文档 

你可以在自己开发的安卓应用中调用本APP的功能，通过简单的广播即可完成。

注意：需要打开本应用的adb调试功能，在应用左侧的菜单栏中可以看到调试面板下方有个adb调试开关。

#设置项目路径

通过显式 Intent 发送指令设置全局工作路径。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "setProjectPath:/sdcard/MyProject");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#运行 JS 脚本

通过显式 Intent 触发异步执行指定路径的 JS 脚本。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "runJs:/sdcard/MyProject/main.js");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#停止运行 JS

通过显式 Intent 发送终止指令停止当前运行的脚本。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "stopJs");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#清空日志

通过显式 Intent 触发清空当前的调试日志。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "clearLog");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#显示 Toast 消息

通过显式 Intent 在目标设备上弹出提示信息。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "toast:正在通过Intent调试");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#解压文件

通过显式 Intent 触发解压操作。由于广播无法直接拿到返回值，需通过读取 /sdcard/AutoGod/adb/ 下的 unzipSuccess 或 unzipFail 文件来判断结果。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "unzip:/sdcard/temp/project.zip###/sdcard/Projects/MyApp");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#压缩文件夹

通过显式 Intent 触发压缩操作。通过读取 /sdcard/AutoGod/adb/ 下的 zipSuccess 或 zipFail 文件来判断结果。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "zip:/sdcard/Projects/MyApp###/sdcard/backup/project.zip");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);

#清理状态文件

通过显式 Intent 清空用于记录解压/压缩结果的临时状态目录。在每次执行解压或压缩前建议先调用此方法，防止读取到历史遗留的旧状态文件导致逻辑出错。

Intent intent = new Intent("com.gitee.kodesh.ADB_DEBUG_ACTION");
intent.putExtra("data", "clearAdbFile");
intent.setPackage("org.auto.god");
intent.setClassName("org.auto.god", "com.gitee.kodesh.debug.adb.AdbDebugReceiver");
intent.addFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
sendBroadcast(intent);


---
