//AIGame 官方示例

//(1)判断是否获取无障碍权限
let has = $act.hasPermit();

//(2)如果没有取无障碍，则获取权限
if (has) {
    log("已经获得无障碍权限");
} else {
    log("请求获取无障碍权限");
    $act.getPermit();
}


//示例结束