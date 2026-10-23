# 李旭阳 · 个人简历网页

独立的 React 18 + Ant Design 6 + Vite 项目。内容根据提供的《李旭阳-前端开发工程师.pdf》整理，未从小红书视频获取画面，因此当前设计不是对视频的复刻。

## 本地运行

在本目录执行：

```powershell
npm install
npm run dev
```

访问终端显示的地址，默认 http://127.0.0.1:5174 。此项目不依赖旁边 React 学习项目的 Node.js 后端。

## 功能

- 自我介绍、技术能力、工作时间线、项目经历及教育背景。
- 项目分类筛选、展开详情、全部展开。
- 邮件联系、复制邮箱、网页打印。
- 手机和桌面响应式布局，以及减少动画偏好支持。

## 修改内容

- `src/data.js`：个人资料、工作经历、技术能力与项目内容。
- `src/App.jsx`：页面结构、教育背景和交互。
- `src/main.jsx`：antd 主题 token 与中文配置。
- `src/styles.css`：布局、响应式及打印样式，不重写按钮、输入等基础控件样式。

antd 使用 ESM 具名导入，Vite 生产构建执行 tree-shaking，组件样式按需注入；没有引入整包 CSS 或额外的按需导入插件。构建将 UI、基础依赖和页面代码分别打包。

```powershell
npm run build
npm run preview
```

构建产物位于 `dist/`，可部署到静态托管服务。当前只在本地创建，尚未上线。

已移除 PDF 下载按钮，并通过 `publicDir: false` 禁止发布 public 目录。原 PDF 仍留在本地，不进入构建产物。页面中的邮箱与薪资仍会随网站展示，可在 `src/data.js` 中调整。项目成果数据沿用原简历描述，未新增未经确认的履历。

## GitHub Pages 部署

仓库根目录的 `.github/workflows/resume-pages.yml` 会在 main 分支收到本项目更新后自动安装依赖、构建并发布 `resume/dist`。

1. 在 GitHub 仓库 Settings → Pages → Build and deployment 中，将 Source 设置为 GitHub Actions。
2. 提交并推送 `resume/` 源码和 `.github/workflows/resume-pages.yml`。不要提交 node_modules、dist；云端会自动构建。
3. 在 Actions 中查看 Deploy resume to GitHub Pages，成功后访问 https://lxy-github-jy.github.io/Enfn/ 。需要重跑时可使用 Run workflow。

Vite 使用相对资源路径 `base: './'`，适配仓库子路径访问。这里只发布简历，不发布旁边的学习项目。私有仓库使用 GitHub Pages 需要 GitHub Pro 等支持的套餐；免费账户不能从私有仓库发布 Pages。
