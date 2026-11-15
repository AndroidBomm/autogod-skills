//官方示例


//运行此代码之后，尝试自己手动解锁屏幕，然后回来看日志
$event.on("screenUnlock",(data)=>{
    log("描述："+data.desc);
    log("是否解锁："+data.value.screenUnlock);
    log("");//打印一行分割
});




//示例结束