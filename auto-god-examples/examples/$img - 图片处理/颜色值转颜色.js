$tip.input("请输入颜色值",(value)=> {
    $thread.run(()=>{
        alert("颜色代码",$color.str(value * 1));
    });
});

