//AIGame 官方示例


//24小时制:选择时间对话框
$tip.time((info)=> {
    //此回调处于第三方线程
    log(info); //用log打印具体的元素
    //常用调用：
    let hour = info.hour; //时
    let minute = info.minute; //分
    //或者：
    hour = info.h; //时
    minute = info.m; //分
    //显示时间
    alert("时间",hour+":"+minute);
});




//示例结束