let ui = $ui.layout("example/$ui - 交互界面/12.input-输入框/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();