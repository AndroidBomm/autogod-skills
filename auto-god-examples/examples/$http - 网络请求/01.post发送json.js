//此示例的服务器我已经临时搭建,可以直接运行看到效果

let ip = "47.105.110.90";
let port = "8347";
let mode = "postJson";

let res = $http.post({
    url: `http://${ip}:${port}/org/aigame/pro/example/${mode}`,
    //直接发送json对象或者json字符串也可以
    data: {
        sex:"女"
    },
});


alert("结果",res.str());