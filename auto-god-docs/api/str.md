# $str - 字符串操作

- 更新时间:2026-04-10 18:08:36

字符操作

一些常用的字符串工具函数

### getBytes(str, encoding)

转字节(指定编码)

- 参数 : str {string} 字符串

- 参数 : encoding {string} 编码格式

- 返回 : {byte[]} 字节数组

- 版本 : 1.0.0

```javascript
let strBytes = $str.getBytes("字符串","utf-8");
log("字节数组",strBytes);

```
### getBytes(str)

转字节

- 参数 : str {string} 字符串

- 返回 : {byte[]} 字节数组

- 版本 : 1.0.0

```javascript
let strBytes = $str.getBytes("字符串");
log("字节数组",strBytes);

```
### extractNumbers(str)

提取数字

将提取出来的数字使用','号分割，返回一个这样的字符串

- 参数 : str {string} 字符串

- 返回 : {string} 提取的数字(用","号分割)

- 版本 : 1.0.0

```javascript
let nums = $str.extractNumbers("22字符33串44");
alert("提取数字",nums);

```
### decodeBase64(str, encoding)

Base64解码为明文

- 参数 : str {string} Base64 字符串

- 参数 : encoding {string} 编码格式

- 返回 : {string} 解码后的原始字符串

- 版本 : 1.0.0

```javascript
//先把字符串转换为base64编码
let base64Str = $str.encodeBase64("我是字符串","utf-8");
//再把base64解码为正常的明文
let str = $str.decodeBase64(base64Str,"utf-8");
alert("base64字符串",str);

```
### decodeBase64(str)

Base64解码为明文

默认使用的编码为UTF-8

- 参数 : str {string} Base64 字符串

- 返回 : {string} 解码后的原始字符串

- 版本 : 1.0.0

```javascript
//先把字符串转换为base64编码
let base64Str = $str.encodeBase64("我是字符串");
//再把base64解码为正常的明文
let str = $str.decodeBase64(base64Str);
alert("base64字符串",str);

```
### encodeBase64(str, encoding)

编码为Base64

- 参数 : str {string} 要编码的字符串

- 参数 : encoding {string} 编码格式

- 返回 : {string} 编码后的 Base64 字符串

- 版本 : 1.0.0

```javascript
let base64Str = $str.encodeBase64("我是字符串","utf-8");
alert("base64字符串",base64Str);

```
### encodeBase64(str)

编码为Base64

- 参数 : str {string} 要编码的字符串

- 返回 : {string} 编码后的 Base64 字符串

- 版本 : 1.0.0

```javascript
let base64Str = $str.encodeBase64("我是字符串","utf-8");
alert("base64字符串",base64Str);

```
### strToHex(str)

字符串转16进制

- 参数 : str {String} 字符串

- 返回 : {String} 16进制字符串

- 版本 : 1.9.7

```javascript
let str = $str.strToHex("我是字符串");
log("16进制字符串:",str);

```
### hexToStr(dexStr)

16进制转字符串

- 参数 : dexStr {String} 16进制字符串

- 返回 : {String} 字符串

- 版本 : 1.9.7

```javascript
let src = $str.hexToStr("e68891e698afe5ad97e7aca6e4b8b2");
log("原字符串:",src);//我是字符串

```
### uriEncode(str)

Uri编码

- 参数 : str {string} 要编码的字符串

- 返回 : {string} 编码后的 Uri 字符串

- 版本 : 1.3.7

### uriDecode(str)

Uri解码

- 参数 : str {string} 要解码的字符串

- 返回 : {string} 解码后的字符串

- 版本 : 1.3.7

### random(str)

随机字符

- 参数 : str {string]} 字符串

- 返回 : {string} 随机选择的字符串

- 版本 : 1.0.0

```javascript
//在输入的字符串中随机获取某个字符
for (let i = 0; i < 20; i++) {
    let str = $str.random("abcdefghijk");
    log(str);
}

```
### random(strList)

随机字符表

- 参数 : strList {string[]} 字符串列表

- 返回 : {string} 随机选择的字符串

- 版本 : 1.0.0

```javascript
//在输入的字符列表中随机获取某个元素
for (let i = 0; i < 20; i++) {
    let str = $str.random(["abc","defg","hijk"]);
    log(str);
}

```
### isBlank(str)

是否为空白

- 参数 : str {string} 要判断的字符序列

- 返回 : {boolean} 如果字符序列为空白则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.isBlank("    a "));//false
log($str.isBlank("     "));//true

```
### isNotBlank(str)

是否不是空白

- 参数 : str {string} 要判断的字符序列

- 返回 : {boolean} 如果字符序列不为空白则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.isNotBlank("    a "));//true
log($str.isNotBlank("     "));//false

```
### hasBlank(strs)

字符数组是否有空白

- 参数 : strs {string[]} 要判断的字符序列数组

- 返回 : {boolean} 如果数组中有空白字符序列则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.hasBlank(["    a ","  "]));//true
log($str.hasBlank(["    a "," b "]));//false

```
### isAllBlank(strs)

字符数组是否全是空白

如果传入的列表位空则返回true

- 参数 : strs {string[]} 要判断的字符序列数组

- 返回 : {boolean} 如果数组中的所有元素都是空白则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.isAllBlank(["    a ","  "]));//false
log($str.isAllBlank(["      ","  "]));//true

```
### isEmpty(str)

是否为空

如果传入的参数为null则返回true

- 参数 : str {string} 要判断的字符序列

- 返回 : {boolean} 如果字符序列为空则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.isEmpty("a "));//false
log($str.isEmpty("  "));//true
log($str.isEmpty(null));//true

```
### isNotEmpty(str)

是否不为空

- 参数 : str {string} 要判断的字符序列

- 返回 : {boolean} 如果字符序列不为空则返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
log($str.isNotEmpty("a "));//true
log($str.isNotEmpty("  "));//false
log($str.isNotEmpty(null));//false

```
### emptyIfNull(str)

null转空字符

- 参数 : str {string} 要处理的字符序列

- 返回 : {string} 如果字符序列为 null 则返回空字符串，否则返回原字符序列

- 版本 : 1.0.0

```javascript
log($str.emptyIfNull("  "));//"  "
log($str.emptyIfNull("嘿嘿"));//"嘿嘿"
log($str.emptyIfNull(null));//""

```
### nullToEmpty(str)

null转空字符

和emptyIfNull()函数功能一致

- 参数 : str 要处理的字符序列

- 返回 : {string} 如果字符序列为 null 则返回空字符串，否则返回原字符序列

- 版本 : 1.0.0

```javascript
log($str.nullToEmpty("  "));//"  "
log($str.nullToEmpty("嘿嘿"));//"嘿嘿"
log($str.nullToEmpty(null));//""

```
### nullToDefault(str, def)

