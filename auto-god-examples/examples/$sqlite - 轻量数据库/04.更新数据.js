//示例开始

let okUpdate = $sqlite.update("table1", {
    name: "张三",
    sex: "女",
    age: 20
},"name='张三'");
if (okUpdate) {
    log("更新成功");
}

//示例结束