//AIGame 官方示例

//准备路径
let path = "/sdcard";
//罗列出文件
let files = $file.ls(path);

for(let i = 0 ; i < files.size() ; i++){
    log(files.get(i));
}

log("罗列(使用过滤器)");
let files_A = $file.ls(path,(path)=>{
    let fileName = $file.name(path);
    //如果文件名称以'.'开始,那么就通过
    return $str.startWith(fileName, ".");
});

//找到隐藏文件夹
for(let i = 0 ; i < files_A.size() ; i++){
    log(files_A.get(i));
}


//示例结束