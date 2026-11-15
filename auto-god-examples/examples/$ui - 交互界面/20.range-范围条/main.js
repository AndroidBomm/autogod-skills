let ui = $ui.layout("example/$ui - 交互界面/20.range-范围条/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();