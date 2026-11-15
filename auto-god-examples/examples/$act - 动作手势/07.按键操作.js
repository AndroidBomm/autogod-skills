//AIGame 官方示例
sleep(2000);
$draw.i("执行操作:$act.home()");
$act.home();

sleep(2000);
$draw.i("执行操作:$act.menu()");
$act.menu();//此函数和recen()t函数效果一致

sleep(2000);
$draw.i("执行操作:$act.back()");
$act.back();

sleep(2000);
$draw.i("执行操作:$act.power()");
$act.power();

sleep(2000);
$draw.i("执行操作:$act.back()");
$act.back();

sleep(2000);
$draw.i("执行操作:$act.settings()");
//打开设置界面
$act.settings();

sleep(2000);
$draw.i("返回主页");
$act.home();

sleep(2000);
$draw.i("执行操作:$act.notifications()");
//打开通知
$act.notifications();

sleep(2000);
$draw.i("返回主页");
$act.home();


sleep(2000);
$draw.closeLog();


//示例结束