// 原始类型
console.log("undefined类型:", typeof undefined); // 输出: undefined类型: undefined
console.log("null类型:", typeof null); // 输出: null类型: object（特殊情况）
console.log("布尔类型:", typeof true); // 输出: 布尔类型: boolean
console.log("数字类型:", typeof 123); // 输出: 数字类型: number
console.log("字符串类型:", typeof "hello"); // 输出: 字符串类型: string

// 引用类型
var obj = {name: "测试对象"};
var arr = [1, 2, 3];
var func = function() {};
console.log("对象类型:", typeof obj); // 输出: 对象类型: object
console.log("数组类型:", typeof arr); // 输出: 数组类型: object
console.log("函数类型:", typeof func); // 输出: 函数类型: function