null转默认字符串

- 参数 : str {string} 要处理的字符序列

- 参数 : def {string} 默认字符串

- 返回 : {string} 如果字符序列为 null 则返回默认字符串，否则返回原字符序列

- 版本 : 1.0.0

```javascript
log($str.nullToDefault("  ","默认")); //"  "
log($str.nullToDefault("嘿嘿","默认")); //"嘿嘿"
log($str.nullToDefault(null,"默认")); //"默认"

```
### emptyToDefault(str, def)

空串转默认字符串

和 nullToDefault 略有不同的地方是：此函数会判断当前字符串是否为空串，而不是判断是否为null，如果是个null或者空白的字符串，则返回默认值，否则返回原本的字符串。

- 参数 : str {string} 要处理的字符序列

- 参数 : def {string} 默认字符串

- 返回 : {string} 如果字符序列为空则返回默认字符串，否则返回原字符序列

- 版本 : 1.0.0

```javascript
log($str.emptyToDefault("  ","默认")); //"默认"
log($str.emptyToDefault("嘿嘿","默认")); //"嘿嘿"
log($str.emptyToDefault(null,"默认")); //"默认"

```
### subStart(input, length)

截取开头字符

- 参数 : input {string} 输入的字符串

- 参数 : length {int} 截取长度

- 返回 : 字符串

- 版本 : 1.0.0

```javascript
log($str.subStart("ABCDEFG",100)); //"ABCDEFG"
log($str.subStart("ABCDEFG",7)); //"ABCDEFG"
log($str.subStart("ABCDEFG",3)); //"ABC"

```
### subEnd(input, length)

截取末尾字符

- 参数 : input {string} 输入的字符串

- 参数 : length {int} 截取长度

- 返回 : 字符串

- 版本 : 1.0.0

```javascript
log($str.subEnd("ABCDEFG",100)); //"ABCDEFG"
log($str.subEnd("ABCDEFG",7)); //"ABCDEFG"
log($str.subEnd("ABCDEFG",3)); //"EFG"
log($str.subEnd("ABCDEFG",2)); //"FG"
log($str.subEnd("ABCDEFG",1)); //"G"

```
### trim(str)

去除首尾空格

如果输入的字符串为null，则返回""空串

- 参数 : str {string} 要处理的字符序列

- 返回 : {string} 去除前后空格后的字符序列，如果原字符序列为 null 则返回 null

- 版本 : 1.0.0

```javascript
log($str.trim(" ABCDEFG ")); //"ABCDEFG"

```
### trimStart(str)

去除开头空格

如果输入的字符串为null，则返回""空串

- 参数 : str {string} 要处理的字符序列

- 返回 : {string} 去除开头空格后的字符序列，如果原字符序列为 null 则返回 null

- 版本 : 1.0.0

```javascript
log($str.trimStart(" ABCDEFG ")); //"ABCDEFG "
log($str.trimStart(null)); //""

```
### trimEnd(str)

去除结尾空格

如果输入的字符串为null，则返回""空串

- 参数 : str {string} 要处理的字符序列

- 返回 : {string} 去除结尾空格后的字符序列，如果原字符序列为 null 则返回 null

- 版本 : 1.0.0

```javascript
log($str.trimEnd(" ABCDEFG ")); //" ABCDEFG"
log($str.trimEnd(null)); //""

```
### trim(str, mode)

根据模式去除空格

- 参数 : str {string} 要处理的字符序列

- 参数 : mode {int} 模式： 0 去除前后空格，1 去除开头空格，2 去除结尾空格 其他数字就返回字符串本身

- 返回 : {string} 根据模式处理后的字符序列

- 版本 : 1.0.0

```javascript
log($str.trim(" ABCDEFG ",0)); //"ABCDEFG"(去除首尾)
log($str.trim(" ABCDEFG ",1)); //"ABCDEFG "(去除开头)
log($str.trim(" ABCDEFG ",2)); //" ABCDEFG"(去除结尾)
log($str.trim(" ABCDEFG ",100)); //" ABCDEFG "(啥也不干)
log($str.trim(null,0)); //""
log($str.trim(null,1)); //""
log($str.trim(null,2)); //""

```
### startWith(str, prefix, ignoreCase)

是否以前缀开头

- 参数 : str {string}  要判断的字符序列

- 参数 : prefix {string} 指定的前缀

- 参数 : ignoreCase {boolean} 是否忽略大小写

- 返回 : 如果字符序列以指定前缀开头则返回 true，否则返回 false

- 版本 : 1.0.0

### startWith(str, prefix)

是否以前缀开头

如果传入的参数为空，则会提示并且返回false，默认不忽略大小写

- 参数 : str {string} 要判断的字符序列

- 参数 : prefix {string} 指定的前缀

- 返回 : {boolean} 是否以前缀开头

- 版本 : 1.0.0

### startWithIgnoreEquals(str, prefix)

判断字符序列是否以指定前缀开头，忽略相等比较（暂未明确相等比较的具体含义，这里忽略此含义）

- 参数 : str 要判断的字符序列

- 参数 : prefix 指定的前缀

- 返回 : 如果字符序列以指定前缀开头则返回 true，否则返回 false

- 版本 : 1.0.0

### startWithIgnoreCase(str, prefix)

判断字符序列是否以指定前缀开头，忽略大小写

- 参数 : str 要判断的字符序列

- 参数 : prefix 指定的前缀

- 返回 : 如果字符序列以指定前缀开头则返回 true，否则返回 false

- 版本 : 1.0.0

### startWithAny(str, prefixes)

判断字符序列是否以指定前缀数组中的任意一个前缀开头

- 参数 : str {String}   要判断的字符序列

- 参数 : prefixes {string[]} 指定的前缀数组

- 返回 : 如果字符序列以指定前缀数组中的任意一个前缀开头则返回 true，否则返回 false

- 版本 : 1.0.0

### startWithAnyIgnoreCase(str, prefixes)

判断字符序列是否以指定前缀数组中的任意一个前缀开头，忽略大小写

- 参数 : str {string} 要判断的字符序列

- 参数 : prefixes {string[]} 指定的前缀数组

- 返回 : 如果字符序列以指定前缀数组中的任意一个前缀开头则返回 true，否则返回 false

- 版本 : 1.0.0

### endWith(str, suffix, ignoreCase)

判断字符串是否以指定后缀结尾，可选择是否忽略大小写

- 参数 : str 要检查的字符串

- 参数 : suffix 要检查的后缀

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 如果字符串以指定后缀结尾返回 true，否则返回 false

- 版本 : 1.0.0

### endWith(str, suffix, ignoreCase, ignoreEquals)

判断字符串是否以指定后缀结尾，可选择是否忽略大小写和是否忽略相等

