//(1)创建可调节悬浮窗并且显示
let ui = $floaty.newAdj(
`
<ui>
    <linear dir="v" w="max">
        <button id="bt1" text="暂停" w="max"/>
        <button id="bt2" text="开始" w="max"/>
        <button id="bt3" text="是否活着" w="max"/>
    </linear>
</ui>
`);

//(2)绑定事件
ui.id("bt1").click(()=>{
    $task.pause();//暂停脚本(原理是控制脚本引擎的解释执行)
});
ui.id("bt2").click(()=>{
    $task.start();//继续执行(原理是控制脚本引擎的解释执行)
});
ui.id("bt3").click(()=>{
    if($task.isRunning()){
        info("我还活着");
    }else{
        info("我已经死了");
    }
});

//当执行到这里的时候，上面的脚本都被执行了，所以可以正常的控制暂停和运行下面的代码
//假设这是任务代码：
for(let i = 0;i<20;i++){
    sleep(1000);
    info("正在运行"+i);
}

//当循环代码走完之后，当前任务就死了。所以点击按钮[是否活着]会提示"我已经死了"

