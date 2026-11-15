let ui = $ui.layout("example/$ui - 交互界面/15.pager-滑动页面/ui.xml");

let mAppbar = ui.id("mAppbar");

if(mAppbar!=null){
    mAppbar.back((view) => {
        ui.finish();
    });
}

//滑动页面(pager)与标签(tab)联动
let mPager = ui.id("mPager");
let mTab = ui.id("mTab");
if(mPager!=null&&mTab!=null){
    mPager.bind(mTab);
}

ui.show();