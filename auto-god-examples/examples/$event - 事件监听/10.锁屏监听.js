//官方示例

//手动锁屏再解锁，最后观察日志
$event.on("lock",(data)=> {
    //lock事件并非是一个专门监听屏幕事件的监听器
    //如果你想监听屏幕事件，请移步[02.屏幕监听.js]
    //除了监听，你也可以使用 $device.isLock() 来判断设备是否锁定
    log("描述："+data.desc);
    log("是否锁屏："+data.value.lock);
    log("屏幕点亮："+data.value.screenOn);
    log("屏幕熄灭："+data.value.screenOff);
    log(""); //打印一行分割
});




//示例结束