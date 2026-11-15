//AIGame 官方示例

let t1 = $thread.create(()=> {
    for (let i = 0; i < 10; i++) {
        sleep("300");
        log(t1.getName()+"==>"+i);
    }
    log(t1.getName()+"执行完毕");
});

let t2 = $thread.create(()=> {
    for (let i = 0; i < 10; i++) {
        sleep("300");
        log(t2.getName()+"==>"+i);
    }
    log(t1.getName()+"执行完毕");
});

let t3 = $thread.create(()=> {
    for (let i = 0; i < 10; i++) {
        sleep("300");
        log(t3.getName()+"==>"+i);
    }
    log(t1.getName()+"执行完毕");
});



t1.start();
t2.start();
t3.start();



//示例结束