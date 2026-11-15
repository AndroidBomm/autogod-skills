//官方示例

//加载多个jar文件
let basePath = "example/$ext - 加载ApkDexJarSo文件/libs/jars/多个jar文件";

//拼接目录
let paths = [
    `${basePath}/classes1.jar`,
    `${basePath}/classes2.jar`,
    `${basePath}/classes3.jar`
];

//加载多个jar文件(传入所有jar文件的路径数组即可)
$ext.loadJars(paths);

//开始直接使用jar中的类(参考源代码)
let jar1 = new org.aigame.jar1.JarDemo();//classes1.jar
let jar2 = new org.aigame.jar2.JarDemo();//classes2.jar
let jar3 = new org.aigame.jar3.JarDemo();//classes3.jar

//调用类中的方法
alert("示例",jar1.getStr()+"\n"+jar2.getStr()+"\n"+jar3.getStr());



//示例结束