//AIGame官方示例

//注意：本示例并不完善，只用于参考和学习
//本实例主要用来教学AppInfo的原生交互
//具体在代码的40行左右位置

//解析界面并且显示
let ui = $ui.layout("example/拓展示例/02.备份应用/ui.xml");
ui.show();
ui.id("mAppbar").back(()=> {
    ui.finish();
});
ui.id("mAppbar").menu((title)=> {
    if(title=="帮助"){
        alert("帮助","本示例教学如何使用AppInfo的原生交互来实现备份应用的功能,具体在代码的40行左右位置");
    }
});

//获取列表控件
let ls = ui.id("mLs");

//刷新列表中的应用信息数据
let flushList = function() {
    //获取应用列表信息
    let appList = $app.lsUserApp(); //获取用户应用：而不是系统应用
    ls.flush(appList); //每个元素的对象都是AppInfo类型的，参考文档{AppInfo}
}


//绑定视图解析
ls.bindHolder((holder,data,position)=> {
    holder.id("appName").setText(data.appName);
    holder.id("pkgName").setText(data.pkgName);
    //data本身就是AppInfo对象，参考文档{AppInfo}我们发现它存在icon属性
    //icon属性的类型是Image，参考文档{Image}它可以获取Bitmap对象
    holder.id("appIcon").setImg(data.icon.getBitmap());
    holder.id("card").click((view)=> {
        //点击后开始给当前应用进行备份
        $tip.input("备份路径","/sdcard/Pictures/"+data.appName+".apk",(value)=>{
            //接下来就涉及到原生交互了
            //我们通过AppInfo的info属性拿到：{ApplicationInfo}对象(android.content.pm.ApplicationInfo)
            let applicationInfo = data.info;
            //在安卓中{ApplicationInfo}有属性sourceDir可以获得apk的安装位置
            let apkPath = applicationInfo.sourceDir;
            log("Apk安装位置："+apkPath);
            //我们把这个路径下的apk拷贝到输入的路径下面就行了
            $file.copy(apkPath,value);
            holder.id("card").snack("拷贝完成!");
        });
    });
});



//界面显示后自动刷新一下列表
flushList();

//下拉刷新控件
ui.id("mFlush").flush(()=> {
    flushList();
});


//结束示例