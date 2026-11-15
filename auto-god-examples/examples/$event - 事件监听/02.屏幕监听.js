//官方示例

//运行此代码之后，尝试自己手动关闭屏幕，然后回来看日志
$event.on("screen",(data)=>{
    //除了监听，你也可以使用 $screen.isScreenOn() 函数判断屏幕是否点亮
    log("描述："+data.desc);
    log("是否点亮："+data.value.screenOn);
    log("是否关闭："+data.value.screenOff);
    log("");//打印一行分割
});




//示例结束