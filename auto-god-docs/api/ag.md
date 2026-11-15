# $ag - 图色框架

- 更新时间:2026-02-08 19:43:35

图色框架

### setDebug(debug)

开启调试模式

默认是开启调试模式的(推荐开启:更加直观的看到执行效果),找到图片则会在屏幕上绘制图片的位置,找到颜色则绘制点

- 参数 : debug {boolean} 是否开启调试模式

### findImg(options)

寻找图片

自动截屏一次,然后在传入的region(范围)中找图片，如果region为空则全屏寻找,不管找没找到,都会回收掉资源,并且返回结果

- 参数 : options 参数 {object} 配置参数

- 返回 : 位置 {point} 返回找到位置的中心点

- 版本 : 1.0.0

```javascript
//参数:
let options = {
    path:"",//图片路径
    region:[],//(可选)找图的范围:必须是4位,且后两位不能为0
    similar:0.8,//(可选)找图的相似值:不能低于(最小值:0.3)
    trans:false,//(可选)是否找透明背景的图片
};
//使用:
let point = $ag.findImg({
    path:"/sdcard/Pictures/t01.png",
    region:[200,200,300,500],
});

```
### findImgClick(options)

寻找图片并且点击

先截屏一次,如果图片找到了,那么就点击这个图片位置中心点

- 参数 : options {obj} 参数

- 返回 : {point} 位置

- 版本 : 1.0.0

```javascript
//参数:
let options = {
    path:"",//图片路径
    region:[],//(可选)找图的范围:必须是4位,且后两位不能为0
    similar:0.8,//(可选)找图的相似值:不能低于(最小值:0.3)
    trans:false,//(可选)是否找透明背景的图片
    px: 0, //(可选)点击位置相对于中点的x偏移量
    py: 0, //(可选)点击位置相对于中点的y偏移量
};
//使用:
let point = $ag.findImgClick({
    path:"/sdcard/Pictures/t01.png",
    region:[200,200,300,500],
});

```
### waitImg(options, failCallback)

等待图片

截屏后找图没找到就会执行回调一次,然后就继续截屏并且找图

值得注意的是ensure如果设置了true,那么你就要了解ensureMode的含义：

1.ensureMode:"once"：假如传入的ensureTimes是3,那么就会循环截屏3次,只要其中有1次成功,那么就会返回找到的位置
2.ensureMode:"more"：假如传入的ensureTimes是3,那么就会循环截屏3次,必须保证3次全部都成功,那么就会返回找到的位置

确认执行完毕之后,会返回找到的位置,如果没有找到,则继续等待图片,每次找图都会执行确认流程。

整体流程是：
1.先截屏一次
2.执行确认流程(如果设置确认流程ensure为false,就执行正常找图流程)
3.如果确认流程通过(确认流程会重复截屏ensureTimes次,并且按照ensureMode处理结果),那么就返回找到的位置
4.如果确认流程没有通过(执行回调),那么就继续截屏并且执行回到1

- 参数 : options {object} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败(或确认流程失败)后回调

- 返回 : {point} 找到图片的中点位置

let options = {
    path:"",
    region:[],//(可选)
    similar:0.8,//(可选)
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:false,//(可选)找到后是否要进行确认
    ensureMode:"once",//(可选)确认的模式是多次(more)还是一次
    ensureTimes:3,//(可选)确认找到的次数
    ensureDur:300,//(可选)每次确认的间隔时间
    waitTimes:75,//(可选)等待次数
    waitDur:800 //(可选)等待延迟
}
//使用:
let point = $ag.waitImg({
    path:"/sdcard/Pictures/t01.png",
    region:[200,200,300,500],
});

### waitImg(options)

等待图片

- 参数 : options {object} 参数

- 返回 : {point} 中点位置

let options = {
    path:"",
    region:[],//(可选)
    similar:0.8,//(可选)
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:false,//(可选)找到后是否要进行确认
    ensureMode:"once",//(可选)确认的模式是多次(more)还是一次
    ensureTimes:3,//(可选)确认找到的次数
    ensureDur:300,//(可选)每次确认的间隔时间
    waitTimes:75,//(可选)等待次数
    waitDur:800 //(可选)等待延迟
}

### waitImgClick(options, failCallback)

等待图片并点击

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point} 中点位置

let options = {
    path:"",
    region:[],//(可选)
    similar:0.8,//(可选)
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:false,//(可选)找到后是否要进行确认
    ensureMode:"once",//(可选)确认的模式是多次(more)还是一次
    ensureTimes:3,//(可选)确认找到的次数
    ensureDur:300,//(可选)每次确认的间隔时间
    waitTimes:75,//(可选)等待次数
    waitDur:800, //(可选)等待延迟
    px: 0, //(可选)点击位置相对于中点的x偏移量
    py: 0, //(可选)点击位置相对于中点的y偏移量
}

