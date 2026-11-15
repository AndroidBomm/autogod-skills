let ui = $ui.layout("example/$ui - 交互界面/16.progress-进度条/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();