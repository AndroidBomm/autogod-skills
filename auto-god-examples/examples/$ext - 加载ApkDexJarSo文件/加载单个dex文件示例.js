//官方示例

//先加载dex文件
$ext.loadDex("example/$ext - 加载ApkDexJarSo文件/libs/dex/classes.dex");

//开始直接使用dex中的类(参考源代码)
let demo = new org.aigame.demo.DexDemo();

//调用类中的方法
alert("示例",demo.getStr());



//示例结束