//开头先清空所有
$draw.closeAll();
sleep(1000);

//设置速度
let speed = 3;

//动态的绘制一个点
for (let i = 0; i < $screen.getWidth(); i += speed) {
    $draw.dot(i, 500);
    //显示10毫秒后再清空(时间太短了就看不到绘制的内容了)
    sleep(10);
    //[重要]这个函数不会销毁悬浮窗，只会清空绘制
    $draw.clear();
}

//结尾再清空所有
sleep(1000);
$draw.closeAll();//这个函数会销毁悬浮窗
