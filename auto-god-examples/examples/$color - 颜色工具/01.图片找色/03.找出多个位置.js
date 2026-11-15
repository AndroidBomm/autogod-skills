
//如果没有无障碍权限，则会获取录屏权限
if(!$act.hasPermit()){
    //阻塞方法:直到获取录屏权限为止，才会继续向下执行代码
    $screen.getPermit();
}

//获取悬浮窗权限
$floaty.getPermit();
//把图片显示在屏幕上
$img.show("example/$color - 颜色工具/01.图片找色/p02.png")
//截屏并且找颜色
sleep(1000);//显示图片需要时间,所以延迟一秒
let screenImg = $screen.getScreen();//如果有无障碍就会使用无障碍来截屏
//只用两个参数其他的默认
let result = $color.findAll(screenImg,"#d28384");
if(result!=null){
    for(let index of result){
        $draw.dot(index);//绘制位置的点
        $draw.log(index);//屏幕显示位置
        sleep(300);
    }
    //3秒后关闭悬浮绘制
    sleep(5000);
    $draw.closeAll();
}