### waitImgClick(options)

等待图片并点击

- 参数 : options {object} 配置

- 返回 : {point} 中点位置

let options = {
    path:"",
    region:[],
    similar:0.8,
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:true,//可选
    ensureMode:"once",//可选
    ensureTimes:3,//可选
    ensureDur:300,//可选
    waitTimes:75,//可选
    waitDur:800, //可选
    px: 0, //(可选)点击位置相对于中点的x偏移量
    py: 0, //(可选)点击位置相对于中点的y偏移量
}

### findImgInRegions(options)

寻找图片

给定一个范围数组,只能在指定的范围数组当中查找对应的图片,找到后,返回图片的位置和数组下标

执行流程:先截屏,然后循环每个范围数组,对小图片进行查找，找到之后就立马返回

使用场景:比如关闭广告的[关闭按钮],有时候这个关闭按钮出现在右上角,有时候出现在中间下方的位置,在这种不确定关闭图片位置的情况下，使用此函数，将可能出现关闭按钮的位置全部传入，找到后即可返回位置。

- 参数 : options 参数

- 返回 : {point point,int index} 位置与范围下标

let options = {
    path:"", //必填:图片路径
    region:[[],[],[]], //必填:多个范围数组
    similar:0.8, //可选
    trans:false, //可选(是否寻找透明图)
}

### findImgsOne(options)

寻找图片

传入多组图片数据,截屏后找图,只要其中有一组数据成功找到,则直接返回结果

适用的场景：比如我们每次打开游戏或者应用界面的时候，我们并不知道它会不会弹出来一个更新界面或者广告界面,此时我们可以使用次函数,把可能出现的界面情况都传入进去,只要找到了,那么就会返回执行结果,我们就能知道是哪一个界面了。

- 参数 : options {obj} 参数

- 返回 : {point point,int index} 结果是一个对象,其中包含point和index两个属性,point是图片中点位置,index是图片下标

let options = {
    data:[
    {
        path:"",//必填
        region:[],//必填
        similar:0.8,//可选(默认0.8)
        trans:false,//可选(是否寻找透明图)
    },
    {
        //...多个这样的数据
    }
    ]
}

### waitImgsOne(options)

等待图片

传入多组图片数据,截屏后找图,只要其中有一组数据成功找到,则直接返回结果

适用的场景：比如我们每次打开游戏或者应用界面的时候，我们并不知道它会不会弹出来一个更新界面或者广告界面,此时我们可以使用次函数,把可能出现的界面情况都传入进去,只要找到了,那么就会返回执行结果,我们就能知道是哪一个界面了。

- 参数 : options {obj} 参数

- 返回 : {point point,int index} 图片中点位置和下标

let options = {
    data:[
    {
        path:"",//必填
        region:[],//必填
        similar:0.8,//可选(默认0.8)
        trans:false,//可选(是否寻找透明图)
    },
    {
        //...多个这样的数据
    }
    ],
    waitTimes:75,//选填(默认75)
    waitDur:800 //选填(默认800)
}

### waitImgsOne(options, failCallback)

等待图片

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point point,int index} 图片中点位置和下标

let options = {
    data:[
    {
        path:"",//必填
        region:[],//必填
        similar:0.8,//可选(默认0.8)
        trans:false,//可选(是否寻找透明图)
    },
    {
        //...多个这样的数据
    }
    ],
    waitTimes:75,//选填(默认75)
    waitDur:800 //选填(默认800)
}

### clickImgWhileNot(options)

循环点击图片(直到图片消失)

使用场景：比如在一些比较卡顿的应用或游戏中,我希望点击关闭按钮,但是游戏界面比较卡顿,可以使用此函数不断的点击,直到关闭成功

- 参数 : options {obj} 参数

- 返回 : {point} 中点位置

let options = {
    path:"",
    region:[],//(可选)
    similar:0.8,//(可选)
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:false,//(可选)找到后是否要进行确认
    ensureMode:"once",//(可选)确认的模式是多次(more)还是一次
    ensureTimes:3,//(可选)确认找到的次数
    ensureDur:300,//(可选)每次确认的间隔时间
    waitTimes:75,//(可选)等待次数
    waitDur:800, //(可选)等待延迟
    px: 0, //(可选)点击位置相对于中点的x偏移量
    py: 0, //(可选)点击位置相对于中点的y偏移量
}

### clickImgWhileNot(options, failCallback)

循环点击图片(直到图片消失)

使用场景：比如游戏人物打开背包后要存放苹果,此时我们可以使用此函数不断的点击苹果,把它存放到背包中

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point} 中点位置

