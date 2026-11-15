//官方示例

//获取应用访问权限
if (!$permit.hasNotifyAccess()) {
    $permit.notifyAccess();
} else {
    //通知监听 需要授予通知访问权限才能监听到通知
    $event.on("notify",(data)=> {
        log("包名:",data.value.pkg);
        log("标题:",data.value.title);
        log("内容:",data.value.text);
        log("副文本:",data.value.subText);
        log("提示文本:",data.value.tickerText);
        log("大文本:",data.value.bigText);
        log("时间:",data.value.postTime);
        log("是否为持续通知:",data.value.isOngoing);
        log("是否可清除:",data.value.isClearable);
        log(""); //用来分隔
    });
}



//示例结束