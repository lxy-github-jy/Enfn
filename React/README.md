# React + Node.js + Web3 学习项目

在一个项目里学习 React 组件与状态、Express REST API，以及 ethers.js 钱包连接。使用 JavaScript，暂不引入数据库和智能合约，让你先理解前后端和钱包如何协作。

## 启动

需要 Node.js 18.18+ 和 npm。当前环境 Node.js 18 可运行本项目；以后升级 Node 时建议选受支持的 LTS 版本。

```powershell
npm install
npm run dev
```

打开终端显示的前端地址，默认 http://127.0.0.1:5173 。后端默认 http://127.0.0.1:3001 。前端 Vite 把 `/api` 请求代理到后端，因此无需额外设置 CORS。端口 5173 被占用时，Vite 会选择下一个可用端口。

## 可以试什么

1. 添加学习内容、勾选完成，观察 React 状态更新。
2. 在浏览器开发者工具的 Network 面板查看 `/api/lessons` 请求。
3. 安装 MetaMask 等兼容钱包扩展，点击「连接钱包」，批准公开地址访问，查看地址、ETH 余额和 Chain ID。
4. 在钱包中启用 Sepolia 测试网，点击切换按钮，再重新连接。没有测试 ETH 也可以连接，余额显示 0 属于正常情况。

钱包交互需要真实浏览器扩展和你的确认。项目不需要私钥、助记词或付费交易，不要把它们写进代码或提交到 Git。钱包扩展缺失、拒绝连接等情况会在页面显示错误信息。

## 从哪里开始读

```text
client/
  src/App.jsx       React 状态、表单、fetch 请求和钱包交互
  src/styles.css    页面样式与移动端布局
  src/main.jsx      React 应用入口
  vite.config.js    开发服务器与 API 代理
server/
  src/app.js        Express 接口、校验和前端静态文件服务
  src/index.js      后端启动入口
  test/api.test.js  API 集成测试
```

建议顺序：JS 的 async/await → React 的 useState/useEffect → HTTP 与 Express 路由 → 钱包、网络与 ethers.js → 数据库持久化 → 智能合约。

清单数据只存在服务端内存，刷新网页仍在，重启后端后恢复初始数据。它不是多用户应用，没有登录和数据库。

## 仓库与学习记录