- 参数 : str 要检查的字符串

- 参数 : suffix 要检查的后缀

- 参数 : ignoreCase 是否忽略大小写

- 参数 : ignoreEquals 是否忽略相等

- 返回 : 如果字符串以指定后缀结尾返回 true，否则返回 false

- 版本 : 1.0.0

### endWith(str, suffix)

判断字符串是否以指定后缀结尾

- 参数 : str 要检查的字符串

- 参数 : suffix 要检查的后缀

- 返回 : 如果字符串以指定后缀结尾返回 true，否则返回 false

- 版本 : 1.0.0

### endWithIgnoreCase(str, suffix)

判断字符串是否以指定后缀结尾，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : suffix 要检查的后缀

- 返回 : 如果字符串以指定后缀结尾返回 true，否则返回 false

- 版本 : 1.0.0

### endWithAny(str, suffixes)

判断字符串是否以指定后缀中的任意一个结尾

- 参数 : str {string}  要检查的字符串

- 参数 : suffixes {string[]} 要检查的后缀数组

- 返回 : 如果字符串以指定后缀中的任意一个结尾返回 true，否则返回 false

- 版本 : 1.0.0

### endWithAnyIgnoreCase(str, suffixes)

判断字符串是否以指定后缀中的任意一个结尾，忽略大小写

- 参数 : str {string} 要检查的字符串

- 参数 : suffixes {string[]} 要检查的后缀数组

- 返回 : 如果字符串以指定后缀中的任意一个结尾返回 true，否则返回 false

- 版本 : 1.0.0

### contains(str, searchStr)

判断字符串是否包含指定子字符串

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 返回 : 如果字符串包含指定子字符串返回 true，否则返回 false

- 版本 : 1.0.0

### has(str, searchStr)

判断字符串是否包含指定子字符串

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 返回 : 如果字符串包含指定子字符串返回 true，否则返回 false

- 版本 : 1.0.0

### containsAny(str, sreArr)

判断字符串是否包含指定子字符串数组中的任意一个

- 参数 : str {str} 字符串

- 参数 : sreArr {string[]} 要检查的子字符串数组

- 返回 : 如果字符串包含指定子字符串数组中的任意一个返回 true，否则返回 false

- 版本 : 1.0.0

```javascript
let strArr = ["main","splash","welcome","start"];
let hasStr = $str.containsAny("ada main asd",strArr);
if (hasStr) {
    alert("判断字符串","包含");
} else {
    alert("判断字符串","不包含");
}

```
### containsAll(str, testChars)

判断字符串是否包含指定字符数组中的所有字符

- 参数 : str 要检查的字符串

- 参数 : testChars 要检查的字符数组

- 返回 : 如果字符串包含指定字符数组中的所有字符返回 true，否则返回 false

- 版本 : 1.0.0

### containsBlank(str)

判断字符串是否包含空白字符

- 参数 : str 要检查的字符串

- 返回 : 如果字符串包含空白字符返回 true，否则返回 false

- 版本 : 1.0.0

### getContainsStr(str, testStrs)

获取字符串中包含的指定子字符串

- 参数 : str 要检查的字符串

- 参数 : testStrs 要检查的子字符串数组

- 返回 : 包含的子字符串，如果没有则返回 null

- 版本 : 1.0.0

### containsIgnoreCase(str, testStr)

判断字符串是否包含指定子字符串，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : testStr 要检查的子字符串

- 返回 : 如果字符串包含指定子字符串返回 true，否则返回 false

- 版本 : 1.0.0

### containsAnyIgnoreCase(str, testStrs)

判断字符串是否包含指定子字符串数组中的任意一个，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : testStrs 要检查的子字符串数组

- 返回 : 如果字符串包含指定子字符串数组中的任意一个返回 true，否则返回 false

- 版本 : 1.0.0

### getContainsStrIgnoreCase(str, testStrs)

获取字符串中包含的指定子字符串，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : testStrs 要检查的子字符串数组

- 返回 : 包含的子字符串，如果没有则返回 null

- 版本 : 1.0.0

### indexOfIgnoreCase(str, searchStr)

获取指定子字符串在字符串中第一次出现的索引，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 返回 : 子字符串第一次出现的索引，如果没有则返回 -1

- 版本 : 1.0.0

### indexOfIgnoreCase(str, searchStr, fromIndex)

获取指定子字符串在字符串中从指定位置开始第一次出现的索引，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 参数 : fromIndex 开始搜索的位置

- 返回 : 子字符串第一次出现的索引，如果没有则返回 -1

- 版本 : 1.0.0

### indexOf(text, searchStr, from, ignoreCase)

获取指定子字符串在字符串中从指定位置开始第一次出现的索引，可选择是否忽略大小写

- 参数 : text 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 参数 : from 开始搜索的位置

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 子字符串第一次出现的索引，如果没有则返回 -1

- 版本 : 1.0.0

### lastIndexOfIgnoreCase(str, searchStr)

获取指定子字符串在字符串中最后一次出现的索引，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 返回 : 子字符串最后一次出现的索引，如果没有则返回 -1

- 版本 : 1.0.0

### lastIndexOfIgnoreCase(str, searchStr, fromIndex)

获取指定子字符串在字符串中从指定位置开始最后一次出现的索引，忽略大小写

- 参数 : str 要检查的字符串

- 参数 : searchStr 要检查的子字符串

- 参数 : fromIndex 开始搜索的位置

- 返回 : 子字符串最后一次出现的索引，如果没有则返回 -1

- 版本 : 1.0.0

### cleanBlank(str)

清除字符串中的空白字符

- 参数 : str 输入的字符序列

- 返回 : 清除空白字符后的字符串

- 版本 : 1.0.0

### stripIgnoreCase(str, prefixOrSuffix)

忽略大小写地去除字符串的前缀或后缀

- 参数 : str 输入的字符序列

- 参数 : prefixOrSuffix 要去除的前缀或后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### stripIgnoreCase(str, prefix, suffix)

忽略大小写地去除字符串的前缀和后缀

- 参数 : str 输入的字符序列

- 参数 : prefix 要去除的前缀

- 参数 : suffix 要去除的后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### strip(str, prefixOrSuffix)

去除字符串的前缀或后缀

- 参数 : str 输入的字符序列

- 参数 : prefixOrSuffix 要去除的前缀或后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### strip(str, prefix, suffix)

去除字符串的前缀和后缀

- 参数 : str 输入的字符序列

- 参数 : prefix 要去除的前缀

- 参数 : suffix 要去除的后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### strip(str, prefix, suffix, ignoreCase)

去除字符串的前缀和后缀，可选择是否忽略大小写

- 参数 : str 输入的字符序列

- 参数 : prefix 要去除的前缀

