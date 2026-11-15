//AIGame 官方示例

//生成16位的md5加密盐值
let salt = $crypt.md5Key(16);

//(1)准备加密的明文
let myData = "今天天气真好!";
//(2)开始加密
let result1 = $crypt.md516(salt,myData);//md5加密成16位结果
let result2 = $crypt.md532(salt,myData);//md5加密成32位结果

alert("MD5加密:16位",result1);
alert("MD5加密:32位",result2);



//示例结束