
//如果没有无障碍权限，则会获取录屏权限
if(!$act.hasPermit()){
    //阻塞方法:直到获取录屏权限为止，才会继续向下执行代码
    $screen.getPermit();
}

//获取悬浮窗权限
$floaty.getPermit();
//把图片显示在屏幕上
$img.show("example/$color - 颜色工具/01.图片找色/p01.png")
//截屏并且找颜色
sleep(1000);//显示图片需要时间,所以延迟一秒
let screenImg = $screen.getScreen();//如果有无障碍就会使用无障碍来截屏
//第4个参数因为我不知到具体的范围所以就空着(默认全屏查找)
let result = $color.find(screenImg,"#d87d83");
if(result!=null){
    $draw.dot(result);//绘制结果位置
    $draw.log(result);//屏幕显示位置
    sleep(3000);
    $draw.closeAll();//关闭绘制
}
