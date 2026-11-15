var text = "Rhino 1.8.0 is a JavaScript engine";
var pattern = /Rhino/;
console.log("是否匹配:", pattern.test(text)); // 输出: 是否匹配: true

var versionPattern = /\d+\.\d+\.\d+/;
console.log("版本号:", text.match(versionPattern)); // 输出: 版本号: 1.8.0

var globalPattern = /s/g;
console.log("全局匹配:", text.match(globalPattern)); // 输出: 全局匹配: s,s