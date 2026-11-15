//官方示例

//(1)创建并且显示可调节悬浮窗
let floaty = $floaty.newAdj(`
<ui>
    <linear dir="v" w="max">
        <button text="按钮1" w="max"/>
        <button text="按钮2" w="max"/>
        <button id="closeButton" text="关闭" w="max"/>
    </linear>
</ui>
`);

//(2).绑定按钮点击事件
floaty.id("closeButton").click(()=>{
    floaty.close();
});


//示例结束