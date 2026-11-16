## 小片


#小片 

更新时间:2026-06-15 07:53:03

小片-chip

原生类型:{com.google.android.material.chip.Chip}

可以当作小按钮来使用，也可以当作多选框来使用

  
  

小片：可以用来显示一些小标签什么的，还是蛮好看的。

不过，也可以用来作为按钮使用。

#一、常用属性

#text - 文本

设置文本

<ui>
    <statusbar />
    <chip text="我是文本" />
</ui>

#icon - 图标

设置图标

icon/图标：用于指定图标，可以填写图标库的名称，也可以填写图标的相对路径或者绝对路径

<ui>
    <statusbar />
    <chip icon="ic_access_alarms_fill" text="看我图标" />
</ui>

#iconTint - 图标颜色

设置图标颜色

<ui>
    <statusbar />
    <chip icon="ic_access_alarms_fill" iconTint="#57965C" text="看我图标颜色" />
</ui>

#textColor - 文本颜色

设置文本颜色

<ui>
    <statusbar />
    <chip text="看我颜色" textColor="#C94F4F" />
</ui>

#textSize - 文本尺寸

设置文本尺寸

单位:sp

<ui>
    <statusbar />
    <chip text="看我尺寸" textSize="10" />
    <chip text="看我尺寸" textSize="15" />
    <chip text="看我尺寸" textSize="18" />
</ui>

#radius - 弧度

设置弧度

<ui>
    <statusbar />
    <chip radius="5" text="看我弧度" />
    <chip radius="8" text="看我弧度" />
    <chip radius="11" text="看我弧度" />
</ui>

#checkable - 是否可以选中

设置是否可以选中

<ui>
    <statusbar />
    <chip checkable="true" text="我可以选中" />
</ui>

#check - 是否选中

设置是否选中

<ui>
    <statusbar />
    <chip check="true" checkable="true" text="我被选中了" />
    <chip check="false" checkable="true" text="我没被选中" />
</ui>

#showCheckIcon - 是否显示选中图标

是否显示选中图标

<ui>
    <statusbar />
    <chip check="true" checkable="true" showCheckIcon="true" text="我可以选中" />
</ui>

#checkIconTint - 选中图标颜色

设置选中图标颜色

<ui>
    <statusbar />
    <chip check="true" checkIconTint="#C94F4F" checkable="true" showCheckIcon="true"
        text="我可以选中" />
</ui>

#clickable - 是否可以点击

设置是否可以点击

<ui>
    <statusbar />
    <chip clickable="true" text="我可以被点击" />
    <chip clickable="false" text="我不能被点击" />
</ui>

#showCloseIcon - 是否显示关闭按钮

是否显示关闭按钮

<ui>
    <statusbar />
    <chip showCloseIcon="true" text="我可以被点击" />
</ui>

#closeIconTint - 关闭按钮的颜色

设置关闭按钮的颜色

<ui>
    <statusbar />
    <chip closeIconTint="#C94F4F" showCloseIcon="true" text="我可以被点击" />
</ui>

#ripper - 涟漪颜色

设置涟漪颜色

<ui>
    <statusbar />
    <chip clickable="true" ripper="#3574F0" text="涟漪颜色" />
</ui>

#color - 主题颜色

设置主题颜色

<ui>
    <statusbar />
    <chip color="#3574F0" text="主题颜色" />
    <chip color="#57965C" text="主题颜色" />
    <chip color="#C94F4F" text="主题颜色" />
</ui>

#minW - 最小宽度

设置最小宽度

单位:dp

<ui>
    <statusbar />
    <chip minW="60" text="60" />
    <chip minW="100" text="100" />
    <chip minW="130" text="130" />
</ui>

#minH - 最小高度

设置最小高度

单位:dp

