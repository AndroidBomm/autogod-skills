//官方示例


//读取第2个表格数据:指定下标
let data = $excel.read(
"example/$excel - 表格操作/data.xlsx" ,//相对路径
 1 //表格下标
);
alert("表格数据",data);



//示例结束