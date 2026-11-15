//AIGame官方示例

//先把之前创建的悬浮窗全部关掉
$floaty.closeAll();

alert("提示","我将显示一个全屏的悬浮窗，你可以触摸任意位置，我会显示你触摸位置的坐标并且显示一个准心图片，点击关闭后，我会复制这个位置到剪切板上！");

let floaty = $floaty.newApp(`
<ui>
    <linear id="mLinear" w="max" h="max" gravity="center">
        <text id="mText"/>
        <button id="mButton" text="关闭" ripper="#FFFFFF" />
        <img id="mImg" src="ic_record" tint="colorPrimary" />
    </linear>
</ui>
`);

let x = 0;
let y = 0;

floaty.fill(true);
//获取安卓原生控件：监听touch事件 (原生交互案例,仅供学习)
floaty.id("mLinear").getView().setOnTouchListener((view,event)=> {
    x = Math.round(event.getRawX());
    y = Math.round(event.getRawY());
    floaty.id("mText").setText(x+","+y);
    //显示一个准心图标
    let img = floaty.id("mImg");
    img.setX(x-img.getW()/2);
    img.setY(y-img.getH()/2);
    return true;
});



//监听按钮：点击后关闭这个悬浮窗
floaty.id("mButton").click(()=> {
    floaty.close();
    setClip(x+","+y);
    toast("坐标复制完成");
});






//示例结束