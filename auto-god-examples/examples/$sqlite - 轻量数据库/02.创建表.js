//示例开始

let hasTable = $sqlite.newTab("table1",["name","sex","age"]);
if(hasTable){
    log("建表成功");
}

//示例结束