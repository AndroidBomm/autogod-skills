// for循环
console.log("for循环:");
for (var i = 1; i <= 3; i++) {
    console.log("  循环次数:", i); // 依次输出1, 2, 3
}

// for-in循环
var person = {name: "张三", age: 20, gender: "男"};
console.log("for-in循环:");
for (var key in person) {
    console.log("  " + key + ":", person[key]); // 输出所有属性
}

// while循环
console.log("while循环:");
var count = 0;
while (count < 3) {
    console.log("  计数:", count); // 依次输出0, 1, 2
    count++;
}