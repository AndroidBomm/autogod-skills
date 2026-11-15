//AIGame官方示例

//先把之前创建的悬浮窗全部关掉
$floaty.closeAll();


let floaty = $floaty.newSys(`
<ui>
    <linear w="max" h="max" bg="#33FF0000" >
        <button id="mButton" text="关闭" ripper="#FFFFFF" />
        <button id="mBut1" text="全屏" ripper="#FFFFFF" />
        <button id="mBut2" text="非全屏" ripper="#FFFFFF" />
        <button id="mBut3" text="取消触摸" ripper="#FFFFFF" />
        <button id="mBut4" text="修改位置" ripper="#FFFFFF" />
    </linear>
</ui>
`);


//监听按钮：点击后关闭这个悬浮窗
floaty.id("mButton").click(()=>{
    floaty.close();
});

//全屏
floaty.id("mBut1").click(()=>{
    floaty.fill(true);
});

//非全屏
floaty.id("mBut2").click(()=>{
    floaty.fill(false);
});

//取消触摸 3秒之后 开启触摸
floaty.id("mBut3").click(()=>{
    floaty.touch(false);
    $thread.run(()=>{
       sleep(3000);
       floaty.touch(true);
       toast("开启触摸啦");
    });
});

//修改位置
floaty.id("mBut4").click(()=>{
    floaty.setXY(300,400);
});



//示例结束