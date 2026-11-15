// 电话权限组

let permits = [
    "android.permission.READ_PHONE_STATE",
    "android.permission.CALL_PHONE"
];


let has = $permit.hasPermit(permits);

if (has) {
    toast("有权限");
} else {
    toast("无权限");
}






//测试记录:
/*
【1】：模拟器
雷电    安卓9   完美
雷电    安卓7   完美


【2】：真机
OPPO A92S     安卓12     完美






*/