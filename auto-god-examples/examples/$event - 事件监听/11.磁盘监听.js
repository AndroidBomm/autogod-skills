//官方示例

//主要用来监听磁盘挂载、移除等事件，不算常用
$event.on("media",(data)=> {
    log("描述："+data.desc);
    log("挂载："+data.value.mount);
    log("卸载："+data.value.unmount);
    log("移除："+data.value.remove);
    log("移除操作不当："+data.value.badRemove);
    log(""); //打印一行分割
});




//示例结束