let ui = $ui.layout("example/$ui - 交互界面/26.webview-网页控件/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();