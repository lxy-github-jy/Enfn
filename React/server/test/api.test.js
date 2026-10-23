import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

test('学习清单支持查询、创建和更新，并校验错误输入', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  const send = (path, method, body) => fetch(`${base}${path}`, {
    method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  try {
    assert.equal((await fetch(`${base}/health`)).status, 200);
    assert.equal((await (await fetch(`${base}/lessons`)).json()).length, 3);
    const created = await send('/lessons', 'POST', { title: '  学习 Web3  ' });
    assert.equal(created.status, 201);
    const item = await created.json();
    assert.equal(item.title, '学习 Web3');
    const updated = await send(`/lessons/${item.id}`, 'PATCH', { completed: true });
    assert.equal((await updated.json()).completed, true);
    assert.equal((await send('/lessons', 'POST', { title: ' ' })).status, 400);
    assert.equal((await send('/lessons/1', 'PATCH', { completed: 'true' })).status, 400);
    assert.equal((await send('/lessons/missing', 'PATCH', { completed: true })).status, 404);
    assert.equal((await fetch(`${base}/missing`)).status, 404);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
