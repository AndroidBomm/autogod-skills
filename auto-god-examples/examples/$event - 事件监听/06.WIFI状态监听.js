//官方示例


//运行此代码之后，尝试自己手动链接wifi或断开wifi，然后回来看日志
$event.on("wifiState",(data)=>{
    log("描述："+data.desc);
    log("类型："+data.value.type);
    log("原因："+data.value.reason);
    log("信息："+data.value.info);
    log("附属类型："+data.value.subtype);
    log("");//打印一行分割
});




//示例结束