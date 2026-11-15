//AIGame 官方示例

let path = "/sdcard/AAA";
$file.mkdir(path);

//判断目录是否存在
if($file.exists(path)){
    log("目录创建完成");
}

//最后删除(没必要留着)
$file.del(path);

//示例结束