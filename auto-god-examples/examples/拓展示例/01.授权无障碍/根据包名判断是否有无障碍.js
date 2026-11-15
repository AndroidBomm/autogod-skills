//AIGame官方示例

//这个示例很好的展现了脚本与安卓API的交互，你可以实现任何你想实现的功能

//这里就是与java交互的代码：新版本中，直接定义即可：
var Settings = android.provider.Settings;
var TextUtils = android.text.TextUtils;


let hasAccessibilityPermis = function(pkgName) {
    let accessibilityEnabled = 0;
    let packageName = pkgName.toUpperCase();
    let contentResolver = context.getContentResolver();
    try {
        accessibilityEnabled = Settings.Secure.getInt(contentResolver, Settings.Secure.ACCESSIBILITY_ENABLED);
    } catch (err) {
        //系统不支持无障碍服务
        return false;
    }
    let splitter = new TextUtils.SimpleStringSplitter(':');
    if (accessibilityEnabled == 1) {
        let settingValue = Settings.Secure.getString(contentResolver, Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (settingValue != null) {
            splitter.setString(settingValue);
            while (splitter.hasNext()) {
                let acServiceName = splitter.next().toUpperCase();
                if (acServiceName.contains(packageName)) {
                    return true;
                }
            }
        }
    }
    return false;
}



//测试一下：应用"org.aigame.pro"是否获取了无障碍权限
//alert("类名",hasAccessibilityPermis("org.aigame.pro"));




//导出这个函数
hasAccessibilityPermis;



//示例结束