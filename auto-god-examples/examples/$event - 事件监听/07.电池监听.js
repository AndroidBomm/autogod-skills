//官方示例

//主要监听电池电量相关的事件：充电器链接、电量低、电量恢复等事件
$event.on("power",(data)=>{
    log("描述："+data.desc);
    log("充电器链接："+data.value.connect);
    log("电量过低："+data.value.low);
    log("电量恢复："+data.value.okay);
    log("");//打印一行分割
});




//示例结束