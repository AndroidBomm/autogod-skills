//AIGame官方示例

//这个示例很好的展现了脚本与安卓API的交互，你可以实现任何你想实现的功能

//这里就是与java交互的代码：新版本中，不再使用任何关键字或者方法属性来导入包，而是直接定义即可：
var PackageInfo = android.content.pm.PackageInfo;
var PackageManager = android.content.pm.PackageManager;
var PackageInfo = android.content.pm.ServiceInfo;
var AccessibilityService = android.accessibilityservice.AccessibilityService;
var Intent = android.content.Intent;

// 判断ServiceInfo是否为无障碍服务
let isAccessibilityService = function(serviceInfo) {
    // 方法1：检查服务权限
    if (serviceInfo.permission != null && serviceInfo.permission.equals("android.permission.BIND_ACCESSIBILITY_SERVICE")) {
        return true;
    }
    // 方法2：使用 GET_RESOLVED_FILTER 标志获取 intent filter
    let intent = new Intent(AccessibilityService.SERVICE_INTERFACE);
    let resolveInfoList = context.getPackageManager().queryIntentServices(intent, PackageManager.GET_RESOLVED_FILTER);
    for (let resolveInfo of resolveInfoList) {
        if (resolveInfo.serviceInfo.name.equals(serviceInfo.name) && resolveInfo.serviceInfo.packageName.equals(serviceInfo.packageName)) {
            return true;
        }
    }
    return false;
}


// 获取应用的无障碍服务类名列表
let getAccessibilityServiceClass = function(packageName) {
    // 获取应用服务信息（包含无障碍服务）
    let packageInfo = context.getPackageManager().getPackageInfo(packageName, PackageManager.GET_SERVICES | PackageManager.GET_META_DATA);
    if (packageInfo.services != null) {
        for (let service of packageInfo.services) {
            // 通过权限和 intent-filter 判断是否为无障碍服务
            if (isAccessibilityService(service)) {
                return service.name;
            }
        }
    }
    return null;
}

//测试一下：获取包名为"org.aigame.pro"的无障碍类名
//alert("类名",getAccessibilityServiceClass("org.aigame.pro"));




//导出这个函数
getAccessibilityServiceClass;





//示例结束