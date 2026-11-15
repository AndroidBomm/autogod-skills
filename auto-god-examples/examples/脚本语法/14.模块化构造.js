// 模块模式：使用立即执行函数创建独立作用域
var Calculator = (function() {
    // 私有方法
    function validateNumber(n) {
        if (typeof n !== "number" || isNaN(n)) {
            throw new Error("无效的数字: " + n);
        }
    }

    // 私有常量
    var PI = 3.1415926535;

    // 公共接口
    return {
        add: function(a, b) {
            validateNumber(a);
            validateNumber(b);
            return a + b;
        },
        multiply: function(a, b) {
            validateNumber(a);
            validateNumber(b);
            return a * b;
        },
        circleArea: function(radius) {
            validateNumber(radius);
            return PI * radius * radius;
        }
    };
})();

// 测试模块
console.log("加法结果:", Calculator.add(2, 3)); // 输出: 5
console.log("乘法结果:", Calculator.multiply(4, 5)); // 输出: 20
console.log("圆面积(半径2):", Calculator.circleArea(2)); // 输出: 12.566370614

// 尝试访问私有成员（会失败）
console.log("尝试访问私有PI:", Calculator.PI); // 输出: undefined