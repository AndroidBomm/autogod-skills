// AIGame官方示例


//如果没有无障碍权限，则会获取录屏权限
if(!$screen.hasPermit()){
    //阻塞方法:直到获取录屏权限为止，才会继续向下执行代码
    $screen.getPermit();
}

//如果有无障碍则会优先使用无障碍截屏，否则就使用录屏权限截屏
let img = $screen.getScreen();//获得屏幕截屏

if(img!=null){
    img.show();//显示截屏
}


// 示例结束