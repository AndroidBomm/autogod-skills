//官方示例

//运行此代码之后，尝试自己手动加减音量，然后回来看日志
$event.on("volume",(data)=>{
    log("描述："+data.desc);
    log("音量类型："+data.value.type);
    log("当前音量："+data.value.curVolume);
    log("最大音量："+data.value.maxVolume);
    log("");//打印一行分割
});




//示例结束