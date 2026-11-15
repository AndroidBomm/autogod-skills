// AIGame官方示例


//解析xml并且获得ui对象
let ui = $ui.layout("example/$tip - 阻塞式对话框/01.自定义对话框/ui.xml");
//通过ui对象拿到View对象
let view = ui.getView();



//通过tip显示这个view
$tip.show("自定义对话框", view, ()=> {
    toast("保存成功");
});




// 示例结束