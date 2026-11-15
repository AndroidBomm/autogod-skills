let ui = $ui.layout("example/拓展示例/03.DeepSeek对话/xml/main.xml");
ui.show(); //显示界面

//[存储]
let storage = $storage.create("org.aigame.demo.deepseek");

//[组件]
let mAppbar = ui.id("mAppbar"); //应用条
let nested = ui.id("nested"); //显示对话内容的
let layout = ui.id("layout"); //显示对话内容的

mAppbar.back(()=> {
    ui.finish();
});

mAppbar.menu((title)=> {
    if (title == "清除") {
        $tip.show("清除对话","确认清空对话内容吗？",()=> {
            //清空所有布局
            layout.removeAll();
        });
    }
    if (title == "设置") {
        $tip.input("Api Key",(value)=> {
            if ($str.isEmpty(value)) {
                toast("不允许输入空值");
                return;
            }
            storage.put("apiKey",value);
        });
    }
});


//(1)创建deepseek对话视图
let createDsView = function(content) {
    let ui = $ui.layout("example/拓展示例/03.DeepSeek对话/xml/DeepSeek.xml");
    ui.id("content").setText(content);
    return {
        ui: ui,
        view: ui.getView()
    };
}

//(2)创建我的对话视图
let createMwView = function(content) {
    let ui = $ui.layout("example/拓展示例/03.DeepSeek对话/xml/Mine.xml");
    ui.id("content").setText(content);
    return ui.getView();
}

//(3)请求调用
let requireContent = function(apiKey,content) {
    let res = $http.post({
        url: "https://api.deepseek.com/chat/completions",
        readTimeout: 60,//deepseek响应有时候会很慢，如果超时了，就设置这个
        head: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+apiKey,//输入ApiKey
        },
        data: {
            model: "deepseek-chat",
            messages: [{
                role: "system",
                content: "你是一个智能生活助手"
            },
                {
                    role: "user",
                    //我的对话内容：
                    content: content
                }],
            stream: false
        }
    });

    //解析json内容
    let data = res.json();

    return data.choices[0].message.content;
}

//(4)滑动NestedScrollView到最底部
let scrollBottom = function() {
    //通过安卓原生类的post函数，可以直接发送一条ui线程事件(确保视图刷新后在ui线程中调用)
    layout.getView().post(()=> {
        let nestedScrollView = nested.getView(); //获取原生对象
        //要滑动到的高度
        let toH = layout.getH();
        //开始滑动
        nestedScrollView.smoothScrollTo(0,toH);
        //调用安卓原生类{NestedScrollView}的smoothScrollTo方法(请参考安卓api)
    });
}


//输入内容
ui.id("input").click((view)=> {
    //判断ApiKey是否是空的
    let apiKey = storage.get("apiKey","");
    if ($str.isEmpty(apiKey)) {
        alert("ApiKey为空","请前往DeepSeek官网申请ApiKey后，点击右上角设置图标，配置ApiKey内容。\n类似于：sk-c4c165374f72bbf90f6326f 这样的字符串");
        return null;
    }
    $tip.input("输入内容",(value)=> {
        if ($str.isEmpty(value)) {
            return null;
        }
        //创建我的对话视图
        layout.addView(createMwView(value));
        //创建deepseek对话视图
        let dsView = createDsView("正在思考...");
        layout.addView(dsView.view);
        //网络请求不允许在ui线程中进行，于是就用线程
        $thread.run(()=> {
            //调用请求
            let answer = requireContent(apiKey,value);
            //设置回答
            dsView.ui.id("content").setText(answer);
            //滑动到底部
            scrollBottom();
        });
    });
});





//..