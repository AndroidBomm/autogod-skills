//官方示例


$dialog.create()
.title("单选")
//.msg("我是信息") 注意：使用了moreItems就不能再使用msg设置消息体了
.moreItems(
    ["选项1","选项2","选项3"],
    [true , true , false],//默认多选中第一个和第二个
    (di,which)=> {
        info("选中了:"+which);
    })
.but3("取消")
.cancelable(false) //不允许通过点击外部自动关闭对话框
.show();


//示例结束