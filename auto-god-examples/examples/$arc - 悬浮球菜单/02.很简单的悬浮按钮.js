//AIGame 官方示例

let myName = "悬浮球2号";
if (!$arc.has(myName)) {

    //创建按钮容器(用来装小按钮)
    let menuBody = $arc.body(myName); //指定菜单名称

    //创建小按钮
    let menu1 = $arc.item("ic_app").iconTint("#3574F0"); //指定按钮图标
    let menu2 = $arc.item("ic_clear");

    //为按钮2绑定事件
    menu2.click(()=> {
        $arc.close(myName); //关闭悬浮窗(和悬浮菜单名称一致)
        //$arc.closeAll();//或者直接关闭全部的悬浮菜单
    });

    //向容器中添加小按钮
    menuBody
    .add(menu1.bg("#55FFFFFF")) //添加小按钮
    .add(menu2.bg("#55000000").iconTint("#55FF0000").ripper("#550000FF")) //添加小按钮
    .show(); //显示



}

//示例结束