//官方示例


//运行此代码之后，尝试自己手动联网或关闭网络，然后回来看日志
$event.on("net",(data)=>{
    //此方法不是专门针对wifi做的监听，所以wifi关闭时未必会回调这里
    //如果想专门监听wifi请移步到下一个示例[05.WIFI监听.js]
    log("描述："+data.desc);
    log("网络类型："+data.value.type);//常用
    log("链接状态："+data.value.connect);//常用
    log("原因："+data.value.type);
    log("附属类型："+data.value.subtype);
    log("信息："+data.value.info);
    log("");//打印一行分割
});




//示例结束