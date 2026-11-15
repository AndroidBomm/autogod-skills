// 检查字符串是否包含邮箱格式的文本
const strWithEmail = "Contact me at test@example.com";
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
const hasEmail = emailRegex.test(strWithEmail);
console.log(`字符串是否包含邮箱: ${hasEmail}`);

// 提取字符串里的所有数字
const strWithNumbers = "There are 12 apples and 3 bananas";
const numberRegex = /\d+/g;
const numbers = strWithNumbers.match(numberRegex);
console.log("提取到的数字: "+ numbers);
