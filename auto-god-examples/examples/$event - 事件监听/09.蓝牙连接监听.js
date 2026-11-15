//官方示例

//安卓6-11要位置权限 安卓12要蓝牙权限
let ps = ["android.permission.ACCESS_FINE_LOCATION","android.permission.BLUETOOTH_CONNECT"];

if ($permit.hasPermit(ps)) {
    log("权限满足");
} else {
    $permit.getPermit(ps);
}


//可以尝试连接蓝牙耳机，观察日志信息
$event.on("bluetooth",(data)=> {
    log("描述："+data.desc);
    log("是否连接："+data.value.connect);
    log("是否开启："+data.value.on);
    log("是否关闭："+data.value.off);
    log("正在开启："+data.value.starting);
    log("正在关闭："+data.value.closing);

    if (data.value.address != null) {
        log("连接MAC地址: "+data.value.address);
    }

    //需要蓝牙权限:如果没有就是null
    if (data.value.name != null) {
        log("设备名称: "+data.value.name);
    }

    //需要蓝牙权限并且安卓11+:如果没有就是null
    if (data.value.alias != null) {
        log("设备别名: "+data.value.alias);
    }

    log(""); //打印一行分割
});




//示例结束