- 参数 : suffix 要去除的后缀

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### stripAll(str, prefixOrSuffix)

去除字符串中所有的前缀或后缀

- 参数 : str 输入的字符序列

- 参数 : prefixOrSuffix 要去除的前缀或后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### stripAll(str, prefix, suffix)

去除字符串中所有的前缀和后缀

- 参数 : str 输入的字符序列

- 参数 : prefix 要去除的前缀

- 参数 : suffix 要去除的后缀

- 返回 : 去除后的字符串

- 版本 : 1.0.0

### addPrefixIfNot(str, prefix)

如果字符串没有指定前缀，则添加该前缀

- 参数 : str 输入的字符序列

- 参数 : prefix 要添加的前缀

- 返回 : 添加前缀后的字符串

- 版本 : 1.0.0

### addSuffixIfNot(str, suffix)

如果字符串没有指定后缀，则添加该后缀

- 参数 : str 输入的字符序列

- 参数 : suffix 要添加的后缀

- 返回 : 添加后缀后的字符串

- 版本 : 1.0.0

### splitToLong(str, separator)

将字符串按指定字符序列分隔并转换为 long 数组

- 参数 : str 输入的字符序列

- 参数 : separator 分隔字符序列

- 返回 : long 数组

- 版本 : 1.0.0

### splitToInt(str, separator)

将字符串按指定字符序列分隔并转换为 int 数组

- 参数 : str 输入的字符序列

- 参数 : separator 分隔字符序列

- 返回 : int 数组

- 版本 : 1.0.0

### splitToArray(str, separator)

将字符串按指定字符序列分隔成字符串数组

- 参数 : str 输入的字符序列

- 参数 : separator 分隔字符序列

- 返回 : 字符串数组

- 版本 : 1.0.0

### splitTrim(str, regex)

分割并且去除首尾空格

- 参数 : str 输入的字符序列

- 参数 : regex 分隔字符(表达式)

- 返回 : 字符串列表

- 版本 : 1.0.0

### splitTrim(str, separator, limit)

将字符串按指定字符序列分隔成字符串列表，限制列表长度，并去除每个元素的前后空白字符

- 参数 : str 输入的字符序列

- 参数 : separator 分隔字符序列

- 参数 : limit 列表长度限制

- 返回 : 字符串列表

- 版本 : 1.0.0

### toUnderlineCase(str)

将输入的字符序列转换为下划线格式的字符串

- 参数 : str 输入的字符序列

- 返回 : 转换后的下划线格式字符串

- 版本 : 1.0.0

### toCamelCase(name)

将输入的字符序列转换为驼峰格式的字符串

- 参数 : name 输入的字符序列

- 返回 : 转换后的驼峰格式字符串

- 版本 : 1.0.0

### isSurround(str, prefix, suffix)

判断输入的字符序列是否以指定的前缀和后缀包围

- 参数 : str 输入的字符序列

- 参数 : prefix 前缀字符序列

- 参数 : suffix 后缀字符序列

- 返回 : 如果以指定的前缀和后缀包围则返回 true，否则返回 false

- 版本 : 1.0.0

### builder(strs)

将输入的字符序列数组连接成一个 StringBuilder 对象

- 参数 : strs 输入的字符序列数组

- 返回 : 连接后的 StringBuilder 对象

- 版本 : 1.0.0

### concat(isNullToEmpty, strs)

连接输入的字符序列数组，根据 isNullToEmpty 参数决定是否将 null 转换为空字符串

- 参数 : isNullToEmpty 如果为 true，则将 null 转换为空字符串；否则保持 null

- 参数 : strs 输入的字符序列数组

- 返回 : 连接后的字符串

- 版本 : 1.0.0

### brief(str, maxLength)

截取输入的字符序列，使其长度不超过指定的最大长度

- 参数 : str 输入的字符序列

- 参数 : maxLength 最大长度

- 返回 : 截取后的字符串

- 版本 : 1.0.0

### join(conjunction, objs)

使用指定的连接词连接输入的对象数组

- 参数 : conjunction 连接词

- 参数 : objs 输入的对象数组

- 返回 : 连接后的字符串

- 版本 : 1.0.0

### isNumeric(str)

判断输入的字符序列是否为数字

- 参数 : str 输入的字符序列

- 返回 : 如果是数字则返回 true，否则返回 false

- 版本 : 1.0.0

### move(str, startInclude, endExclude, moveLength)

将输入的字符序列的指定子串移动指定的长度

- 参数 : str 输入的字符序列

- 参数 : startInclude 起始位置（包含）

- 参数 : endExclude 结束位置（不包含）

- 参数 : moveLength 移动的长度

- 返回 : 移动后的字符串

- 版本 : 1.0.0

### isCharEquals(str)

判断输入的字符序列是否所有字符都相等

- 参数 : str 输入的字符序列

- 返回 : 如果所有字符都相等则返回 true，否则返回 false

- 版本 : 1.0.0

### normalize(str)

对输入的字符序列进行规范化处理，去除首尾空格

- 参数 : str 输入的字符序列

- 返回 : 规范化处理后的字符串

- 版本 : 1.0.0

### hasLetter(str)

判断输入的字符序列是否包含字母

- 参数 : str 输入的字符序列

- 返回 : 如果包含字母则返回 true，否则返回 false

- 版本 : 1.0.0

### commonPrefix(str1, str2)

找出两个字符序列的公共前缀

- 参数 : str1 第一个字符序列

- 参数 : str2 第二个字符序列

- 返回 : 公共前缀

- 版本 : 1.0.0

### commonSuffix(str1, str2)

找出两个字符序列的公共后缀

- 参数 : str1 第一个字符序列

- 参数 : str2 第二个字符序列

- 返回 : 公共后缀

- 版本 : 1.0.0

### isBlankIfStr(obj)

判断输入的对象如果是字符串则是否为空白字符串

- 参数 : obj 输入的对象

- 返回 : 如果是字符串且为空白字符串则返回 true，否则返回 false

- 版本 : 1.0.0

### isEmptyIfStr(obj)

判断输入的对象如果是字符串则是否为空字符串

- 参数 : obj 输入的对象

- 返回 : 如果是字符串且为空字符串则返回 true，否则返回 false

- 版本 : 1.0.0

### trim(strs)

去除字符串数组中每个字符串的首尾空格

- 参数 : strs 输入的字符串数组

- 版本 : 1.0.0

### utf8Str(obj)

将输入的对象转换为 UTF-8 编码的字符串

- 参数 : obj 输入的对象

- 返回 : UTF-8 编码的字符串

- 版本 : 1.0.0

### str(obj, charsetName)

将输入的对象转换为指定字符集编码的字符串

- 参数 : obj 输入的对象

- 参数 : charsetName 指定的字符集名称

