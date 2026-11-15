//AIGame 官方示例


for (let i = 0; i < 10; i++) {
    sleep(1000);
    toast("我还活着");
    if (i == 3) {
        //每个脚本都会内置一个独属于自己的$task对象，代表当前脚本任务
        $task.stop();
    }
}



//示例结束