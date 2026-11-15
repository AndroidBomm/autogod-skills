let ui = $ui.layout("example/$ui - 交互界面/05.check-多选框/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();