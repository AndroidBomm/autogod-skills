let ui = $ui.layout("example/$ui - 交互界面/07.drop-下拉框/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();