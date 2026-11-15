//以下是auto.js的代码,无法在aigame中执行

app.sendBroadcast({
    packageName: "org.aigame.pro",
    className: "org.aigame.api.bus.receiver.AgBusReceiver",
    extras: {
        mKey: "我是auto.js发送的广播数据",
    } ,
});


//