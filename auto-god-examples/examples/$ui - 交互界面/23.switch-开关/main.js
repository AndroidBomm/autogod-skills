let ui = $ui.layout("example/$ui - 交互界面/23.switch-开关/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();