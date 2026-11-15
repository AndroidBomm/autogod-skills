//可拖动的悬浮日志窗口 - SysFloaty 完整案例
//
//⚠️ SysFloaty/AppFloaty 只有 setXY/setX/setY，没有 getXY/getX/getY！
//   必须用 JS 变量跟踪窗口位置，不能调用 win.getXY()
//⚠️ onTouch 用 XView.onTouch()，不用 setOnTouchListener
//⚠️ MotionEvent 常量用数字 0/1/2/3，不用 android.view.MotionEvent.ACTION_*
//⚠️ bg 透明度用 #AARRGGBB 格式，放在内层容器上
//⚠️ textSize 用纯数字，不带 dp/sp 单位

let POS_KEY = "floaty_log_demo_pos";
let MAX_LOGS = 200;
let win = null;
let logLines = [];
let posTimer = null;
//位置跟踪变量（代替不存在的 getXY）
let winX = 100, winY = 200;
//拖动状态
let dragStartX = 0, dragStartY = 0;
let winStartX = 0, winStartY = 0;
let isLocked = false;

let logColors = { i:"#FFFFFF", d:"#00FF00", w:"#0080FF", e:"#FF0000" };
let logIcons = { i:"💬", d:"🔧", w:"⚠️", e:"❌" };

function savePos(x, y) {
    try { $storage.put(POS_KEY, JSON.stringify({x:x, y:y})); } catch(e) {}
}
function loadPos() {
    try { let d = $storage.get(POS_KEY); if (d) return JSON.parse(d); } catch(e) {}
    return {x:100, y:200};
}

function updateLog() {
    if (!win) return;
    try {
        let tv = win.id("tvLog");
        if (tv) {
            let sb = "";
            for (let i = 0; i < logLines.length; i++) {
                if (i > 0) sb += "<br>";
                sb += logLines[i];
            }
            tv.setText(android.text.Html.fromHtml(sb));
        }
        let ct = win.id("countText");
        if (ct) ct.setText(logLines.length + "/" + MAX_LOGS);
        //自动滚动到底部
        try {
            let sv = win.id("logScroll");
            if (sv) { sv.getView().fullScroll(android.view.View.FOCUS_DOWN); }
        } catch(e) {}
    } catch(e) {}
}

function addLog(level, text) {
    let c = logColors[level] || "#FFFFFF";
    let ic = logIcons[level] || "💬";
    logLines.push('<font color="' + c + '">' + ic + " " + text + "</font>");
    if (logLines.length > MAX_LOGS) logLines.shift();
    updateLog();
}

//先关闭已有的
$floaty.closeAll();
let pos = loadPos();

win = $floaty.newSys(`
<ui>
<frame w="140dp" radius="3dp">
<linear dir="v" w="max" h="max" bg="#44333333">
    <linear dir="h" w="max" h="22dp" bg="#AA444444" gravity="center_vertical" padding="2,0">
        <text text="日志" textSize="9" textColor="#FFFFFF" w="0" weight="1" gravity="left" />
        <text id="countText" text="0/200" textSize="8" textColor="#AAAAAA" margin="0,0,1,0" gravity="center" />
        <text id="lockBtn" text="🔓" textSize="9" textColor="#4CAF50" w="14dp" h="14dp" gravity="center" margin="0,0,1,0" />
        <text id="btnClear" text="🗑" textSize="9" textColor="#FF9800" w="14dp" h="14dp" gravity="center" margin="0,0,1,0" />
        <text id="btnClose" text="✕" textSize="9" textColor="#FFFFFF" bg="#d32f2f" radius="2dp" w="14dp" h="14dp" gravity="center" />
    </linear>
    <scroll id="logScroll" w="max" h="60dp" bg="#66333333">
        <text id="tvLog" textSize="10" textColor="#CCCCCC" padding="2" />
    </scroll>
</linear>
</frame>
</ui>
`);

win.setXY(pos.x, pos.y);
winX = pos.x; winY = pos.y;
win.touch(true);

//关闭
try { win.id("btnClose").click(() => { if (posTimer) clearInterval(posTimer); win.close(); }); } catch(e) {}
//清空
try { win.id("btnClear").click(() => { logLines = []; updateLog(); }); } catch(e) {}
//锁定
try {
    win.id("lockBtn").click(() => {
        isLocked = !isLocked;
        let el = win.id("lockBtn");
        if (el) el.setText(isLocked ? "🔒" : "🔓");
    });
} catch(e) {}

//拖拽：用 XView.onTouch()，不用 setOnTouchListener
function onDrag(event, view) {
    if (isLocked) return false;
    switch (event.getAction()) {
        case 0: //ACTION_DOWN
            dragStartX = event.getRawX();
            dragStartY = event.getRawY();
            winStartX = winX;
            winStartY = winY;
            return true;
        case 2: //ACTION_MOVE
            winX = winStartX + (event.getRawX() - dragStartX);
            winY = winStartY + (event.getRawY() - dragStartY);
            win.setXY(winX, winY);  //用跟踪变量，不能调 getXY()
            return true;
        case 1: //ACTION_UP
        case 3: //ACTION_CANCEL
            savePos(winX, winY);
            return true;
    }
    return false;
}
try { win.id("rootFrame").onTouch(onDrag); } catch(e) {}
try { win.id("tvLog").onTouch(onDrag); } catch(e) {}

//定期保存位置
posTimer = setInterval(() => { if (win) savePos(winX, winY); }, 10000);

//演示日志
let count = 0;
setInterval(() => { addLog("i", "测试日志 #" + (++count)); }, 3000);
addLog("i", "悬浮窗已启动");
addLog("i", "拖动任意位置移动窗口");
addLog("w", "点击🔓可锁定防拖动");
