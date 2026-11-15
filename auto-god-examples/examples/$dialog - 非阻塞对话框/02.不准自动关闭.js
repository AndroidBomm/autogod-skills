//官方示例


$dialog.create()
.title("禁止自动关闭")
.msg("不允许通过点击外部自动关闭对话框")
.but3("取消")
.cancelable(false) //不允许通过点击外部自动关闭对话框
.show();


//示例结束