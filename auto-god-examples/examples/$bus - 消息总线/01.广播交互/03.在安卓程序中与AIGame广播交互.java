//(1)创建意图
Intent intent = new Intent();
//(2)指定目标(固定不变)
intent.setClassName("org.aigame.pro", "org.aigame.api.bus.receiver.AgBusReceiver");
//(3)准备数据
intent.putExtra("mKey", "我是其他应用传过来的广播");
//(4)发送广播
sendBroadcast(intent);
System.out.println("发送成功");