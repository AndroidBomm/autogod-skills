// 示例1：基本类型检查
function Animal(name) {
    this.name = name;
}

// 创建Animal实例
var dog = new Animal("小狗");
var cat = new Animal("小猫");
var notAnimal = {name: "不是动物"};

print(dog instanceof Animal);  // 输出 true（dog是Animal的实例）
print(cat instanceof Animal);  // 输出 true（cat是Animal的实例）
print(notAnimal instanceof Animal);  // 输出 false（不是通过Animal构造的）


// 示例2：继承关系中的类型检查
function Mammal(name) {
    Animal.call(this, name);
}
// 实现继承
Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

function Bird(name) {
    Animal.call(this, name);
}
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;

var lion = new Mammal("狮子");

print(lion instanceof Mammal);  // 输出 true（直接实例）
print(lion instanceof Animal);  // 输出 true（继承自Animal）
print(lion instanceof Bird);    // 输出 false（不属于Bird分支）


// 示例3：原生对象类型检查
var arr = [1, 2, 3];
var date = new Date();
var func = function() {};
var strObj = new String("hello");
var strPrim = "hello";  // 字符串字面量（基本类型）

print(arr instanceof Array);    // 输出 true
print(date instanceof Date);    // 输出 true
print(func instanceof Function); // 输出 true
print(strObj instanceof String); // 输出 true（对象类型）
print(strPrim instanceof String); // 输出 false（基本类型不是实例）


// 示例4：特殊情况处理
var nullVal = null;
var undefVal = undefined;

print(nullVal instanceof Object);  // 输出 false（null不是任何对象的实例）
print(undefVal instanceof Object); // 输出 false（undefined不是任何对象的实例）
