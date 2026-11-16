# 本技能的来源与同步方法

> 这个文件不是给脚本用的，是给「下次更新」用的备忘。

## 数据来源

- 官方包路径：`G:\AutoGod-Docs-v-26.10.24\AutoGod-Docs-v-26.10.24`
- 官方包内更新时间：**2026-10-22**
- 本次整合日期：**2026-11-16**

## 搬运规则（只搬运，不改写）

| 官方 | 本技能 | 说明 |
|---|---|---|
| `api_en/**/*.md` | `api/` | **原样复制**，保留模块子目录（如 `api/act/Node.md`），**一个字节都没改** |
| `ui_en/**/*.md` | `ui/` | 同上，保留控件子目录（如 `ui/button/demo.md`） |
| `api_cn/`、`ui_cn/` | ✗ 不收 | 按用户要求只用英文版 |
| `*.png`、`*.gif`（223 个） | ✗ 不收 | 图片对模型无用，约 15 MB |

## 自己加的东西（不属于官方）

| 文件 | 来源 |
|---|---|
| `guide/` | 本项目的踩坑记录、自检清单、开发规范、Agent执行协议、悬浮窗错误修正 |
| `guide/icon-list.md` | 从客户端「辅助信息 → 内置图标」整理的 1537 个图标名 |
| `debug/` | adb / adb-setup / ws / intent / tasker 调试笔记 |
| `projects/` | 两个完整项目案例 |
| `examples/` | 分类示例汇总 + `ui-示例-*.md` 8 个 UI 综合案例 |
| `SKILL.md` | 中文索引 + 三条红线 |

## 下次官方更新怎么重跑

1. 备份当前：`xcopy /E /I /Y "G:\skills\auto-god-docs" "G:\skills\_backup\auto-god-docs-<新日期>"`
2. 记下 `guide/ debug/ projects/ examples/ SKILL.md _meta.md` 这 6 项（不属于官方，不能被覆盖）
3. 删掉 `api/` 与 `ui/`，重新从新的官方包复制 `api_en/**/*.md` → `api/`、`ui_en/**/*.md` → `ui/`
4. 检查官方是否有**新增模块**（和本文件上面的清单对比）——新增的会随复制自动带上
5. 检查官方是否**改名/删除**了模块，`SKILL.md` 里的模块表要跟着改
6. 同步到 C 盘：`C:\Users\admin\.dsh\skills\auto-god-docs`
7. `git add -A && git commit -m "同步官方文档 <版本>" && git push`

## 版本核对命令

```bash
# 官方与技能里的 md 数量应一致
find "G:/AutoGod-Docs-v-26.10.24/AutoGod-Docs-v-26.10.24/api_en" -name '*.md' | wc -l   # 97
find "G:/skills/auto-god-docs/api" -name '*.md' | wc -l                                  # 97
find "G:/AutoGod-Docs-v-26.10.24/AutoGod-Docs-v-26.10.24/ui_en" -name '*.md' | wc -l     # 83
find "G:/skills/auto-god-docs/ui" -name '*.md' | wc -l                                   # 83

# 抽查逐字节一致（应无输出）
diff -r --brief "G:/skills/auto-god-docs/api" "G:/AutoGod-Docs-v-26.10.24/AutoGod-Docs-v-26.10.24/api_en" | grep -v '仅\|Only'
```
