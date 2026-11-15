// 1. 解析URL
var url = "https://www.example.com:8080/path?name=test&age=20#fragment";
var urlPattern = /^(\w+):\/\/([\w.]+):?(\d*)?([^?#]+)?\??([^#]*)?#?(.*)?$/;

var matches = url.match(urlPattern);
if (matches) {
    console.log("URL解析结果:");
    console.log("  协议:", matches[1]); // 输出: https
    console.log("  域名:", matches[2]); // 输出: www.example.com
    console.log("  端口:", matches[3] || "默认"); // 输出: 8080
    console.log("  路径:", matches[4]); // 输出: /path
    console.log("  查询参数:", matches[5]); // 输出: name=test&age=20
    console.log("  锚点:", matches[6]); // 输出: fragment
}

// 2. 复杂替换（驼峰命名转下划线）
function camelToUnderscore(str) {
    return str.replace(/([A-Z])/g, function(match, p1, offset) {
        return (offset > 0 ? "_" : "") + p1.toLowerCase();
    });
}

var testStr = "userName ageInYears isActive";
console.log("驼峰转下划线:", camelToUnderscore(testStr));
// 输出: user_name age_in_years is_active

// 3. 验证邮箱格式
function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

var emails = ["test@example.com", "invalid-email", "user.name+tag@domain.co"];
emails.forEach(function(email) {
    console.log("邮箱'" + email + "'是否有效:", validateEmail(email));
});
// 输出:
// 邮箱'test@example.com'是否有效: true
// 邮箱'invalid-email'是否有效: false
// 邮箱'user.name+tag@domain.co'是否有效: true