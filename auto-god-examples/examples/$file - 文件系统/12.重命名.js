//AIGame 官方示例

let from = "/sdcard/测试.txt";
let to = "/sdcard/测试2.txt";
$file.rename(from, to);

//最后判断文件是否存在
if($file.exists(to)){
    log("命名成功");
}


//示例结束