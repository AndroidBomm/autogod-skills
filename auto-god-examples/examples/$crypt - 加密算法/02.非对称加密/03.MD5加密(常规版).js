//AIGame 官方示例

//(1)准备需要加密的明文
let myData = "今天天气真好呀";

//(2)开始加密
let result = $crypt.digest(myData, "MD5", {
    input: "string",
    output: "hex"
});

alert("MD5加密",result);


//示例结束