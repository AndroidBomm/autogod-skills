let ui = $ui.layout("example/$ui - 交互界面/06.chip-group-小片组/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();