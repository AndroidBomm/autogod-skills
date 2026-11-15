// var声明（函数作用域）
var globalVar = "我是全局变量";
function testVar() {
    var funcVar = "我是函数内变量";
    console.log("函数内var变量:", funcVar); // 输出: 函数内var变量: 我是函数内变量
}
testVar();
console.log("全局var变量:", globalVar); // 输出: 全局var变量: 我是全局变量

// let声明（块级作用域）
let blockLet = "块外let变量";
if (true) {
    let blockLet = "块内let变量";
    console.log("块内let变量:", blockLet); // 输出: 块内let变量: 块内let变量
}
console.log("块外let变量:", blockLet); // 输出: 块外let变量: 块外let变量

// const声明（常量）
const PI = 3.14159;
console.log("常量PI:", PI); // 输出: 常量PI: 3.14159
// PI = 3.14; // 报错：常量不能重新赋值