- 返回 : 指定字符集编码的字符串

- 版本 : 1.0.0

### str(bytes, charset)

将输入的字节数组转换为指定字符集编码的字符串

- 参数 : bytes 输入的字节数组

- 参数 : charset 指定的字符集名称

- 返回 : 指定字符集编码的字符串

- 版本 : 1.0.0

### repeat(str, count)

将指定字符序列重复指定次数并返回结果字符串

- 参数 : str 要重复的字符序列

- 参数 : count 重复的次数

- 返回 : 重复字符序列组成的字符串

- 版本 : 1.0.0

### repeatByLength(str, padLen)

将指定字符序列重复直到达到指定长度并返回结果字符串

- 参数 : str 要重复的字符序列

- 参数 : padLen 目标长度

- 返回 : 重复字符序列组成的字符串，长度达到 padLen

- 版本 : 1.0.0

### repeatAndJoin(str, count, delimiter)

将指定字符序列重复指定次数，并使用指定分隔符连接，返回结果字符串

- 参数 : str 要重复的字符序列

- 参数 : count 重复的次数

- 参数 : delimiter 分隔符

- 返回 : 重复字符序列并用分隔符连接的字符串

- 版本 : 1.0.0

### equals(str1, str2)

比较两个字符序列是否相等

- 参数 : str1 第一个字符序列

- 参数 : str2 第二个字符序列

- 返回 : 如果两个字符序列相等则返回 true，否则返回 false

- 版本 : 1.0.0

### equalsIgnoreCase(str1, str2)

比较两个字符序列是否相等，忽略大小写

- 参数 : str1 第一个字符序列

- 参数 : str2 第二个字符序列

- 返回 : 如果两个字符序列相等（忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### equals(str1, str2, ignoreCase)

比较两个字符序列是否相等，可选择是否忽略大小写

- 参数 : str1 第一个字符序列

- 参数 : str2 第二个字符序列

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 如果两个字符序列相等（根据 ignoreCase 决定是否忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### equalsAnyIgnoreCase(str1, strs)

检查一个字符序列是否与给定的多个字符序列中的任何一个相等，忽略大小写

- 参数 : str1 要检查的字符序列

- 参数 : strs 多个字符序列

- 返回 : 如果 str1 与 strs 中的任何一个相等（忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### equalsAny(str1, strs)

检查一个字符序列是否与给定的多个字符序列中的任何一个相等

- 参数 : str1 要检查的字符序列

- 参数 : strs 多个字符序列

- 返回 : 如果 str1 与 strs 中的任何一个相等则返回 true，否则返回 false

- 版本 : 1.0.0

### equalsAny(str1, ignoreCase, strs)

检查一个字符序列是否与给定的多个字符序列中的任何一个相等，可选择是否忽略大小写

- 参数 : str1 要检查的字符序列

- 参数 : ignoreCase 是否忽略大小写

- 参数 : strs 多个字符序列

- 返回 : 如果 str1 与 strs 中的任何一个相等（根据 ignoreCase 决定是否忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### isSubEquals(str1, start1, str2, ignoreCase)

检查一个字符序列的子序列是否与另一个字符序列相等，可选择是否忽略大小写

- 参数 : str1 第一个字符序列

- 参数 : start1 第一个字符序列的起始位置

- 参数 : str2 第二个字符序列

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 如果 str1 从 start1 开始的子序列与 str2 相等（根据 ignoreCase 决定是否忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### isSubEquals(str1, start1, str2, start2, length, ignoreCase)

检查一个字符序列的指定子序列是否与另一个字符序列的指定子序列相等，可选择是否忽略大小写

- 参数 : str1 第一个字符序列

- 参数 : start1 第一个字符序列的起始位置

- 参数 : str2 第二个字符序列

- 参数 : start2 第二个字符序列的起始位置

- 参数 : length 要比较的长度

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 如果 str1 从 start1 开始长度为 length 的子序列与 str2 从 start2 开始长度为 length 的子序列相等（根据 ignoreCase 决定是否忽略大小写）则返回 true，否则返回 false

- 版本 : 1.0.0

### format(template, params)

使用指定的参数格式化字符序列模板

- 参数 : template 字符序列模板

- 参数 : params 格式化参数

- 返回 : 格式化后的字符串

- 版本 : 1.0.0

### indexedFormat(pattern, arguments)

使用指定的参数格式化带索引的字符序列模板

- 参数 : pattern 带索引的字符序列模板

- 参数 : arguments 格式化参数

- 返回 : 格式化后的字符串

- 版本 : 1.0.0

### utf8Bytes(str)

将字符序列转换为 UTF-8 字节数组

- 参数 : str 要转换的字符序列

- 返回 : UTF-8 字节数组

- 版本 : 1.0.0

### bytes(str)

将字符序列转换为默认字符集的字节数组

- 参数 : str 要转换的字符序列

- 返回 : 默认字符集的字节数组

- 版本 : 1.0.0

### bytes(str, charset)

将字符序列转换为指定字符集的字节数组

- 参数 : str 要转换的字符序列

- 参数 : charset 指定的字符集名称

- 返回 : 指定字符集的字节数组

- 版本 : 1.0.0

### wrap(str, prefixAndSuffix)

用指定的前缀和后缀包装字符序列

- 参数 : str 要包装的字符序列

- 参数 : prefixAndSuffix 前缀和后缀

- 返回 : 包装后的字符串

- 版本 : 1.0.0

### wrap(str, prefix, suffix)

用指定的前缀和后缀包装字符序列

- 参数 : str 要包装的字符序列

- 参数 : prefix 前缀

- 参数 : suffix 后缀

- 返回 : 包装后的字符串

- 版本 : 1.0.0

### wrapAllWithPair(prefixAndSuffix, strs)

用指定的前缀和后缀包装多个字符序列

- 参数 : prefixAndSuffix 前缀和后缀

- 参数 : strs 多个字符序列

- 返回 : 包装后的字符串数组

- 版本 : 1.0.0

### wrapAll(prefix, suffix, strs)

用指定的前缀和后缀包装多个字符序列

- 参数 : prefix 前缀

- 参数 : suffix 后缀

- 参数 : strs 多个字符序列

- 返回 : 包装后的字符串数组

- 版本 : 1.0.0

### wrapIfMissing(str, prefix, suffix)

如果字符序列没有指定的前缀和后缀，则用其包装

- 参数 : str 要包装的字符序列

- 参数 : prefix 前缀

- 参数 : suffix 后缀

- 返回 : 包装后的字符串

- 版本 : 1.0.0

### wrapAllWithPairIfMissing(prefixAndSuffix, strs)

如果多个字符序列没有指定的前缀和后缀，则用其包装

- 参数 : prefixAndSuffix 前缀和后缀

