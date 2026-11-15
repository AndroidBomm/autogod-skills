//读取图片
let img = $img.read("example/$img - 图片处理/img/t02.png");
//在这张图片中执行多点找色
let result = $img.findMultiColors(img,null,"#E9AF6D",5,[
                	-10, 1, "#908E8A", 5,
                	-4, -8, "#908E8A", 5,
                	-18, -4, "#FBFBFB", 5
]);
alert("执行结果",result);