//官方示例


//运行此代码之后，尝试自己手动链接wifi或断开wifi，然后回来看日志
$event.on("wifi",(data)=>{
    log("描述："+data.desc);
    log("是否启用："+data.value.enable);
    log("正在启用："+data.value.enabling);
    log("是否禁用："+data.value.disable);
    log("正在禁用："+data.value.disabling);
    log("");//打印一行分割
});




//示例结束