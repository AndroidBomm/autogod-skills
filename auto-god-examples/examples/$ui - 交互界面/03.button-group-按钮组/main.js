let ui = $ui.layout("example/$ui - 交互界面/03.button-group-按钮组/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();
