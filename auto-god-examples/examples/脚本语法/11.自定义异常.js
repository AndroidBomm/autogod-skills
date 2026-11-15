try {
    console.log("尝试执行代码");
    var result = 10 / 0; // 不会抛出异常，但会得到Infinity
    console.log("除法结果:", result); // 输出: 除法结果: Infinity

    // 主动抛出异常
    throw new Error("这是一个自定义错误");
} catch (e) {
    console.log("捕获到异常:", e.message); // 输出: 捕获到异常: 这是一个自定义错误
} finally {
    console.log("无论是否异常，都会执行"); // 输出: 无论是否异常，都会执行
}