//官方示例

//先加载apk文件
$ext.loadApk("example/$ext - 加载ApkDexJarSo文件/libs/apk/lib.apk");

//开始直接使用apk中的类(参考源代码)
let demo = new org.aigame.apk.ApkDemo();

//调用类中的方法
alert("示例",demo.getStr());



//示例结束