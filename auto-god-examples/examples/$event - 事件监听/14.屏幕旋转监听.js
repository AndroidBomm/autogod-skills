//官方示例

//当屏幕旋转时触发
$event.on("screenDir",(data)=> {
    log("角度:",data.value.rotation);
    log("是否竖屏:",data.value.isVertical);
    log(""); //用来分隔
});


//示例结束