//AIGame 官方示例

let curActivity = $act.activity(); //获得当前界面类名
log(curActivity);

//设置界面变化监听(你可以打开其他软件界面,看看日志信息)
$act.activity((name)=> {
    log("当前界面:",name);
});

//20秒后关闭界面变化监听
sleep(20000);

//关闭界面变化监听
$act.activity(null);

//示例结束