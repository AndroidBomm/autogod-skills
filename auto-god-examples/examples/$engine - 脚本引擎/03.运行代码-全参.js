//官方示例

//定义脚本路径
let path = "/example/$engine - 脚本引擎/test/run.js";
//读取脚本文件
let code = $file.read(path);
//执行脚本代码
$engine.runCode(path, code);


//示例结束