function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

var double = multiplyBy(2);
var triple = multiplyBy(3);

console.log(double(5));
console.log(triple(5));
