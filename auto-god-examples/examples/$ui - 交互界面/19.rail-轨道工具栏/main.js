let ui = $ui.layout("example/$ui - 交互界面/19.rail-轨道工具栏/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();