- 参数 : strs 多个字符序列

- 返回 : 包装后的字符串数组

- 版本 : 1.0.0

### count(content, strForSearch)

计算 String 中指定 String 出现的次数

- 参数 : content 要搜索的内容

- 参数 : strForSearch 要搜索的字符串

- 返回 : 出现的次数

- 版本 : 1.0.0

### compare(str1, str2, nullIsLess)

比较两个 String 的大小

- 参数 : str1 第一个字符串

- 参数 : str2 第二个字符串

- 参数 : nullIsLess 当字符串为 null 时是否认为更小

- 返回 : 比较结果，小于返回负数，等于返回 0，大于返回正数

- 版本 : 1.0.0

### compareIgnoreCase(str1, str2, nullIsLess)

忽略大小写比较两个 String 的大小

- 参数 : str1 第一个字符串

- 参数 : str2 第二个字符串

- 参数 : nullIsLess 当字符串为 null 时是否认为更小

- 返回 : 比较结果，小于返回负数，等于返回 0，大于返回正数

- 版本 : 1.0.0

### compareVersion(version1, version2)

比较两个版本号的大小

- 参数 : version1 第一个版本号

- 参数 : version2 第二个版本号

- 返回 : 比较结果，小于返回负数，等于返回 0，大于返回正数

- 版本 : 1.0.0

### appendIfMissing(str, suffix, suffixes)

如果字符串不以指定后缀结尾，则添加后缀

- 参数 : str 原始字符串

- 参数 : suffix 要添加的后缀

- 参数 : suffixes 其他可能的后缀

- 返回 : 添加后缀后的字符串

- 版本 : 1.0.0

### appendIfMissingIgnoreCase(str, suffix, suffixes)

如果字符串不以指定后缀结尾（忽略大小写），则添加后缀

- 参数 : str 原始字符串

- 参数 : suffix 要添加的后缀

- 参数 : suffixes 其他可能的后缀

- 返回 : 添加后缀后的字符串

- 版本 : 1.0.0

### appendIfMissing(str, suffix, ignoreCase, testSuffixes)

如果字符串不以指定后缀结尾（可指定是否忽略大小写），则添加后缀

- 参数 : str 原始字符串

- 参数 : suffix 要添加的后缀

- 参数 : ignoreCase 是否忽略大小写

- 参数 : testSuffixes 其他可能的后缀

- 返回 : 添加后缀后的字符串

- 版本 : 1.0.0

### prependIfMissing(str, prefix, prefixes)

如果字符串不以指定前缀开头，则添加前缀

- 参数 : str 原始字符串

- 参数 : prefix 要添加的前缀

- 参数 : prefixes 其他可能的前缀

- 返回 : 添加前缀后的字符串

- 版本 : 1.0.0

### prependIfMissingIgnoreCase(str, prefix, prefixes)

如果字符串不以指定前缀开头（忽略大小写），则添加前缀

- 参数 : str 原始字符串

- 参数 : prefix 要添加的前缀

- 参数 : prefixes 其他可能的前缀

- 返回 : 添加前缀后的字符串

- 版本 : 1.0.0

### prependIfMissing(str, prefix, ignoreCase, prefixes)

如果字符串不以指定前缀开头（可指定是否忽略大小写），则添加前缀

- 参数 : str 原始字符串

- 参数 : prefix 要添加的前缀

- 参数 : ignoreCase 是否忽略大小写

- 参数 : prefixes 其他可能的前缀

- 返回 : 添加前缀后的字符串

- 版本 : 1.0.0

### replaceIgnoreCase(str, searchStr, replacement)

忽略大小写替换字符串中的指定内容

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的字符串

- 参数 : replacement 替换后的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replace(str, searchStr, replacement)

替换字符串中的指定内容

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的字符串

- 参数 : replacement 替换后的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### lastIndexOf(text, searchStr, from, ignoreCase)

从指定位置开始查找指定字符序列最后一次出现的位置，可选择是否忽略大小写

- 参数 : text 要查找的文本

- 参数 : searchStr 要查找的字符序列

- 参数 : from 开始查找的位置

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 最后一次出现的位置，如果未找到则返回 -1

- 版本 : 1.0.0

### ordinalIndexOf(str, searchStr, ordinal)

查找指定字符序列在另一个字符序列中第 ordinal 次出现的位置

- 参数 : str 要查找的文本

- 参数 : searchStr 要查找的字符序列

- 参数 : ordinal 要查找的第几次出现（从 1 开始）

- 返回 : 第 ordinal 次出现的位置，如果未找到则返回 -1

- 版本 : 1.0.0

### removeAll(str, strToRemove)

从字符序列中移除所有指定的字符序列

- 参数 : str 原始字符序列

- 参数 : strToRemove 要移除的字符序列

- 返回 : 移除后的字符序列

- 版本 : 1.0.0

### removeAny(str, strsToRemove)

从字符序列中移除指定的多个字符序列中的任意一个

- 参数 : str 原始字符序列

- 参数 : strsToRemove 要移除的多个字符序列

- 返回 : 移除后的字符序列

- 版本 : 1.0.0

### removeAllLineBreaks(str)

移除字符序列中的所有换行符

- 参数 : str 原始字符序列

- 返回 : 移除换行符后的字符序列

- 版本 : 1.0.0

### removePreAndLowerFirst(str, preLength)

移除字符序列的前 preLength 个字符并将第一个字符转换为小写

- 参数 : str 原始字符序列

- 参数 : preLength 要移除的前缀长度

- 返回 : 处理后的字符序列

- 版本 : 1.0.0

### removePreAndLowerFirst(str, prefix)

移除字符序列的指定前缀并将第一个字符转换为小写

- 参数 : str 原始字符序列

- 参数 : prefix 要移除的前缀

- 返回 : 处理后的字符序列

- 版本 : 1.0.0

### removePrefix(str, prefix)

移除字符序列的指定前缀

- 参数 : str 原始字符序列

- 参数 : prefix 要移除的前缀

- 返回 : 移除前缀后的字符序列

- 版本 : 1.0.0

### removeAllPrefix(str, prefix)

移除字符序列中所有的指定前缀

- 参数 : str 原始字符序列

- 参数 : prefix 要移除的前缀

- 返回 : 移除所有前缀后的字符序列

- 版本 : 1.0.0

### removePrefixIgnoreCase(str, prefix)

忽略大小写地移除字符序列的指定前缀

- 参数 : str 原始字符序列

- 参数 : prefix 要移除的前缀

- 返回 : 移除前缀后的字符序列

- 版本 : 1.0.0

### removeSuffix(str, suffix)

移除字符序列的指定后缀

- 参数 : str 原始字符序列

- 参数 : suffix 要移除的后缀

