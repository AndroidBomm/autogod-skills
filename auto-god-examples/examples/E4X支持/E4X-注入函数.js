
// 注入函数调用
function formatSalary(salary) {
    return "$" + salary.toLocaleString();
}

var salary = 75000;
var myEmployee = <employee>
    <name>格式化薪资</name>
    <salary>{formatSalary(salary)}</salary>
    <tax>{Math.round(salary * 0.2)}</tax>
</employee>;

console.log("注入函数: " + myEmployee.toXMLString());
