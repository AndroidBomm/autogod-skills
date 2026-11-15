//AIGame 官方示例


//选择日期
$tip.calendar((info)=> {
    //此回调处于第三方线程
    log(info); //用log打印具体的元素
    //常用调用：
    let year = info.year; //年
    let month = info.month; //月
    let day = info.day; //日
    //或者：
    year = info.y; //年
    month = info.m; //月
    day = info.d; //日
    //显示日期
    alert("日期",year+"-"+month+"-"+day);
});




//示例结束