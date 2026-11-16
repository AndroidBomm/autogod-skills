## 日志


#日志 

更新时间:2026-06-15 07:53:04

日志-log

  
  

日志组件：显示日志信息

#一、常用属性

#padding - 内边距

设置内边距

<ui>
    <statusbar />
    <log w="max" h="max" padding="50" />
</ui>

#bg - 背景颜色

设置背景颜色

<log bg="#FF0000" />

#bgImg - 背景图片

设置背景图片

<log bgImg="res/t01.png" />

#二、常用函数

#setTextSize(size)

设置字体大小

参数 : size {float} 字体大小

版本 : 1.7.3

#setBgColor(color)

设置背景颜色

参数 : color {int} 背景颜色

版本 : 1.7.3

#setBgColor(color)

设置背景颜色

参数 : color {String} 背景颜色

版本 : 1.7.3

#getContent()

获取所有日志内容

返回 : {String} 所有日志内容

版本 : 1.7.3

#scrollBottom()

滚动到底部

版本 : 1.7.3

#clear()

清空日志

版本 : 1.7.3

//其实有更加简单的方法来清空日志
$log.delete();//通知所有的日志组件(包括悬浮窗日志)清空日志信息


---
