//AIGame官方示例

//注意：本示例并不完善，只用于参考和学习

let hasAccessibilityPermis = require("example/拓展示例/01.授权无障碍/根据包名判断是否有无障碍.js");
let getAccessibilityServiceClassName = require("example/拓展示例/01.授权无障碍/根据包名获取无障碍类名.js");

//解析界面并且显示
let ui = $ui.layout("example/拓展示例/01.授权无障碍/ui.xml");
ui.show();
ui.id("mAppbar").back(()=> {
    ui.finish();
});
ui.id("mAppbar").menu((title)=> {
    if(title=="帮助"){
        alert("帮助","你需要先获取Shizuku的授权，之后就可以给其他应用授权无障碍服务了");
    }
});

//获取列表控件
let ls = ui.id("mLs");

//刷新列表中的应用信息数据
let flushList = function() {
    //获取应用列表信息
    let allAppList = $app.lsUserApp(); //所有的应用：但是不是所有的应用都需要无障碍
    let newAppList = [];
    for (let info of allAppList) {
        let clsName = getAccessibilityServiceClassName(info.pkgName);
        if (clsName == null || clsName.trim().isEmpty()) {
            //无障碍类名为空说明这个app就不需要获取无障碍权限
            continue;
        }
        newAppList.push(info);
    }
    //刷新列表数据：只显示需要无障碍授权的应用
    ls.flush(newAppList);
}


//绑定视图解析
ls.bindHolder((holder,data,position)=> {
    holder.id("appName").setText(data.appName);
    holder.id("pkgName").setText(data.pkgName);
    holder.id("appIcon").setImg(data.icon.getBitmap());
    //设置图标放在子线程中
//    $thread.run(()=>{
//        let iconImg = $app.getIcon(data.pkgName);
//        if(iconImg!=null){
//            holder.id("appIcon").setImg(iconImg.getBitmap());
//        }
//    });

    let permitStatus = holder.id("permitStatus");
    if (hasAccessibilityPermis(data.pkgName)) {
        permitStatus.setText("已授权");
        permitStatus.setColor("#3574F0");
    } else {
        permitStatus.setText("未授权");
        permitStatus.setColor("#FF0000");
    }
    holder.id("card").click(()=> {
        //点击后开始给当前应用进行授权
        if ($szk.hasPermit()) {
            let clsName = getAccessibilityServiceClassName(data.pkgName);
            if (clsName == null || clsName.trim().isEmpty()) {
                toast("当前应用无需无障碍权限");
            } else {
                $tip.show(data.appName,"点击确定开始为应用授权无障碍权限：\n\n应用:"+data.appName+"\n包名:"+data.pkgName+"\n类名:\n"+clsName,()=> {
                    $szk.exe("settings put secure enabled_accessibility_services "+data.pkgName+"/"+clsName,(info)=> {
                        $log.d(info);
                    },(err)=> {
                        $log.e(err);
                    },(result)=> {
                        holder.id("permitStatus").snack("正在授权...");
                        //如果result为null一般就说明当前命令执行成功，没有任何异常信息产生
                        log(result);
                        if (result == null || result == "null") {
                            log("执行成功");
                        }
                        sleep(3000); //该命令执行后未必马上生效，所以3秒后刷新一下列表
                        holder.id("permitStatus").snack("授权完毕");
                        flushList(); //刷新列表
                    });
                });
            }
        } else {
            alert("无Shizuku授权","请先用Shizuku为本app授权");
        }
    });
});



//界面显示后自动刷新一下列表
flushList();

//下拉刷新控件
ui.id("mFlush").flush(()=> {
    flushList();
});


//结束示例