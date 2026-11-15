function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
}

var gen = generatorFunction();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
