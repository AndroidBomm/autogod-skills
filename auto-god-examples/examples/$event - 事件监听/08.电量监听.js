//官方示例

//主要监听电池电量:电量百分比等等
$event.on("battery",(data)=>{
    log("描述："+data.desc);
    log("电量百分比："+data.value.percent);
    log("是否充电："+data.value.isCharge);
    log("充电方式："+data.value.chargeType);
    log("");//打印一行分割
});




//示例结束