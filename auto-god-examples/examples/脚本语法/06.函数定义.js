// 命名函数
function add(a, b) {
    return a + b;
}
console.log("add(2, 3) =", add(2, 3)); // 输出: add(2, 3) = 5

// 匿名函数
var multiply = function(a, b) {
    return a * b;
};
console.log("multiply(4, 5) =", multiply(4, 5)); // 输出: multiply(4, 5) = 20

// 自执行函数
(function() {
    console.log("自执行函数被调用了"); // 输出: 自执行函数被调用了
})();