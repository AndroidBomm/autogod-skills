$tip.input("请输入颜色",(value)=> {
    $thread.run(()=>{
        alert("颜色值",$color.parse(value));
    });
});