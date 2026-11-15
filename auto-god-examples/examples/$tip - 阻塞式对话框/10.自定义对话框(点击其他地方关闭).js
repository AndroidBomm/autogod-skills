// AIGame官方示例


//解析xml并且获得ui对象
let ui = $ui.layout("example/$tip - 阻塞式对话框/01.自定义对话框/ui.xml");
//通过ui对象拿到View对象
let view = ui.getView();


//这种方式不会显示底部的按钮
$tip.show("自定义对话框", view);




// 示例结束