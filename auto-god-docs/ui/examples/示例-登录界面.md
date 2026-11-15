## example-login - 登录界面

# 案例-登录界面

更新时间:2026-06-22 19:00:00

完整的登录界面示例，包含账号输入、密码输入、登录按钮等常用元素。

## 核心代码

```xml
<!-- 登录界面布局 -->
<ui>
  <linear dir="v" gravity="center" w="max" h="max" padding="20">
    <img src="res/logo.png" w="80" h="80" />
    <input hint="请输入账号" margin_top="20" />
    <input hint="请输入密码" type="password" margin_top="10" />
    <check text="记住密码" margin_top="10" />
    <button text="登录" margin_top="20" />
  </linear>
</ui>
```

## JavaScript 交互

```javascript
// 加载登录界面布局
let ui = $ui.layout("login.xml");
let btn = ui.id("loginBtn");
let account = ui.id("account");
let password = ui.id("password");

// 登录按钮点击事件
btn.click(() => {
    let acc = account.getText();
    let pwd = password.getText();
    if (acc && pwd) {
        toast("登录中...");
    } else {
        toast("请输入完整");
    }
});
```


---
