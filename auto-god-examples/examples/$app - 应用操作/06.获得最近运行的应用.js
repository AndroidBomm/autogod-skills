// AIGame官方示例


//获得最进运行的应用
if ($app.hasUsagePermit()) {
    let pkgList = $app.lsRecent();
    if (pkgList !== null) {
        for (let i = 0; i < pkgList.size(); i++) {
            console.log(pkgList[i]);
        }
    }
} else {
    $app.getUsagePermit();
}




// 示例结束