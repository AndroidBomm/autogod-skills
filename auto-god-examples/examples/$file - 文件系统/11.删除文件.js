//AIGame 官方示例

let path = "/sdcard/Pictures/测试2.txt";
$file.del(path);

//最后判断文件是否存在
if(!$file.exists(path)){
    log("删除成功");
}


//示例结束