- 返回 : 移除后缀后的字符序列

- 版本 : 1.0.0

### removeAllSuffix(str, suffix)

移除字符序列中所有的指定后缀

- 参数 : str 原始字符序列

- 参数 : suffix 要移除的后缀

- 返回 : 移除所有后缀后的字符序列

- 版本 : 1.0.0

### removeSufAndLowerFirst(str, suffix)

移除字符序列的指定后缀并将第一个字符转换为小写

- 参数 : str 原始字符序列

- 参数 : suffix 要移除的后缀

- 返回 : 处理后的字符序列

- 版本 : 1.0.0

### removeSuffixIgnoreCase(str, suffix)

忽略大小写地移除字符序列的指定后缀

- 参数 : str 原始字符序列

- 参数 : suffix 要移除的后缀

- 返回 : 移除后缀后的字符序列

- 版本 : 1.0.0

### wrapAllIfMissing(prefix, suffix, strs)

如果字符串数组中的每个字符串没有指定的前缀和后缀，则添加前缀和后缀

- 参数 : prefix 要添加的前缀

- 参数 : suffix 要添加的后缀

- 参数 : strs 字符串数组

- 返回 : 处理后的字符串数组

- 版本 : 1.0.0

### unWrap(str, prefix, suffix)

移除字符串的指定前缀和后缀

- 参数 : str 要处理的字符串

- 参数 : prefix 要移除的前缀

- 参数 : suffix 要移除的后缀

- 返回 : 处理后的字符串

- 版本 : 1.0.0

### isWrap(str, prefix, suffix)

判断字符串是否以指定的前缀和后缀包裹

- 参数 : str 要判断的字符串

- 参数 : prefix 前缀

- 参数 : suffix 后缀

- 返回 : 如果字符串以指定的前缀和后缀包裹则返回 true，否则返回 false

- 版本 : 1.0.0

### isWrap(str, wrapper)

判断字符串是否以指定的包裹字符串包裹

- 参数 : str 要判断的字符串

- 参数 : wrapper 包裹字符串

- 返回 : 如果字符串以指定的包裹字符串包裹则返回 true，否则返回 false

- 版本 : 1.0.0

### padPre(str, length, padStr)

在字符串前面填充指定的字符串，直到达到指定的长度

- 参数 : str 要填充的字符串

- 参数 : length 填充后的长度

- 参数 : padStr 用于填充的字符串

- 返回 : 填充后的字符串

- 版本 : 1.0.0

### padAfter(str, length, padStr)

在字符串后面填充指定的字符串，直到达到指定的长度

- 参数 : str 要填充的字符串

- 参数 : length 填充后的长度

- 参数 : padStr 用于填充的字符串

- 返回 : 填充后的字符串

- 版本 : 1.0.0

### center(str, size)

将字符串居中，使用空格填充

- 参数 : str 要居中的字符串

- 参数 : size 填充后的总长度

- 返回 : 居中后的字符串

- 版本 : 1.0.0

### center(str, size, padStr)

将字符串居中，使用指定的字符串填充

- 参数 : str 要居中的字符串

- 参数 : size 填充后的总长度

- 参数 : padStr 用于填充的字符串

- 返回 : 居中后的字符串

- 版本 : 1.0.0

### replace(str, searchStr, replacement, ignoreCase)

替换字符串中所有匹配的子字符串

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的子字符串

- 参数 : replacement 用于替换的字符串

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replace(str, fromIndex, searchStr, replacement, ignoreCase)

从指定索引开始替换字符串中所有匹配的子字符串

- 参数 : str 原始字符串

- 参数 : fromIndex 开始查找的索引

- 参数 : searchStr 要查找的子字符串

- 参数 : replacement 用于替换的字符串

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replace(str, startInclude, endExclude, replacedStr)

替换指定范围内的子字符串

- 参数 : str 原始字符串

- 参数 : startInclude 开始索引（包含）

- 参数 : endExclude 结束索引（不包含）

- 参数 : replacedStr 用于替换的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replaceLast(str, searchStr, replacedStr)

替换字符串中最后一个匹配的子字符串

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的子字符串

- 参数 : replacedStr 用于替换的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replaceLast(str, searchStr, replacedStr, ignoreCase)

替换字符串中最后一个匹配的子字符串，可选择是否忽略大小写

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的子字符串

- 参数 : replacedStr 用于替换的字符串

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replaceFirst(str, searchStr, replacedStr)

替换字符串中第一个匹配的子字符串

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的子字符串

- 参数 : replacedStr 用于替换的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### replaceFirst(str, searchStr, replacedStr, ignoreCase)

替换字符串中第一个匹配的子字符串，可选择是否忽略大小写

- 参数 : str 原始字符串

- 参数 : searchStr 要查找的子字符串

- 参数 : replacedStr 用于替换的字符串

- 参数 : ignoreCase 是否忽略大小写

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### hide(str, startInclude, endExclude)

隐藏指定范围内的字符

- 参数 : str 原始字符串

- 参数 : startInclude 开始索引（包含）

- 参数 : endExclude 结束索引（不包含）

- 返回 : 隐藏后的字符串

- 版本 : 1.0.0

### replaceChars(str, chars, replacedStr)

替换字符串中指定字符集合中的字符

- 参数 : str 原始字符串

- 参数 : chars 要替换的字符集合（字符串形式）

- 参数 : replacedStr 用于替换的字符串

- 返回 : 替换后的字符串

- 版本 : 1.0.0

### length(cs)

获取字符串的长度

- 参数 : cs 字符串

- 返回 : 字符串的长度，如果字符串为 null 则返回 0

- 版本 : 1.0.0

### totalLength(strs)

获取多个字符串的总长度

- 参数 : strs 字符串数组

- 返回 : 所有字符串的总长度，如果数组为 null 则返回 0

- 版本 : 1.0.0

### maxLength(string, length)

如果字符串长度超过指定长度，截取到指定长度

- 参数 : string 原始字符串

- 参数 : length 最大长度

- 返回 : 截取后的字符串

- 版本 : 1.0.0

### upperFirstAndAddPre(str, preString)

将字符串首字母大写并添加前缀

- 参数 : str 原始字符串

- 参数 : preString 要添加的前缀

- 返回 : 处理后的字符串

- 版本 : 1.0.0

### upperFirst(str)

将字符串首字母大写

- 参数 : str 原始字符串

- 返回 : 首字母大写后的字符串

- 版本 : 1.0.0

### lowerFirst(str)

将字符串首字母小写

- 参数 : str 原始字符串

- 返回 : 首字母小写后的字符串

- 版本 : 1.0.0

### isUpperCase(str)

判断字符串是否全部为大写

- 参数 : str 要判断的字符串

- 返回 : 如果字符串全部为大写则返回 true，否则返回 false

