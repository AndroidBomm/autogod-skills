let ui = $ui.layout("example/$ui - 交互界面/27.log-日志显示控件/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();