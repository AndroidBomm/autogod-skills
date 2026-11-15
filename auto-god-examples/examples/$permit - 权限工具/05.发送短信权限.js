//判断是否有发送短信权限
let has = $permit.hasSendSms();

if (has) {
    toast("有权限");
} else {
    toast("无权限");
    $tip.show("获取权限","是否获取权限?",()=> {
        //获取发送短信权限
        $permit.sendSms();
    });
}




//测试记录:
/*
【1】：模拟器
雷电    安卓9   完美
雷电    安卓7   完美


【2】：真机
OPPO A92S     安卓12     完美






*/