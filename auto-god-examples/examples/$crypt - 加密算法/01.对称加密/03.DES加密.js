//AIGame 官方示例


let key = "ACSDFGHJ";
let text = "我是被加密的明文";


let result = $crypt.jiami(text,key,"DES",{
    input:"string",
    output:"base64"
});

alert("DES加密",result)

let result2 = $crypt.jiemi(result,key,"DES",{
    input:"base64",
    output:"string"
});


alert("DES解密",result2)









//示例结束