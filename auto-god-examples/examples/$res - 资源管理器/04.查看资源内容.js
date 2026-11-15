//AIGame 官方示例

//(1)加载资源对象(指定名称)
let res = $res.create("我的资源");

//(2)获得资源内容
let content = res.cat();

$tip.show("资源内容", content, null);


//示例结束