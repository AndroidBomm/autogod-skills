var fruits = ["苹果", "香蕉", "橙子"];
console.log("数组长度:", fruits.length); // 输出: 数组长度: 3

// 添加元素
fruits.push("葡萄");
console.log("添加后数组:", fruits); // 输出: 添加后数组: 苹果,香蕉,橙子,葡萄

// 遍历数组
console.log("数组元素:");
fruits.forEach(function(fruit, index) {
    console.log("  索引" + index + ":", fruit); // 输出所有元素
});

// 数组方法
var numbers = [3, 1, 4, 1, 5];
numbers.sort();
console.log("排序后数组:", numbers); // 输出: 排序后数组: 1,1,3,4,5