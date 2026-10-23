import express from 'express';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export function createApp() {
  const app = express();
  const lessons = [
    { id: '1', title: '理解 React 组件、props 和 state', completed: false },
    { id: '2', title: '通过 fetch 调用 Node.js 接口', completed: false },
    { id: '3', title: '连接钱包，读取链上余额', completed: false },
  ];
  app.use(express.json({ limit: '10kb' }));
  app.get('/api/health', (_req, res) => res.json({ message: 'Node.js 已连接' }));
  app.get('/api/lessons', (_req, res) => res.json(lessons));
  app.post('/api/lessons', (req, res) => {
    const title = req.body?.title;
    if (typeof title !== 'string' || !title.trim() || title.trim().length > 100) {
      return res.status(400).json({ error: '请输入 1–100 个字符的学习内容。' });
    }
    const item = { id: randomUUID(), title: title.trim(), completed: false };
    lessons.push(item);
    res.status(201).json(item);
  });
  app.patch('/api/lessons/:id', (req, res) => {
    const item = lessons.find((lesson) => lesson.id === req.params.id);
    if (!item) return res.status(404).json({ error: '学习内容不存在。' });
    if (typeof req.body?.completed !== 'boolean') return res.status(400).json({ error: 'completed 必须是布尔值。' });
    item.completed = req.body.completed;
    res.json(item);
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: '接口不存在。' }));
  // npm run build 后，由 Node.js 托管前端产物。
  const clientDist = fileURLToPath(new URL('../../client/dist/', import.meta.url));
  app.use(express.static(clientDist));
  app.get('*', (_req, res, next) => res.sendFile(`${clientDist}/index.html`, (err) => err && next(err)));
  app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    res.status(status).json({ error: status === 400 ? '请求 JSON 格式错误。' : status === 413 ? '请求内容过大。' : '请求处理失败。' });
  });
  return app;
}
