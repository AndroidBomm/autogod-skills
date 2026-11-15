//AIGame 官方示例


//生成密钥对
let keyPair = $crypt.generateKeyPair("DSA", 1024);


alert("DSA密钥信息", keyPair);

log("签名:"); 
//数字签名只能用私钥进行签名
let signData = $crypt.sign("我是被签名的内容", keyPair.privateKey, "DSA", {
    input: "string",
    output: "byte"
});

//由于输出的是数组,所以使用join方法转换成字符串
alert("DSA签名结果", signData.join());

log("验证:"); 
//数字签名只能用公钥进行验证
let verified = $crypt.verify("我是被签名的内容",signData, keyPair.publicKey, "DSA", {
    //(1)这个配置是签名时的配置(需要和上面sign参数保持一致)
    input: "string",
    output: "byte"
},{
    //(2)这个配置是验证的数据配置
    //输入签名的类型
    input: "byte",
});


alert("DSA验证结果", verified);





//示例结束