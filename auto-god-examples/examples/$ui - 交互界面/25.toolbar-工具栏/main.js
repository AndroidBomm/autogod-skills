let ui = $ui.layout("example/$ui - 交互界面/25.toolbar-工具栏/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}


ui.show();