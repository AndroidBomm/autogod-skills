// 对象字面量
var car = {
    brand: "特斯拉",
    price: 300000,
    run: function() {
        console.log(this.brand + "正在行驶");
    }
};
console.log("汽车品牌:", car.brand); // 输出: 汽车品牌: 特斯拉
console.log("汽车价格:", car["price"]); // 输出: 汽车价格: 300000
car.run(); // 输出: 特斯拉正在行驶


car.showType = function() {
    return typeof this;
};
console.log("car的类型:", car.showType()); // 输出: car的类型: object