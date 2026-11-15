var now = new Date();
console.log("当前日期:", now.toLocaleString()); // 输出本地日期时间
console.log("时间戳:", now.getTime()); // 输出毫秒级时间戳
console.log("年份:", now.getFullYear()); // 输出当前年份
console.log("月份:", now.getMonth() + 1); // 输出当前月份（注意月份从0开始）