## 标签布局


#标签布局 

更新时间:2026-06-15 07:53:04

标签布局-tab

原生类型:{com.google.android.material.tabs.TabLayout}

#一、常用属性

#item - 选项标签

选项标签

icon/图标：用于指定图标，可以填写图标库的名称，也可以填写图标的相对路径或者绝对路径

<tab w="max">
    <item text="选项1" icon="ag_logo" iconTint="#FF0000" />
    <item text="选项2" icon="ag_logo" iconTint="#00FF00" />
</tab>

#padding - 内边距

设置内边距

<!--padding顺序是:左,上,右,下-->
<!--padding只设置一个值：则设置所有方向的内边距-->
<!--padding只设置两个值：则设置左右和上下方向的内边距-->
<tab padding="20" />

#bg - 背景颜色

设置背景颜色

<tab bg="#1E1F22" />

#bgImg - 背景图片

设置背景图片

<tab bgImg="./img.png" />


---
