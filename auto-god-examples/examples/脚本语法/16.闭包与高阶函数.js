// 闭包实现计数器工厂
function createCounter(initialValue) {
    var count = initialValue; // 私有变量（闭包保存）

    return {
        increment: function(step) {
            count += (step || 1);
            return count;
        },
        decrement: function(step) {
            count -= (step || 1);
            return count;
        },
        getCount: function() {
            return count;
        },
        reset: function() {
            count = initialValue;
        }
    };
}

// 创建两个独立计数器
var counter1 = createCounter(0);
var counter2 = createCounter(100);

console.log("counter1初始值:", counter1.getCount()); // 输出: 0
console.log("counter1+3:", counter1.increment(3)); // 输出: 3
console.log("counter1-1:", counter1.decrement()); // 输出: 2

console.log("counter2初始值:", counter2.getCount()); // 输出: 100
console.log("counter2+50:", counter2.increment(50)); // 输出: 150

// 高阶函数：函数作为参数
function processNumbers(numbers, processor) {
    var result = [];
    for (var i = 0; i < numbers.length; i++) {
        result.push(processor(numbers[i]));
    }
    return result;
}

var numbers = [1, 2, 3, 4];
var squared = processNumbers(numbers, function(n) {
    return n * n;
});
console.log("平方处理结果:", squared); // 输出: [1, 4, 9, 16]

var doubled = processNumbers(numbers, function(n) {
    return n * 2;
});
console.log("加倍处理结果:", doubled); // 输出: [2, 4, 6, 8]