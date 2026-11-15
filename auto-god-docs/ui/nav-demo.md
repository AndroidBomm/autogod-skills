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
            <appbar back="true" id="mAppbar" scrollFlags="scroll|enterAlways" subTitle="加载"
                title="Load" w="max" />
        </appbar-layout>
        <!--滑动布局 在锚点布局中可以配置控件行为是:适配应用条-->
        <nested behavior="appbar" h="max" w="max">
            <!--线性布局:被滑动布局包裹，子控件较多时允许向下滑动-->
            <!--padding:增加内边距[左,上,右,下]-->
            <linear h="max" padding="20,20,20,100" w="max">
                <!--概览-->
                <text gravity="center" h="50" selectable="true" text="概览" />
                <nav w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
                <!--设置图标颜色-->
                <text gravity="center" h="50" selectable="true" text="设置图标颜色 iconTint=颜色" />
                <nav iconTint="#57965C" w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
                <!--设置文本颜色-->
                <text gravity="center" h="50" selectable="true"
                    text="设置文本颜色 textColor=颜色" />
                <nav textColor="#57965C" w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
                <!--设置选中颜色-->
                <text gravity="center" h="50" selectable="true"
                    text="设置选中颜色 checkColor=颜色" />
                <nav checkColor="#57965C" w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
                <!--设置背景颜色-->
                <text gravity="center" h="50" selectable="true" text="设置背景颜色 bg=颜色" />
                <nav bg="#57965C" w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
                <!--设置背景图片-->
                <text gravity="center" h="50" selectable="true" text="设置背景图片 bgImg=图片" />
                <nav bgImg="example/$ui - 交互界面/14.nav-导航栏/img/img.png" w="max">
                    <menu icon="ic_home_fill" text="主页" />
                    <menu icon="ic_article_fill" text="日志" />
                    <menu icon="ic_settings_fill" text="设置" />
                </nav>
            </linear>
        </nested>
    </coord>
</ui>


---
