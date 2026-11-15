let ui = $ui.layout("example/$ui - 交互界面/21.slider-拖拽条/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();