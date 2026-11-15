//此示例简单的演示E4X与UI的交互

let getButtonText = function () {
    return "我是按钮";
}

//E4X中调用js函数
let uiXml = <ui>
    <statusbar />
    <linear w="max" h="max" gravity="center">
        <button text={getButtonText()} />
    </linear>
</ui>;

//解析xml并显示
let ui = $ui.layout(uiXml);
ui.show();

