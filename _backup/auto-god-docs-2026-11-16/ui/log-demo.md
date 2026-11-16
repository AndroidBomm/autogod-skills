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
            <appbar back="true" id="appbar" scrollFlags="scroll|enterAlways" subTitle="加载"
                title="Load" w="max" />
        </appbar-layout>
        <!--滑动布局 在锚点布局中可以配置控件行为是:适配应用条-->
        <nested behavior="appbar" h="max" w="max">
            <!--线性布局:被滑动布局包裹，子控件较多时允许向下滑动-->
            <!--padding:增加内边距[左,上,右,下]-->
            <linear h="max" padding="20,20,20,100" w="max">
                <!--概览-->
                <text gravity="center" h="50" selectable="true" text="概览" />
                <load />
                <!--设置主题颜色-->
                <text gravity="center" h="50" selectable="true" text="设置主题颜色 color=颜色" />
                <linear dir="h" w="max">
                    <load color="#57965C" marginEnd="15" />
                    <load color="#3574F0" marginEnd="15" />
                    <load color="#C94F4F" />
                </linear>
                <!--设置颜色组合-->
                <text gravity="center" h="50" selectable="true"
                    text="设置颜色组合 colors=颜色1,颜色2..." />
                <load colors="#57965C,#3574F0,#C94F4F" />
            </linear>
        </nested>
    </coord>
</ui>


---
