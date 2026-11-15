let ui = $ui.layout("example/$ui - 交互界面/08.edit-编辑器/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();