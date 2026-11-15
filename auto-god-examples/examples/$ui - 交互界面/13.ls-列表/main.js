//解析布局获得ui对象
let ui = $ui.layout("example/$ui - 交互界面/13.ls-列表/ui.xml");
//返回按钮
ui.id("mAppbar").back(()=> {
    ui.finish();
});
//显示界面
ui.show();

//获取列表控件
let ls = ui.id("mLs");
//设置绑定数据(优先调用)
ls.bindHolder((holder,data,position)=> {
    //适配器会不断的创建layout标签中的视图放在holder中
    let tv = holder.id("mText");
    //data就是通过ls.flush传入进来的数组元素
    tv.setText(data);

    //[删除按钮]
    holder.id("delBut").click(()=> {
        $tip.show("删除","确定删除："+data+"吗?",()=> {
            //删除指定下标的元素
            ls.del(position);
        });
    });

    //[修改按钮]
    holder.id("edtBut").click(()=> {
        $tip.input("修改名称",data,(value)=> {
            //修改指定下标的元素
            ls.flush(value,position);
        });
    });
});
//设置一些基础的元素
ls.flush(["张三","李四","王五"]);

//获取按钮(点击就添加一个元素进去)
let i = 0;
ui.id("mAppbar").menu((title)=> {
    if (title == "添加元素") {
        i++;
        //列表添加一个数据
        ls.add("数据"+i);//还有一个函数 ls.add("数据",1); 添加到指定的位置中
        //列表滚动到最底部
        ls.scrollBottom();//还有函数 scrollTop() 滚动到顶部 scroll(index) 滚动到指定位置
    }
});



//..