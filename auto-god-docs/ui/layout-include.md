## 包含布局


#包含布局 

更新时间:2026-06-15 07:53:03

包含布局-include

包含布局主要用于引入其他布局文件，避免单个布局文件过大导致代码臃肿。
包含布局的本质就是一个线性布局，所以在使用的时候遵循线性布局的规则即可。
是布局父类的(XLayout)的子类,因此可以使用XLayout的所有方法

原生类型:{android.widget.LinearLayout}

#一、常用属性

#path - 子界面路径

子界面路径

<include path="xml/child.xml" />

#minW - 最小宽度

设置最小宽度

单位:dp

<include minW="20" />

#minH - 最小高度

设置最小高度

单位:dp

<include minH="20" />

#dir - 布局方向

设置布局方向

<include dir="h" />

#bg - 背景颜色

设置背景颜色

<include bg="#57965C" />

#bgImg - 背景图片

设置背景图片

<include bgImg="res/t01.png" />

#padding - 内边距

设置内边距

参数顺序:左,上,右,下(单位:dp)

<include padding="0,0,0,0" />

#gravity - 重力

设置重力

<include gravity="center" />


---
