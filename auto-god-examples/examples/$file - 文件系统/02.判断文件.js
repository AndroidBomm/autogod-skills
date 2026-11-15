//AIGame 官方示例

//false:文件不存在或存在是目录
let isFile = $file.isFile("/sdcard/a.txt");
log("是否是文件",isFile);

//是否是目录
let isDir = $file.isDir("/sdcard");
log("是否是目录",isDir);

//是否是空目录
let isEmptyDir = $file.isEmptyDir("/sdcard");
log("是否是空目录",isEmptyDir);

//是否是空文件或文件夹
let isEmpty = $file.isEmpty("/sdcard");
log("是否是空文件",isEmpty);

//示例结束