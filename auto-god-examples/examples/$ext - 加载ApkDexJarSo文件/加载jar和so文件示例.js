//官方示例


//先加载jar文件
$ext.loadJar({
    path:["example/$ext - 加载ApkDexJarSo文件/libs/jar_so/classes.jar"],
    so:[
        {
            //根据自己手机的情况,选正确的架构,不然so文件的C代码无法运行
            path:"example/$ext - 加载ApkDexJarSo文件/libs/jar_so/lib/arm64-v8a/libdemo.so",
            load:false,//因为在jar的类中已经静态加载了so文件,所以不能再重复加载了(安卓机制)
        }
    ]
});

//开始直接使用jar中的类(参考源代码)
let demo = new org.aigame.demo.JarCallC();

//调用类中的方法
alert("示例",demo.getStr());



//示例结束