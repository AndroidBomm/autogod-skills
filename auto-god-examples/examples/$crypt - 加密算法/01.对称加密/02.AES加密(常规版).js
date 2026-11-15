//AIGame 官方示例

//准备一个长度为16的密钥
let key = "ACSDFGHJUYDLOPSD";

//准备需要加密的明文
let text = "我是被加密的明文";

//开始加密
let result = $crypt.jiami(text,key,"AES",{
    input:"string",
    output:"base64"
});

alert("AES加密结果", result);

//开始解密
let jiemiResult = $crypt.jiemi(result,key,"AES",{
    input:"base64",
    output:"string"
});


alert("AES解密结果", jiemiResult);





//示例结束