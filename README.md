# 卡皮暖暖 CapyWarm

**一只原创小水豚的情绪陪伴插件（DeepSeek Harness / DSH）** — an *original* capybara emotional-support plugin for DeepSeek Harness.

> 🦫 慢慢来，比较快。/ Slow is smooth, smooth is fast.

[![CI](https://github.com/GenXGSS/dsh-capywarm/actions/workflows/ci.yml/badge.svg)](https://github.com/GenXGSS/dsh-capywarm/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 功能 / Features

| 工具 Tool | 作用 What it does |
|---|---|
| `capy_comfort` | 你累了 / 烦了 / 难过 / 焦虑时，暖暖用原创台词安慰你。Offer warm comfort when you are tired, frustrated, sad or anxious. |
| `capy_praise` | 任务完成时发放水豚式表扬与庆祝。Celebrate finished work with a capybara cheer. |
| `capy_vibe` | 随机一条「情绪稳定」提醒：喝水、伸懒腰、别跟猎豹比速度。A random grounding nudge for long sessions. |

台词全部中英双语原创，附带原创 ASCII 小水豚与可配置自定义台词。模型会在合适的时机（你抱怨、报错、熬大夜、完成任务）主动调用。

## 安装 / Install

```sh
# 从 GitHub 安装（无需构建授权 / no build approval needed）
dsh plugin --profile web add github:GenXGSS/dsh-capywarm
```

npm 包暂未发布；如需 `dsh plugin add dsh-capywarm` 直装，可自行 `npm publish`（包名已预留：`dsh-capywarm`）。

安装后重启 `dsh web` 即可。试着对模型说：
「今天好累，让暖暖安慰我一下」 / "I'm exhausted, ask the capybara to comfort me."

## 配置 / Configuration

在 profile 的 `cordis.patch.yml` 中覆盖该行配置：

```yaml
- patch:
    - id: capywarm
      config:
        language: zh          # zh | en | mixed（默认 mixed）
        characterName: 暖暖    # 头部显示的角色名
        asciiArt: true        # 是否附带原创 ASCII 小水豚
        customComfort: []     # 自定义安慰台词（逐条追加）
        customVibe: []        # 自定义情绪提醒台词
```

## IP 与版权说明 / IP & Copyright Notice

- 本插件的角色「暖暖 / CapyWarm」、全部台词与 ASCII 图形均为**原创内容**，按 MIT 许可发布。
- 本插件与「水豚噜噜」（铁罐（北京）文化传媒有限公司的注册商标及登记美术作品）或任何其他水豚 IP **无关**，未使用其名称、形象、设定或台词。
- 「水豚 / 卡皮巴拉 / capybara」为动物通用名称；本插件仅作描述性使用。
- 若你希望基于某个已有 IP（如水豚噜噜）创作或商用，请先取得 IP 方授权（水豚噜噜的授权信息可在其版权方或授权平台查询）。

The character, all dialogue lines and the ASCII art are original works by this project, released under MIT. This plugin is not affiliated with "水豚噜噜" (Lulu the Capybara, a trademark and registered artwork of 铁罐 (Beijing) Culture Media Co., Ltd.) or any other capybara IP.

## 从零构建说明（给维护者）/ Build notes

纯 ESM JavaScript，无构建步骤：`index.js` 为 Cordis 插件入口（`name` / `Config` / `apply`），`cordis.patch.yml` 为 bundle 层（`package.json#dsh.bundle.patch` 指向它）。修改后直接发布即可，npm 分发的是预构建代码，用户无需 allowBuilds 授权。

## 开发与测试 / Development & testing

单元测试零依赖（Node 内置 test runner + 模块钩子 mock 两个 DSH peer 包），覆盖工具注册契约、参数处理、语言渲染、自定义台词与 mood 归一化：

```sh
node --test --import ./test/mocks/register.mjs "test/*.test.mjs"
```

CI 在 Node 22 / 24 上自动运行（push 与 PR 触发），徽章见文件头。

### 真机冒烟清单 / Smoke checklist（需要有 DSH 的机器）

单元测试无法覆盖真实 DSH 运行时，发布前请在目标机器按序确认：

1. **层组合**：`dsh plugin --profile web add github:GenXGSS/dsh-capywarm` 安装后，执行 `dsh --profile web --dump-config`，输出中应出现 `# == dsh-capywarm` 层。
2. **干净启动**：`dsh web` 启动无 `did not activate` / pending 报错（boot audit 会拦截未激活的插件行）。
3. **端到端调用**：Web UI 里依次说三句话，确认模型调用对应工具——
   - 「今天好累，让暖暖安慰我一下」→ 触发 `capy_comfort`（tired 档 + ASCII）
   - 「我们刚修好了登录 bug！」→ 触发 `capy_praise`
   - 「来一条摸鱼语录」→ 触发 `capy_vibe`
4. **配置生效**：在 profile 的 `cordis.patch.yml` 中覆盖 `language: en`，HMR 后英文输出。

## 发布到插件市场 / Publishing

1. `npm publish`（保持公开访问）。
2. GitHub 仓库打上 `dsh-plugin` topic 并按版本打 `vX.Y.Z` tag —— 各社区注册表（dshmk.com、dshmarketplace.dev、awesome-dsh-plugin.com 等）会自动同步收录。
3. 如需进入官方「发现」索引，按[官方市场索引格式](https://deepseek-harness.github.io/deepseek-harness/guide/plugin-market)提交 `index.json`（可由 deepseek-harness 仓库自带的参考生成器生成）。

## License

MIT — see [LICENSE](./LICENSE).
