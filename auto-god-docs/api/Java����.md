# $java - Java 交互

- 更新时间:2026-06-22 19:00:00

在 AIGame 中可以直接使用 Java 类，支持两种导入方式：直接定义变量和 `$import` 关键字。

---

## 直接定义 Java 类

与 AutoJS 不同，AutoJS 使用 `importClass(java.util.ArrayList)` 导入类；AIGame 直接定义即可，无需任何关键字或方法。

```javascript
// 导入 Java 类——直接赋值给变量
let ArrayList = java.util.ArrayList;
let HashMap = java.util.HashMap;
let File = java.io.File;

// 导入 Android 类
let PackageInfo = android.content.pm.PackageInfo;
let PackageManager = android.content.pm.PackageManager;
let ServiceInfo = android.content.pm.ServiceInfo;
let AccessibilityService = android.accessibilityservice.AccessibilityService;
let Intent = android.content.Intent;
let Context = android.content.Context;

// 然后直接使用这些类
let intent = new Intent(AccessibilityService.SERVICE_INTERFACE);
let list = new ArrayList();
list.add("hello");
```

---

## $import 关键字

`$import` 也可以用来导入 Java 类或 Java 包

```javascript
// 使用 $import 导入 Java 类
let ArrayList = $import.java.util.ArrayList;
let Context = $import.android.content.Context;
```

---

## 注意事项

- 直接定义和用 `$import` 导入的类**两者是等效的**
- 推荐使用直接定义的方式，更直观
- 导入后即可像普通 JavaScript 类一样使用（`new` 实例化、调用静态方法等）


---


