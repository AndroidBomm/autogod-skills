// 错误处理示例
try {
    var riskyValue = null;
    var safeXml = <test>
        <value>{riskyValue !== null ? riskyValue : "default"}</value>
    </test>;
    console.log("安全注入:" + safeXml.toXMLString());
} catch(e) {
    console.log("注入异常:" + e.message);
}


