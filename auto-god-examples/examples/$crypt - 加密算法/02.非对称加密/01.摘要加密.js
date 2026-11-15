//AIGame 官方示例

//获得所有哈希算法的名称
let digests = $crypt.digests();

//每个算法都用一遍
for (let i = 0; i < digests.size(); i ++) {

    //(1)准备需要加密的明文
    let myData = "今天天气真好呀";
    //(2)准备用到的算法名称
    let algorithm = digests.get(i);
    let result = $crypt.digest(myData, algorithm, {
        input: "string",
        output: "hex"
    });
    
    alert("算法:"+algorithm,"加密后的数据:\n"+result);
    
}




//示例结束