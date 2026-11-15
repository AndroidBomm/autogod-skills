//示例开始

//其实此函数等价于 $sqlite.exe("INSERT INTO table1 (name, sex, age) VALUES ('张三', '男', 20)");
let hasAdd = $sqlite.add("table1",{
    name:"张三",
    sex:"男",
    age:20
});
if(hasAdd){
    log("添加成功");
}

//示例结束