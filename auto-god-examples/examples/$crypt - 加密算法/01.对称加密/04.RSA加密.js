//AIGame 官方示例




//生成密钥对
let keyPair = $crypt.generateKeyPair("RSA", 1024);

alert("RSA密钥信息", keyPair);

log("使用私钥加密");
let jiamiStr = $crypt.jiami("我是被加密的内容", keyPair.privateKey, "RSA/ECB/PKCS1Padding", {
    input: "string",
    output: "base64"
});
log(jiamiStr);

alert("RSA加密结果", jiamiStr);

log("使用公钥解密");
let jiemiStr = $crypt.jiemi(jiamiStr, keyPair.publicKey, "RSA/ECB/PKCS1Padding", {
    input: "base64",
    output: "string"
});
log(jiemiStr);


alert("RSA解密结果", jiemiStr);



//示例结束