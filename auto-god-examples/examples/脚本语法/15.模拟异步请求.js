// 模拟异步操作
function fetchData(url, callback) {
    console.log("开始请求:", url);

    // 使用Java线程模拟异步延迟
    var thread = new java.lang.Thread(function() {
        try {
            // 模拟网络延迟（1秒）
            java.lang.Thread.sleep(1000);

            // 模拟返回数据
            var data = {
                url: url,
                content: "模拟从" + url + "获取的数据",
                timestamp: new Date().getTime()
            };

            // 执行回调函数
            callback(null, data);
        } catch (e) {
            callback(e, null);
        }
    });

    thread.start();
}

// 串行执行多个异步操作
console.log("开始串行异步操作");
fetchData("https://api.example.com/data1", function(err, data1) {
    if (err) {
        console.log("错误:", err);
        return;
    }
    console.log("收到数据1:", data1.content);

    fetchData("https://api.example.com/data2", function(err, data2) {
        if (err) {
            console.log("错误:", err);
            return;
        }
        console.log("收到数据2:", data2.content);
        console.log("所有异步操作完成");
    });
});

// 等待异步操作完成（Rhino会等待所有线程结束）
java.lang.Thread.sleep(2500);