<ui>
    <statusbar />
    <linear dir="h" gravity="center|bottom" w="max">
        <!--对于chip而言，gravity属性几乎没有任何效果-->
        <chip gravity="bottom" minH="60" text="60" />
        <chip gravity="bottom" minH="100" text="100" />
        <chip gravity="bottom" minH="130" text="130" />
    </linear>
</ui>

#padding - 内边距

设置内边距

单位:dp

<ui>
    <statusbar />
    <linear dir="h" w="max">
        <chip padding="10" text="10" />
        <chip padding="20" text="20" />
        <chip padding="30" text="30" />
    </linear>
</ui>

#二、常用函数

#check(checked)

设置选中状态

参数 : checked {boolean} 选中状态

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置选中状态
mChip.check(true);

#isChecked()

判断是否选中

返回 : {boolean} 是否选中

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//获取选中状态
let is = mChip.isChecked();
if (is) {
    toast("选中");
}else{
    toast("未选中");
}

#onClose(callback)

监听关闭事件

参数 : callback {(view)=>{}} 关闭回调

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//监听关闭事件
mChip.onClose((v)=>{
    //我被关闭了
});

#onCheck(callback)

监听选中事件

参数 : callback {(isChecked)=>{}} 选中回调

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//监听选中事件
mChip.onCheck((is)=>{
    if (is) {
         toast("选中");
    }
});

#setText(text)

设置文本

参数 : text {string} 文字

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置文本
mChip.setText("我是小片");

#getText()

获得文本

返回 : {string} 文字

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//获取文本
let text = mChip.getText();

#setTextColor(color)

设置文本颜色

参数 : color {string} 颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置文本颜色
mChip.setTextColor("#3574F0");

#setTextSize(size)

设置文本尺寸

参数 : size {number} 尺寸

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置文本尺寸
mChip.setTextSize(15);

#setRadius(radius)

设置弧度

参数 : radius {number} 尺寸

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置弧度
mChip.setRadius(15);

#setIcon(icon)

设置图标

参数 : icon {String} 图标

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置图标
mChip.setIcon("ic_favorite_border_fill");

#setIconTint(color)

设置图标颜色

参数 : color {String} 颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置图标颜色
mChip.setIconTint("#3574F0");

#setCheckable(checkable)

设置可选

参数 : checkable {Boolean} 是否可选

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置可选
mChip.setCheckable(true);

#setShowCheckIcon(show)

设置显示选中图标

参数 : show {Boolean} 是否显示选中图标

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置显示选中图标
mChip.setShowCheckIcon(true);

#setCheckIconTint(color)

设置选中图标颜色

参数 : color {String} 选中图标颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置选中图标颜色
mChip.setCheckIconTint("#57965C");

#setClickable(clickable)

设置可点击

参数 : clickable {Boolean} 是否可以被点击

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置可点击
mChip.setClickable(true);

#setShowCloseIcon(show)

设置显示关闭按钮

参数 : show {Boolean} 是否显示关闭按钮

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置显示关闭按钮
mChip.setShowCloseIcon(true);

#setCloseIconTint(color)

设置关闭图标颜色

参数 : color {String} 关闭图标颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置关闭图标颜色
mChip.setCloseIconTint("#57965C");

#setRipper(color)

设置涟漪颜色

参数 : color {String} 涟漪颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置涟漪颜色
mChip.setCloseIconTint("#57965C");

#setColor(color)

设置主题颜色

参数 : color {String} 主题颜色

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置主题颜色
mChip.setColor("#57965C");

#setMinW(minW)

设置最小宽度

参数 : minW {number} 最小宽度

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置最小宽度
mChip.setMinW(100);

#setMinH(minH)

设置最小高度

参数 : minH {number} 最小高度

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置最小高度
mChip.setMinH(100);

#setPadding(left, top, right, bottom)

设置内边距

参数 : left {number} 左边距

参数 : top {number} 上边距

参数 : right {number} 右边距

参数 : bottom {number} 下边距

//解析布局,获取ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mChip = ui.id("mChip");
//设置内边距
mChip.setPadding(15,15,15,15);


---