仓库：[lxy-github-jy/Enfn](https://github.com/lxy-github-jy/Enfn)。本项目位于仓库的 `React/` 目录，以下 npm 命令都需要在包含本项目 `package.json` 的目录执行。

从仓库根目录进入项目：

```powershell
cd React
npm install
npm run dev
```

## React 怎么学

先围绕「学习清单」掌握 React，再学习后端和 Web3。钱包相关代码可以等到后面的阶段再读。每次只学一个概念，然后用一个小改动验证理解。

### 今天先做这三件事（约 30–45 分钟）

1. 在根目录执行 `npm run dev`，打开终端显示的前端地址。
2. 打开 `client/src/App.jsx`，找到 `<Typography.Title level={2}>我的 React 学习计划</Typography.Title>`，换成你喜欢的标题，保存并观察浏览器自动更新。这是在练习修改 JSX 和使用 antd 组件。
3. 在 `App` 函数中、`return` 前增加 `const nickname = '你的名字';`，在返回的 `<main>` 内增加 `<p>{nickname}，欢迎学习 React！</p>`。把名字换掉，观察页面变化，理解 `{}` 如何显示 JavaScript 表达式。

完成标准：能自己找到页面对应的 JSX，并说明 `<p>文字</p>` 和 `<p>{nickname}</p>` 的区别。此时不用读懂整个 `App.jsx`。

### 按顺序完成这些练习

下面的阶段可以分多次完成，按理解程度推进。

| 阶段 | 学什么 | 在本项目里怎么练 | 完成标准 |
| --- | --- | --- | --- |
| 0. JavaScript 基础 | 函数、对象、数组、解构、`map`、`filter`、`import/export` | 用三个学习内容组成数组，在浏览器控制台练习筛选和转换 | 能解释 `lessons.filter((item) => item.completed)` 返回什么 |
| 1. JSX 和组件 | 标签、`className`、`{}`、组件名大写 | 完成上面的改标题和显示名字练习 | 能写一个返回 JSX 的函数组件 |
| 2. state 和事件 | `useState`、`onClick`、状态驱动界面 | 增加一个独立的点击计数器 | 点击按钮数字增加，能说明为什么使用 setter |
| 3. 表单和列表 | antd `Form.Item`、`onFinish`、`map`、稳定的 `key` | 阅读 `Form`、`addLesson` 和清单 JSX，尝试修改输入校验规则 | 理解 Form 管理输入值，校验通过后才调用 `onFinish` |
| 4. 条件渲染和派生数据 | `&&`、三元表达式、`filter` | 给清单增加「全部 / 未完成 / 已完成」筛选 | 切换筛选不会删除原始清单数据 |
| 5. props 和组件拆分 | 父组件传数据、子组件通过回调通知父组件 | 新建 `client/src/components/LessonItem.jsx`，把单条清单拆出去，用 `item` 和 `onToggle` 两个 props | 拆分后勾选功能仍然可用，不直接修改 props |
| 6. Effect 和接口 | `useEffect`、`fetch`、`async/await`、加载与错误状态 | 阅读第一个 Effect 和 `api()`，增加「正在加载清单」提示 | 能说明初始加载与点击添加分别在哪里触发请求 |
| 7. Node.js 联调 | HTTP 方法、JSON、状态码 | 阅读 `server/src/app.js`，自己增加删除接口，再接上前端删除按钮 | Network 面板中可看到 DELETE 请求，失败时页面有提示 |
| 8. Web3 入门 | 钱包地址、网络、provider、余额单位 | 阅读 `connectWallet`，连接钱包并对比两个网络的 Chain ID | 能说明钱包读取与本项目 `/api` 请求的区别 |

### 第二个小练习：自己加一个计数器

先自己尝试，再对照下面的提示。这个练习只改 `client/src/App.jsx`，不需要增加后端接口。

在 `App` 函数内、其他 `useState` 附近添加（Hook 要放在组件顶层，不能放进条件或事件函数）：

```jsx
const [count, setCount] = useState(0);
```

在 `return` 的 `<main>` 内添加：

```jsx
<button onClick={() => setCount((previous) => previous + 1)}>
  已练习 {count} 次
</button>
```

点击后，setter 告诉 React 更新状态，React 再渲染出新数字。直接写 `count = count + 1` 既不能给这里的 `const` 重新赋值，也不是 React 更新状态的方式。

进阶：独立增加「重置」按钮；刷新浏览器观察计数归零，理解组件 state 默认不负责持久化。

### 每次学习的方法

1. **先预测**：改代码前，写下「我预计页面会发生什么」。
2. **亲手改**：每次只改一个行为，保存后在浏览器验证。
3. **追数据**：输入或点击 → 事件函数 → setter 更新 state → React 重新渲染；涉及接口时，再追踪请求和响应。
4. **自己复述**：说明这一行处理什么数据、为什么放在这里。合上示例，尝试重写刚才的小功能。
5. **记录问题**：遇到错误先看浏览器 Console；接口问题再看 Network 和后端终端，记录报错与修复方法。

容易混淆的地方：props 是父组件传来的数据；state 是组件需要记住、会变化的数据。不要直接修改 state 中的数组或对象，用新数组或新对象更新。像 `completed` 这种可以从 `lessons` 算出的数量，通常直接计算，不必再存一份 state。Effect 用于与外部系统同步，例如初始请求和订阅钱包事件；添加清单这种点击触发的操作放在事件处理函数中。

### 配合阅读的官方资料

- [React 中文快速入门](https://zh-hans.react.dev/learn)：配合组件、JSX、事件和 state 练习阅读。
- [React 哲学](https://zh-hans.react.dev/learn/thinking-in-react)：开始拆组件、设计状态和筛选功能时阅读。

官方文档会随 React 更新，本项目使用 React 18；先练习这里用到的基础概念即可。先完成计数器、清单筛选和组件拆分，再接着做删除接口与钱包练习。

## antd 组件与按需引入

页面使用 antd 的 `Button`、`Card`、`Form`、`Input`、`Checkbox`、`Alert`、`Descriptions`、`Empty`、`Space`、`Tag` 和 `Typography`。入口 `client/src/main.jsx` 用 `ConfigProvider` 配置中文与暗色主题。

```jsx
import { Button, Input } from 'antd';

<Button type="primary" onClick={connectWallet}>连接钱包</Button>
```

按照 [antd 官方 Vite 用法](https://ant.design/docs/react/use-with-vite/)，使用 ESM 具名导入。生产构建由 Vite/Rollup tree-shaking 去除未使用的导出；组件样式由 antd 的 CSS-in-JS 按使用注入，无需导入整包 CSS，也不需要 `babel-plugin-import`。安装时仍然下载整个 npm 包，按需打包不等于每个组件单独安装或运行时懒加载。

自定义 CSS 仅负责页面布局和少量外观，不再用全局 `button`、`input` 等选择器覆盖组件样式。修改统一颜色和圆角时，优先调整 `ConfigProvider` 的 token。

表单改用 `Form.useForm()` 管理字段；`Form.Item` 的 `name="title"` 对应提交数据中的 `title`。`onFinish` 在校验通过后执行，添加成功后 `form.resetFields()` 清空输入，失败时保留输入。原生 `value/onChange` 的写法可以作为独立练习。

## API

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| GET | `/api/health` | 检查服务状态 |
| GET | `/api/lessons` | 获取学习清单 |
| POST | `/api/lessons` | 创建内容，JSON：`{"title":"学习 React"}` |
| PATCH | `/api/lessons/:id` | 更新完成状态，JSON：`{"completed":true}` |

## 检查与构建

```powershell
npm test
npm run build
npm start
```

构建后访问 http://127.0.0.1:3001 ，由 Express 同时提供前端页面和 API。开发时用 `npm run dev`，修改前端会热更新，修改后端会自动重启。

后端端口可通过 PowerShell 设置：`$env:PORT=3002`。开发时更改后端端口，也需要同步修改 `client/vite.config.js` 的代理地址。当前项目无需 `.env` 文件。

后续练习：把学习清单存入 SQLite；拆分 React 组件；添加删除接口；在测试网上部署一个简单合约并读取数据。

