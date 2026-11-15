[TOC]

##### 简要描述

-有时候无法确定设备cup架构，特别是模拟器，就可以将需要的架构合并，比如合并 x86和x86_64，也可根据需要合并真机的


##### 教程

##1.用ec创建一个插件工程
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=52a16cdb9911876d7e54454583288b64)
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=0d393ad48d304c6d2b42ff61e1f941b3)

##2.找到插件混合模式里有对应的SO和jar
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=9853a5cd32d4f0ee056d3fcbe7f07e1c)

##3.将newJar放入jarlibs文件夹里，将需要的so放入solibs文件夹里（包括文件夹）
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=41773dd9a209ad68879204f3502d4943)

##4.用ec编译apk插件 ，如果报错：java: 程序包android.content不存在， 右键android.jar添加为库
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=5fa04478bf18ae9b96f5f0e6023822ce)

##5.如果报错：java: 程序包android.content不存在， 右键android.jar添加为库,没有就跳过

![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=1ec4cd32c064f2e20e6521871cd3aeb5)

##6.编译完成（如果因为第5步的错误导致无法编译 重启idea试试）
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=dca74afeebf30d694754b14f1db513e9)
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=1a1cd42643a40071321b0198d9756541)

###7.将OperHandler.js里的自己所选择的加载方式里的apk名称改成自己的既可（根据自己选择的so类型修改）
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=bae9cd87031f179a7878b1076c1e301a)
![](http://101.132.90.216/server/index.php?s=/api/attachment/visitFile&sign=dce7b66674d917297d44deef1e9c2b79)
##### 备注
