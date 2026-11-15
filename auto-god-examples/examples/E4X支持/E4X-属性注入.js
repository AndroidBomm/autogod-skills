//属性注入
var empId = "E001";
var status = "active";
var employee2 = <employee id={empId} status={status}>
    <name>{"Employee " + empId}</name>
    <created>{new Date().getFullYear()}</created>
</employee>;
console.log("属性注入: " + employee2.toXMLString());