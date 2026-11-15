var user = {name: "李四", age: 30, hobbies: ["读书", "运动"]};
// 对象转JSON
var jsonStr = JSON.stringify(user);
console.log("JSON字符串:", jsonStr); // 输出: {"name":"李四","age":30,"hobbies":["读书","运动"]}

// JSON转对象
var parsedUser = JSON.parse(jsonStr);
console.log("解析后的对象:", parsedUser.name); // 输出: 解析后的对象: 李四