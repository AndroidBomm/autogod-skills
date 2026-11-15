## 案例-折叠文本


#案例-折叠文本 

更新时间:2026-06-15 07:53:02

折叠面板案例：假如有大量的文本需要显示，就可以使用折叠面板来减空间占用。

#Xml代码

<ui>
    <statusbar/>
    <linear w="max" h="max" gravity="center">
        <linear w="max" dir="h" gravity="center">
            <!--这些按钮控制折叠面板的状态-->
            <button id="open" text="打开"/>
            <button id="close" text="关闭"/>
            <button id="change" text="切换"/>
        </linear>
        <card w="max" margin="15">
            <linear w="max" gravity="center" dir="v">
                <text text="折叠面板" w="max" margin="10"/>
                <!--把需要折叠的内容放到折叠面板中，例如我有大量的文字描述-->
                <expand id="exp" w="max">
                    <linear w="max" gravity="center">
                        <!--这里是折叠面板的内容-->
                        <text margin="10" text="我是一堆描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述"/>
                    </linear>
                </expand>
            </linear>
        </card>
    </linear>
</ui>

#JS代码

let ui = $ui.layout("main.xml");
let mAppbar = ui.id("mAppbar");
if (mAppbar != null) {
    mAppbar.back(() => {
        ui.finish();
    });
}
let exp = ui.id("exp");//折叠面板
let open = ui.id("open");//打开
let close = ui.id("close");//关闭
let change = ui.id("change");//切换
if(open!=null){
    open.click(()=>{
       exp.open();
    });
}
if(close!=null){
    close.click(()=>{
        exp.close();
    });
}
if(change!=null){
    change.click(()=>{
        exp.change();
    });
}
//最好放在最后显示主界面
ui.show();


---
