// 构造函数
function Animal(name) {
    this.name = name;
}

// 原型方法
Animal.prototype.speak = function() {
    console.log(this.name + ' makes a noise.');
};

// 子类构造函数
function Dog(name) {
    Animal.call(this, name);
}

// 继承原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 重写方法
Dog.prototype.speak = function() {
    console.log(this.name + ' barks.');
};

var dog = new Dog('Buddy');
dog.speak();
