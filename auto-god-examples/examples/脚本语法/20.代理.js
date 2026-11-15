var target = {
    name: 'John',
    age: 30
};

var handler = {
    get: function(target, property) {
        console.log(`Getting property ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        console.log(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

var proxy = new Proxy(target, handler);
console.log(proxy.name);
proxy.age = 31;
