
alert("注意","开始运行后,我会在10秒内添加9个卡片,最后1秒删除所有卡片");

//解析一个可以滑动的界面
let mainUi = $ui.layout(`
<ui>
    <statusbar/>
    <nested w="max">
        <linear w="max" id="mLayout" />
    </nested>
</ui>
`);
let mLayout = mainUi.id("mLayout");

$thread.create(()=> {
    for (let i = 0; i < 10; i ++) {
        sleep(1000);
        //由于我们需要动态的添加布局,所以每次都必须使用layout重新解析生成新的布局
        //因为view被添加后,已经归属于父容器了,就不允许添加到其他容器,因此view不能被重复使用(安卓机制)
        //所以需要重新使用layout解析生成新的布局
        let itemUi = $ui.layout(`
            <ui>
                <card w="max" id="mCard" margin="3">
                    <text text="我是卡片" margin="15" />
                </card>
            </ui>
            `);
        let card = itemUi.id("mCard");
        //[核心方法]直接在第三方线程操作view,因为已经封装好了,不需要手动调用ui线程操作view
        mLayout.addView(card);
    }
    //[核心方法]最后移除所有元素
    mLayout.removeAll();
    alert("结束","执行结束了");
    mainUi.finish();
}).start();



mainUi.show();