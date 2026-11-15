//AIGame 官方示例

//(1)准备16位密钥
let key = $crypt.aesKey();

//(2)准备要加密的明文
let myData = "今天天气真好!";

//(3)开始加密
let jiamiResult = $crypt.aesJiami(myData, key);

alert("AES加密结果", jiamiResult);

//(4)开始解密
let jiemiResult = $crypt.aesJiemi(jiamiResult, key);

alert("AES解密结果", jiemiResult);




//示例结束