## 图片与图标


#图片与图标 

更新时间:2026-06-15 07:53:04

图片-img

常用于显示图片或者图标

原生类型:{com.google.android.material.imageview.ShapeableImageView}

  
  

图片(图标)：用于显示图片或者图标

#一、常用属性

#radius - 圆弧半径

设置圆弧半径

单位:dp

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <img h="60" marginEnd="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_3.png" radius="10"
            w="60" />
        <img h="60" marginEnd="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_3.png" radius="20"
            w="60" />
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img_3.png"
            radius="30" w="60" />
    </linear>
</ui>

#url - 图片链接

设置图片链接

<ui>
    <statusbar />
    <img h="60" radius="30" url="https://q1.qlogo.cn/g?b=qq&nk=2540645055&s=100" w="60" />
</ui>

#strokeWidth - 边框宽度

设置边框宽度

单位:dp

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <!-- 原图 -->
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img.png" w="60" />
        <!-- 设置边框的图 -->
        <img h="60" marginEnd="15" marginStart="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img.png" strokeWidth="10" w="60" />
    </linear>
</ui>

#strokeColor - 边框颜色

设置边框颜色

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <!--原图-->
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img.png" w="60" />
        <!--设置边框的图-->
        <img h="60" marginEnd="15" marginStart="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img.png" strokeWidth="10"
            w="60" />
        <!--设置边框颜色的图-->
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img.png"
            strokeColor="#553574F0" strokeWidth="10" w="60" />
    </linear>
</ui>

#scaleType - 拉伸类型

设置拉伸类型

可选(忽略大小写,可忽略下划线):FIT_CENTER, FIT_START, FIT_END, FIT_XY, CENTER, CENTER_CROP, CENTER_INSIDE, MATRIX

<img scaleType="fitxy"/>

#tint - 图片填充颜色

设置图片填充颜色

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <!--原图-->
        <img h="60" marginEnd="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/boy.png" w="60" />
        <!--设置填充颜色的图-->
        <img h="60" marginEnd="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/boy.png" tint="#57965C"
            w="60" />
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/boy.png"
            tint="#C94F4F" w="60" />
    </linear>
</ui>

#path - 图片本地路径

设置图片本地路径

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <img h="100" marginEnd="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_5.png" w="60" />
    </linear>
</ui>

#src - 图片或图标路径

设置图片或图标路径

icon/图标：用于指定图标，可以填写图标库的名称，也可以填写图标的相对路径或者绝对路径

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <!--使用src来设置图标-->
        <img h="30" src="ic_near_me_fill" w="30" />
        <!--使用icon来设置图标-->
        <img h="30" icon="ic_adb_fill" marginStart="15" w="30" />
    </linear>
</ui>

#rotation - 旋转角度

设置旋转角度

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img_4.png"
            rotation="10" w="60" />
        <img h="60" marginEnd="15" marginStart="15"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_4.png" rotation="30"
            w="60" />
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img_4.png"
            rotation="60" w="60" />
    </linear>
</ui>

#rotateSpeed - 自动旋转的倍速

设置自动旋转的倍速

<img rotateSpeed="3"/>

#rotate - 是否自动旋转

是否自动旋转

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <img h="60" rotate="true" src="ic_audiotrack_outline" w="60" />
        <img h="60" marginEnd="15" marginStart="15" rotate="true" rotateSpeed="10"
            src="ic_audiotrack_outline" w="60" />
        <img h="60" rotate="true" rotateSpeed="20" src="ic_audiotrack_outline" w="60" />
    </linear>
</ui>

#padding - 内边距

设置内边距

<ui>
    <statusbar />
    <linear dir="h" gravity="center" w="max">
        <img h="60" path="example/$ui - 交互界面/09.img-图片图标/img/img_6.png"
            w="60" />
        <img h="60" marginEnd="15" marginStart="15" padding="5"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_6.png" w="60" />
        <img h="60" padding="10"
            path="example/$ui - 交互界面/09.img-图片图标/img/img_6.png" w="60" />
    </linear>
</ui>

#bg - 背景颜色

设置背景颜色

<ui>
    <statusbar />
    <img bg="#5557965C" h="60"
        path="example/$ui - 交互界面/09.img-图片图标/img/img_7.png" w="max" />
    <img bg="#55C94F4F" h="60"
        path="example/$ui - 交互界面/09.img-图片图标/img/img_7.png" w="max" />
</ui>

#bgImg - 背景图片

设置背景图片

<ui>
    <statusbar />
    <img bgImg="example/$ui - 交互界面/09.img-图片图标/img/img_8.png" h="min"
        path="example/$ui - 交互界面/09.img-图片图标/img/img_9.png" radius="30"
        w="max" />
</ui>

#二、常用函数

#setRadius(radius)

设置弧度

参数 : radius {Number} 弧度

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置弧度
mImg.setRadius(30);

#setStrokeWidth(strokeWidth)

设置边框宽度

参数 : strokeWidth {Number} 边框宽度

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置边框宽度
mImg.setRadius(10);

#setStrokeColor(color)

设置边框颜色

参数 : color {String} 边框颜色

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置边框颜色
mImg.setStrokeColor("#C94F4F");

#setTint(tint)

设置填充颜色

参数 : tint {String} 填充颜色

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置填充颜色
mImg.setTint("#C94F4F");

#setBg(color)

设置背景颜色

参数 : color {String} 背景颜色

版本 : 1.9.4

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置背景颜色
mImg.setBg("#C94F4F");

#rotate(rotated)

图片自动旋转

参数 : rotated {boolean} 是否旋转

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图片自动旋转
mImg.rotate(true);

#rotate(rotated, speed)

图片自动旋转

参数 : rotated {boolean} 是否旋转

参数 : speed {float} 旋转速度

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图片自动旋转
mImg.rotate(true,10);

#setRotation(rotation)

设置角度

参数 : rotation {float} 角度

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置角度
mImg.setRotation(45);

#setSrc(src)

设置图标

参数 : src {string} 设置图片名称,并且加载名称上的图片

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图标
mImg.setSrc("logo_ag");

#setUrl(url)

设置图片Url

参数 : url {string} 设置图片Url,并且加载Url上的图片

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图片链接(这里我随便弄了个链接)
mImg.setUrl("https://www.baidu.com/icon.png  ");

#setPath(path)

设置图片路径

参数 : path {string} 设置图片路径,并且加载路径上的图片

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图片
mImg.setPath("./res/mImg.png");

#setImg(bitmap)

设置图片

参数 : bitmap {bitmap} 设置的图片

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//设置图片
let img = $img.read("./res/mImg.png");
mImg.setImg(img.getBitmap());

#getImg()

获取图片

返回 : {bitmap} 获取到的图片

//解析布局,获得ui对象
let ui = $ui.layout("./mUi.xml");
//获取控件
let mImg = ui.id("mImg");
//获取图片
let bitmap = mImg.getImg();
//构建$img对象
let img = $img.open(bitmap);


---
