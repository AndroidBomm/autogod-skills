//示例开始

//即使是报错也不会返回null，而是返回空列表，因此可以不用判断数据是否为空
let result = $sqlite.ls("table1");
for(let item of result){
    log(item);
}

//示例结束