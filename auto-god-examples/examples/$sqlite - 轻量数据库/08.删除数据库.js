//示例开始

//无需打开数据库，直接就能删除数据库文件
let hasDelDb = $sqlite.delDb("mData");
if(hasDelDb){
    log("删库成功");
}

//示例结束