## 多页布局


#多页布局 

更新时间:2026-06-15 07:53:04

多页布局-pager

多页布局允许用户在里面写多个界面并实现界面左右滑动，并且支持绑定标签页布局(tab)以及导航栏(nav)

原生类型:{androidx.viewpager2.widget.ViewPager2}

  
  

多页布局常常配合导航栏(nav)、标签布局(tab)来使用。

#一、常用属性

#fragment - 多页布局

设置多页布局

其中每个fragment最后都会被解析成一个布局，把这个节点理解为ui节点就好了，本质上就是个LinearLayout。

<pager w="max" h="max">
    <fragment />
    <fragment />
    <fragment />
</pager>

#def - 默认下标页面

设置默认下标页面

<pager def="0" />

#padding - 内边距

设置内边距

<!--padding顺序是:左,上,右,下-->
<!--padding只设置一个值：则设置所有方向的内边距-->
<!--padding只设置两个值：则设置左右和上下方向的内边距-->
<pager padding="20" />

#gravity - 重力

设置重力

<pager gravity="start" />

#bg - 背景颜色

设置背景颜色

<radio bg="#1E1F22" />

#bgImg - 背景图片

设置背景图片

<pager bgImg="./img.png" />

#二、常用函数

#setCurIndex(index)

设置当前页面索引

参数 : index {int} 当前页面索引

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
//设置当前页面索引
pager.setCurIndex(0);

#curIndex()

获得当前页面索引

返回 : {int} 当前页面索引

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
//获得当前页面索引
let index = pager.curIndex();

#bind(xTab)

绑定与tab联动

参数 : xTab {tab} 标签布局

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
let tab = ui.id("mTab");
//与标签布局联动
pager.bind(tab);

#bind(xNav)

绑定与nav联动

参数 : xNav {nav} 底部导航布局

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
let nav = ui.id("mNav");
//与导航栏联动
pager.bind(nav);

#onCheck(callback)

监听页面切换事件

参数 : callback {(index)=>{}} 页面切换事件

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
//监听页面切换事件
pager.onCheck((index)=>{
    //..
});

#onState(callback)

监听页面状态事件

参数 : callback {(state)=>{}} 页面状态事件

//解析界面,获得ui布局
let ui = $ui.layout("./mUi.xml");
//获得控件
let pager = ui.id("mPager");
//监听页面状态事件
pager.onState((state)=>{
    //...
});


---