- 版本 : 1.0.0

### isLowerCase(str)

判断字符串是否全部为小写

- 参数 : str 要判断的字符串

- 返回 : 如果字符串全部为小写则返回 true，否则返回 false

- 版本 : 1.0.0

### swapCase(str)

反转字符串的大小写

- 参数 : str 原始字符串

- 返回 : 大小写反转后的字符串

- 版本 : 1.0.0

### toString(obj)

将对象转换为字符串

- 参数 : obj 要转换的对象

- 返回 : 对象的字符串表示，如果对象为 null，则返回 "null"

- 版本 : 1.0.0

### toStringOrNull(obj)

将对象转换为字符串，如果对象为 null 则返回 null

- 参数 : obj 要转换的对象

- 返回 : 对象的字符串表示，如果对象为 null，则返回 null

- 版本 : 1.0.0

### toStringOrEmpty(obj)

将对象转换为字符串，如果对象为 null 则返回空字符串

- 参数 : obj 要转换的对象

- 返回 : 对象的字符串表示，如果对象为 null，则返回空字符串

- 版本 : 1.0.0

### builder()

创建一个默认容量的 StringBuilder 对象

- 返回 : 一个默认容量的 StringBuilder 对象

- 版本 : 1.0.0

### builder(capacity)

创建一个指定容量的 StringBuilder 对象

- 参数 : capacity 指定的容量

- 返回 : 一个指定容量的 StringBuilder 对象

- 版本 : 1.0.0

### reverse(str)

反转字符串

- 参数 : str 要反转的字符串

- 返回 : 反转后的字符串，如果输入为 null 则返回 null

- 版本 : 1.0.0

### similar(str1, str2)

计算两个字符串的相似度，返回相似度比例（0.0 - 1.0）

- 参数 : str1 第一个字符串

- 参数 : str2 第二个字符串

- 返回 : 相似度比例

- 版本 : 1.0.0

### similar(str1, str2, scale)

计算两个字符串的相似度，返回相似度比例（0.0 - 1.0），并根据 scale 进行四舍五入

- 参数 : str1 第一个字符串

- 参数 : str2 第二个字符串

- 参数 : scale 小数位数

- 返回 : 四舍五入后的相似度比例

- 版本 : 1.0.0

### uuid()

生成一个 UUID 字符串

- 返回 : UUID 字符串

- 版本 : 1.0.0

### split(str, separator, limit, isTrim, ignoreEmpty)

按照指定分隔符分割字符串序列，可设置分割次数限制、是否去除前后空格、是否忽略空字符串

- 参数 : str 要分割的字符序列

- 参数 : separator 分隔符

- 参数 : limit 分割次数限制，小于等于 0 表示无限制

- 参数 : isTrim 是否去除分割后的子字符串前后空格

- 参数 : ignoreEmpty 是否忽略空字符串

- 返回 : 分割后的字符串列表

- 版本 : 1.0.0

### split(str, len)

按照指定长度分割字符序列

- 参数 : str 要分割的字符序列

- 参数 : len 分割的长度

- 返回 : 分割后的字符串数组

- 版本 : 1.0.0

### split(str, separator)

### cut(str, partLength)

按照指定长度切割字符序列

- 参数 : str 要切割的字符序列

- 参数 : partLength 切割的长度

- 返回 : 切割后的字符串数组

- 版本 : 1.0.0

### sub(str, fromIndexInclude, toIndexExclude)

截取字符序列中指定范围的子字符串

- 参数 : str 要截取的字符序列

- 参数 : fromIndexInclude 起始位置（包含）

- 参数 : toIndexExclude 结束位置（不包含）

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subPreGbk(str, len, suffix)

截取字符序列中指定长度的子字符串（按 GBK 编码），可添加后缀

- 参数 : str 要截取的字符序列

- 参数 : len 截取的长度

- 参数 : suffix 截取后的后缀

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subPreGbk(str, len, halfUp)

截取字符序列中指定长度的子字符串（按 GBK 编码），可选择是否四舍五入

- 参数 : str 要截取的字符序列

- 参数 : len 截取的长度

- 参数 : halfUp 是否四舍五入

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subPre(string, toIndexExclude)

截取字符序列中从开头到指定位置（不包含）的子字符串

- 参数 : string 要截取的字符序列

- 参数 : toIndexExclude 结束位置（不包含）

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subSuf(string, fromIndex)

截取字符序列中从指定位置到结尾的子字符串

- 参数 : string 要截取的字符序列

- 参数 : fromIndex 起始位置

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subSufByLength(string, length)

截取字符序列中从结尾开始指定长度的子字符串

- 参数 : string 要截取的字符序列

- 参数 : length 截取的长度

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subWithLength(input, fromIndex, length)

截取字符串中从指定位置开始指定长度的子字符串

- 参数 : input 要截取的字符串

- 参数 : fromIndex 起始位置

- 参数 : length 截取的长度

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subBefore(string, separator, isLastSeparator)

截取之前字符串

- 参数 : string 要截取的字符序列

- 参数 : separator 分隔符

- 参数 : isLastSeparator 是否使用最后一个分隔符

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subAfter(string, separator, isLastSeparator)

截取之后字符串

- 参数 : string 要截取的字符序列

- 参数 : separator 分隔符

- 参数 : isLastSeparator 是否使用最后一个分隔符

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subBetween(str, before, after)

截取字符序列中两个指定分隔符之间的子字符串

- 参数 : str 要截取的字符序列

- 参数 : before 前分隔符

- 参数 : after 后分隔符

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subBetween(str, beforeAndAfter)

截取字符序列中指定分隔符之间的子字符串（前后分隔符相同）

- 参数 : str 要截取的字符序列

- 参数 : beforeAndAfter 前后分隔符

- 返回 : 截取的子字符串

- 版本 : 1.0.0

### subBetweenAll(str, prefix, suffix)

从给定的字符序列中提取所有位于指定前缀和后缀之间的子字符串

- 参数 : str 要进行搜索的字符序列，不能为 null

- 参数 : prefix 作为子字符串起始标记的字符序列，不能为 null

- 参数 : suffix 作为子字符串结束标记的字符序列，不能为 null

- 返回 : 包含所有找到的子字符串的数组，如果没有找到则返回空数组

- 版本 : 1.0.0

### subBetweenAll(str, prefixAndSuffix)

从给定的字符序列中提取所有位于指定前缀和后缀（前缀和后缀相同）之间的子字符串

- 参数 : str 要进行搜索的字符序列，不能为 null

- 参数 : prefixAndSuffix 作为子字符串起始和结束标记的字符序列，不能为 null

- 返回 : 包含所有找到的子字符串的数组，如果没有找到则返回空数组

- 版本 : 1.0.0

---





