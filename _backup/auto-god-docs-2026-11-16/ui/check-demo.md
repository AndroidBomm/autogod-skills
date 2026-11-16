## 综合案例


#综合案例 

更新时间:2026-06-15 07:53:03

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
            <appbar back="true" id="mAppbar" scrollFlags="scroll|enterAlways" subTitle="多选框"
                title="Check" w="max" />
        </appbar-layout>
        <!--滑动布局 在锚点布局中可以配置控件行为是:适配应用条-->
        <nested behavior="appbar" h="max" w="max">
            <!--线性布局:被滑动布局包裹，子控件较多时允许向下滑动-->
            <!--padding:增加内边距[左,上,右,下]-->
            <linear h="max" padding="20,20,20,100" w="max">
                <!--概览-->
                <text gravity="center" h="50" selectable="true" text="概览" />
                <linear dir="h" w="max">
                    <check check="true" color="#518855" text="吃饭" />
                    <check check="true" color="#C94F4F" text="睡觉" />
                    <check check="true" color="#3471E9" text="游戏" />
                    <check check="true" color="#C435FF" text="游泳" />
                </linear>
                <!--基础用法-->
                <text gravity="center" h="50" selectable="true" text="基础用法 监听选中事件" />
                <check id="check" text="请勾选我" w="max" />
                <!--设置文本-->
                <text gravity="center" h="50" selectable="true" text="设置文本 text=文本" />
                <check text="我是文本" />
                <!--设置选中状态-->
                <text gravity="center" h="50" selectable="true" text="设置选中状态 check=true" />
                <check check="true" text="选中状态" />
                <check check="false" text="未选中状态" />
                <!--设置主题颜色-->
                <text gravity="center" h="50" selectable="true" text="设置主题颜色 color=颜色" />
                <linear dir="h" w="max">
                    <check check="true" color="#518855" text="吃饭" />
                    <check check="true" color="#C94F4F" text="睡觉" />
                    <check check="true" color="#3471E9" text="游戏" />
                </linear>
                <!--设置按钮颜色-->
                <text gravity="center" h="50" selectable="true" text="设置按钮颜色 tint=颜色" />
                <linear dir="h" w="max">
                    <check check="true" text="吃饭" tint="#518855" />
                    <check check="true" text="睡觉" tint="#C94F4F" />
                    <check check="true" text="游戏" tint="#3471E9" />
                </linear>
                <!--设置文本颜色-->
                <text gravity="center" h="50" selectable="true"
                    text="设置文本颜色 textColor=颜色" />
                <linear dir="h" w="max">
                    <check check="true" text="吃饭" textColor="#518855" />
                    <check check="true" text="睡觉" textColor="#C94F4F" />
                    <check check="true" text="游戏" textColor="#3471E9" />
                </linear>
                <!--设置最小宽度-->
                <text gravity="center" h="50" selectable="true" text="设置最小宽度 minW=100" />
                <linear bg="#55808080" dir="v" w="max">
                    <check bg="#518855" check="true" minW="100" text="吃饭" />
                    <check bg="#C94F4F" check="true" minW="120" text="睡觉" />
                    <check bg="#3471E9" check="true" minW="150" text="游戏" />
                </linear>
                <!--设置最小高度-->
                <text gravity="center" h="50" selectable="true" text="设置最小高度 minH=100" />
                <linear bg="#55808080" dir="h" gravity="center|bottom" w="max">
                    <check bg="#518855" check="true" gravity="bottom" minH="100" text="吃饭" />
                    <check bg="#C94F4F" check="true" gravity="bottom" minH="120" text="睡觉" />
                    <check bg="#3471E9" check="true" gravity="bottom" minH="150" text="游戏" />
                </linear>
                <!--设置内边距-->
                <text gravity="center" h="50" selectable="true" text="设置内边距 padding=10" />
                <linear bg="#55808080" dir="h" w="max">
                    <check bg="#518855" check="true" padding="10" text="吃饭" />
                    <check bg="#C94F4F" check="true" padding="20" text="睡觉" />
                    <check bg="#3471E9" check="true" padding="40" text="游戏" />
                </linear>
                <!--设置重力-->
                <text gravity="center" h="50" selectable="true" text="设置重力 gravity=重力" />
                <check check="true" gravity="start" text="吃饭" w="max" />
                <check check="true" gravity="center" text="睡觉" w="max" />
                <check check="true" gravity="end" text="游戏" w="max" />
                <!--设置背景颜色-->
                <text gravity="center" h="50" selectable="true" text="设置背景颜色 bg=颜色" />
                <linear bg="#55808080" dir="h" w="max">
                    <check bg="#518855" check="true" text="吃饭" />
                    <check bg="#C94F4F" check="true" text="睡觉" />
                    <check bg="#3471E9" check="true" text="游戏" />
                </linear>
                <!--设置背景图片-->
                <text gravity="center" h="50" selectable="true" text="设置背景图片 bgImg=图片" />
                <check bgImg="example/$ui - 交互界面/03.check-复选框/img/bg01.png" check="true"
                    margin="3" text="吃饭" textColor="bg" w="max" />
                <check bgImg="example/$ui - 交互界面/03.check-复选框/img/bg02.png" check="true"
                    margin="3" text="游戏" textColor="bg" w="max" />
                <check bgImg="example/$ui - 交互界面/03.check-复选框/img/bg03.png" check="true"
                    margin="3" text="睡觉" textColor="bg" w="max" />
            </linear>
        </nested>
    </coord>
</ui>

#JS代码

let ui = $ui.layout("example/$ui - 交互界面/02.button-按钮/button.xml");
//绑定标题栏返回按钮
ui.id("appbar").back(()=>{
    ui.finish();
});
//找到多选按钮并且设置监听事件
ui.id("check").onCheck((isChecked)=>{
    if(isChecked){
        toast("我被选中了");
    }else{
        toast("我被取消了");
    }
});
//显示界面
ui.show();


---