let options = {
    path:"",
    region:[],//(可选)
    similar:0.8,//(可选)
    trans:false,//(可选)是否寻找透明背景的图片
    ensure:false,//(可选)找到后是否要进行确认
    ensureMode:"once",//(可选)确认的模式是多次(more)还是一次
    ensureTimes:3,//(可选)确认找到的次数
    ensureDur:300,//(可选)每次确认的间隔时间
    waitTimes:75,//(可选)等待次数
    waitDur:800, //(可选)等待延迟
    px: 0, //(可选)点击位置相对于中点的x偏移量
    py: 0, //(可选)点击位置相对于中点的y偏移量
}

### bloodPercent(options)

血条检测

主要根据传入的颜色(可传入多个颜色以,分割)和血条的范围来计算出血条的百分比

- 参数 : options {object} 参数

- 返回 : {int} -1-100的值(为-1则表示没有血量)

let options = {
    region: [], //(必填)血条范围
    color: "#ff0000,#ff0000", //(必填)可传入多个
    threshold:5 //(可选)偏差值(默认5)
}
let p = $ag.bloodPercent(options);

### findColor(options)

找色

- 参数 : options {object} 参数

- 返回 : {Point} 坐标

let options = {
    region: [], //(必填)范围
    color: "#ff0000,#ff0000", //(必填)颜色(多个用,分割)
    threshold:5 //(可选)偏差值(默认5)
}

### findMultiColors(options)

多点找色

多点找色并不能很好的适配全分辨率,因为把颜色点相对位置写死了,而不同的设备中,相对点位不同

- 参数 : options {object} 参数

- 返回 : {point} 位置

let options = {
    multiColors:[
        [1,2,"#FF0000",5],//每个数据元都是px,py,color,threshold组成的
        [1,2,"#FF0000",5],//px,py是相对于传入的主颜色的偏移位置
        //...多个点色
    ],
    color:"#000000",
    threshold:5,
    region:[],
}

### findMultiColorsClick(options)

多点找色

- 参数 : options {object} 参数

- 返回 : {point} 位置

let options = {
    multiColors:[
        [1,2,"#FF0000",5],//每个数据元都是px,py,color,threshold组成的
        [1,2,"#FF0000",5],//px,py是相对于传入的主颜色的偏移位置
        //...多个点色
    ],
    color:"#000000",
    threshold:5,
    region:[],
    px:0, //(可选)点击位置x偏移量
    py:0 //(可选)点击位置y偏移量
}

### waitMultiColors(options)

等待多点色

- 参数 : options {object} 参数

- 返回 : {point} 位置

### waitMultiColorsClick(options)

等待多点色

- 参数 : options {object} 参数

- 返回 : {point} 位置

### waitMultiColors(options, failCallback)

等待多点色

- 参数 : options {object} 参数

- 参数 : failCallback {(curTimes)=>{}}回调

- 返回 : {point} 位置

let options = {
    multiColors:[],
    color:"#000000",
    threshold:5,
    rect:null,
    ensure:false,
    ensureMode:"once",
    ensureTimes:3,
    ensureDur:1000,
    waitTimes:50,
    waitDur:1000,
}

### waitMultiColorsClick(options, failCallback)

等待图片

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point} 中点位置

### findColorClick(options)

找色点击

- 参数 : options {object} 参数

- 返回 : {point} 位置

### waitColor(options, failCallback)

等待颜色

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point} 中点位置

let options = {
    color:"",
    region: [],//(可选)找色的范围,建议填写上
    threshold:5,
    ensure:false,
    ensureMode:"once",
    ensureTimes:3,
    ensureDur:1000,
    waitTimes:50,
    waitDur:1000,
}

### waitColor(options)

等待颜色

- 参数 : options {obj} 参数

- 返回 : {point} 中点位置

let options = {
    color:"",
    region: [],//(可选)找色的范围,建议填写上
    threshold:5,
    ensure:false,
    ensureMode:"once",
    ensureTimes:3,
    ensureDur:1000,
    waitTimes:50,
    waitDur:1000,
}

### waitColorWhileNot(options, failCallback)

等待颜色消失

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

let options = {
    color:"",
    region: [],//(可选)找色的范围,建议填写上
    threshold:5,
    ensure:false,
    ensureMode:"once",
    ensureTimes:3,
    ensureDur:1000,
    waitTimes:50,
    waitDur:1000,
}

### waitColorClick(options, failCallback)

等待颜色

- 参数 : options {obj} 参数

- 参数 : failCallback {(curTimes)=>{}} 找图失败后回调

- 返回 : {point} 中点位置

### waitColorClick(options)

等待颜色

- 参数 : options {obj} 参数

- 返回 : {point} 中点位置

### findColorInRegions(options)

在多个区域中找色

- 参数 : options {object} 参数

- 返回 : {point} 中点位置

let options = {
    color:"",
    threshold: 5,
    region:[[],[],[]],//多个范围
}
let result = $ag.findColorInRegions(options);

### findColorsOne(options)

找到一种颜色

- 参数 : options {object} 参数

- 返回 : {point} 中点位置

### closeDraw()

关闭绘制的图案

---





