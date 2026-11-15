let ui = $ui.layout("example/$ui - 交互界面/18.radio-group-单选按钮组/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();