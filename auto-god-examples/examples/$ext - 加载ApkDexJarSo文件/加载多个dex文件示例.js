//官方示例

//加载多个dex文件
let basePath = "example/$ext - 加载ApkDexJarSo文件/libs/dexs/多个dex";

//拼接目录
let paths = [
    `${basePath}/classes1.dex`,
    `${basePath}/classes2.dex`,
    `${basePath}/classes3.dex`
];

//加载多个dex文件(传入所有dex文件的路径数组即可)
$ext.loadDexs(paths);

//开始直接使用dex中的类(参考源代码)
let dex1 = new org.aigame.dex1.DexDemo();//classes1.dex
let dex2 = new org.aigame.dex2.DexDemo();//classes2.dex
let dex3 = new org.aigame.dex3.DexDemo();//classes3.dex

//调用类中的方法
alert("示例",dex1.getStr()+"\n"+dex2.getStr()+"\n"+dex3.getStr());



//示例结束