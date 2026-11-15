//


let intent = $app.newIntent({
    action: "org.aigame.pro.bus.action",
    // 随便写点数据,一会而$bus会接收到广播,在里面获取这个数据
    extras: [{
        name: "mKey",
        value: "哈哈哈"
    } ],
    // 指定接受端的应用(固定写法)
    component: {
        cls: "org.aigame.api.bus.receiver.AgBusReceiver",
        pkg: "org.aigame.pro"
    }
});

//然后发送广播
$app.sendBroadcast(intent,"org.aigame.pro.bus.permission");



//
