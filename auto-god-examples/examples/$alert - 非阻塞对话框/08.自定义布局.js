//官方示例

let mAlert = $alert.create();

let ui = $ui.layout(`
<ui w="max">
    <button id="mButton1" style="text" text="点我试试" w="max"/>
    <button id="mButton2" text="关闭对话框" style="text" w="max" />
</ui>
`);

ui.id("mButton1").click(()=>{
    info("我被点击了");
});

ui.id("mButton2").click(()=>{
    mAlert.close();//关闭对话框
});

let mView = ui.getView();

mAlert
//不允许通过点击外部自动关闭对话框
//但是要记住一定要自己设置一个可以关闭对话框的方式
.cancelable(false) 
.view(mView) // 设置自定义布局
.show();


//示例结束