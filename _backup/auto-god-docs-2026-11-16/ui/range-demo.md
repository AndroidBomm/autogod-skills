## 综合案例


#综合案例 

更新时间:2026-06-15 07:53:04

#Xml代码

<ui>
    <statusbar />
    <!--使用锚点布局配合滚动布局可以使应用条自带动画-->
    <coord w="max">
        <!--应用标题栏-->
        <appbar-layout w="max">
            <!--
            back:开启返回按钮
            scrollFlags:配置滚动布局滚动时的动画标记
            -->
            <appbar back="true" id="mAppbar" scrollFlags="scroll|enterAlways" subTitle="范围条"
                title="Range" w="max" />
        </appbar-layout>
        <!--滑动布局 在锚点布局中可以配置控件行为是:适配应用条-->
        <nested behavior="appbar" h="max" w="max">
            <!--线性布局:被滑动布局包裹，子控件较多时允许向下滑动-->
            <!--padding:增加内边距[左,上,右,下]-->
            <linear h="max" padding="20,20,20,100" w="max">
                <!--设置开始值-->
                <text gravity="center" h="50" selectable="true" text="设置开始值 form=数字" />
                <range from="0" to="100" w="max" />
                <!--设置开始值-->
                <text gravity="center" h="50" selectable="true" text="设置开始值 fromValue=数字" />
                <range from="0" fromValue="10" to="100" w="max" />
                <range from="0" fromValue="20" to="100" w="max" />
                <!--设置结束值-->
                <text gravity="center" h="50" selectable="true" text="设置结束值 toValue=数字" />
                <range from="0" fromValue="10" to="100" toValue="50" w="max" />
                <range from="0" fromValue="20" to="100" toValue="50" w="max" />
                <!--设置进步值-->
                <text gravity="center" h="50" selectable="true" text="设置进步值 step=数字" />
                <range from="0" fromValue="10" step="1" to="100" toValue="50" w="max" />
                <!--设置主题颜色-->
                <text gravity="center" h="50" selectable="true" text="设置主题颜色 color=颜色" />
                <range color="#57965C" from="0" fromValue="10" to="100" toValue="50" w="max" />
                <range color="#C94F4F" from="0" fromValue="10" to="100" toValue="50" w="max" />
                <range color="#3574F0" from="0" fromValue="10" to="100" toValue="50" w="max" />
                <!--设置标签文字-->
                <text gravity="center" h="50" selectable="true" text="设置标签文字 label=文本" />
                <range label="比例:" w="max" />
                <!--设置标签后缀-->
                <text gravity="center" h="50" selectable="true" text="设置标签后缀 labelEnd=文本" />
                <range labelEnd="%" w="max" />
                <!--设置背景颜色-->
                <text gravity="center" h="50" selectable="true" text="设置背景颜色 bg=颜色" />
                <range bg="#57965C" w="max" />
                <range bg="#C94F4F" w="max" />
                <range bg="#3574F0" w="max" />
                <!--设置背景图片-->
                <text gravity="center" h="50" selectable="true"
                    text="设置背景图片 bgImg=图片路径" />
                <range bgImg="example/$ui - 交互界面/19.range-范围条/img/img.png" w="max" />
            </linear>
        </nested>
    </coord>
</ui>

#JS代码

let ui = $ui.layout("example/$ui - 交互界面/10.input-输入框/input.xml");
//绑定标题栏返回按钮
ui.id("mAppbar").back(()=>{
    ui.finish();
});
//先获取控件
let mButton = ui.id("mButton");
let mInput = ui.id("mInput");
//找到按钮、点击按钮的时候就显示输入框的内容
mButton.click(()=>{
    //获取输入框的内容
    let content = mInput.getText();
    //显示输入框的内容
    mButton.snack("内容:"+content);
});
//显示界面
ui.show();


---
