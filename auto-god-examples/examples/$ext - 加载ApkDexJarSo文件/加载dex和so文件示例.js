//官方示例

//先加载dex文件
$ext.loadDex({
    path:["example/$ext - 加载ApkDexJarSo文件/libs/dex_so/classes.dex"],
    so:[
        {
            //根据自己手机的情况,选正确的架构,不然so文件的C代码无法运行
            path:"example/$ext - 加载ApkDexJarSo文件/libs/dex_so/lib/arm64-v8a/libdemo.so",
            load:false,//因为在dex的类中已经静态加载了so文件,所以不能再重复加载了(安卓机制)
        }
    ]
});

//开始直接使用dex中的类(参考源代码)
let demo = new org.aigame.demo.CallC();

//调用类中的方法
alert("示例",demo.getStr());



//示例结束