//官方示例


//数据
let sheetData = [
    ["姓名", "年龄"],
    ["小红", "18"],//注意必须都是字符串类型
    ["小明", "19"]
];
//表名
let sheetName = "我的表格";
//路径
let savePath = "/sdcard/demo.xlsx";
$excel.write(sheetName, sheetData, savePath);

toast("写入完毕");

//之后再读取出来看看
sleep(1000);
alert("表格数据",$excel.read(savePath));

//示例结束