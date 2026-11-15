// 注入变量
var name = "John";
var age = 30;
var dept = "IT";

// 注入到元素内容中
var employee1 = <employee id="1">
    <name>{name}</name>
    <age>{age}</age>
    <department>{dept.toUpperCase()}</department>
</employee>;

console.log("注入变量: " + employee1.toXMLString());
