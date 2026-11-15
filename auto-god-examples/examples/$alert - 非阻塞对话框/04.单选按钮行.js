//官方示例


$alert.create()
.title("单选")
//.msg("我是信息") 注意：使用了oneItems就不能再使用msg设置消息体了
.oneItems(
    ["选项1","选项2","选项3"],
    0 ,//默认单选中第一个
    (di,which)=> {
        info("选中了:"+which);
    })
.but3("取消")
.cancelable(false) //不允许通过点击外部自动关闭对话框
.show();


//示例结束