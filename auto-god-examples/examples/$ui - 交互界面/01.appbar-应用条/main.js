let ui = $ui.layout("example/$ui - 交互界面/01.appbar-应用条/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();