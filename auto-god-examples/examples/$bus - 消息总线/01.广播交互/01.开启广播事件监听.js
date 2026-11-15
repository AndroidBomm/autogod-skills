//


//想要接收全局广播,必须要先注册一个广播事件监听器
//监听器的名称为`broadcast`,回调参数是`Intent`类型

$bus.event("broadcast",(intent)=>{
    log("接受到了广播:");
    let extras = intent.getExtras();
    let value = extras.get("mKey");
    log(`广播数据:${value}`);
});



//