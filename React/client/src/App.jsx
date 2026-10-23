import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Empty,
  Form,
  Input,
  Space,
  Tag,
  Typography,
} from "antd";
import { BrowserProvider, formatEther } from "ethers";

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "请求失败");
  return data;
}

export default function App() {
  const [lessons, setLessons] = useState([]);
  const [num, setNum] = useState(0);
  const [form] = Form.useForm();
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("连接中…");
  const [error, setError] = useState("");
  const [wallet, setWallet] = useState(null);
  const [walletError, setWalletError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([api("/health"), api("/lessons")])
      .then(([health, items]) => {
        if (active) {
          setStatus(health.message);
          setLessons(items);
        }
      })
      .catch((err) => {
        if (active) {
          setStatus("后端未连接");
          setError(err.message);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // 钱包账户或网络变化后清空旧数据，由用户重新连接读取。
  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum?.on) return;
    const reset = () => {
      setWallet(null);
      setWalletError("钱包状态已变化，请重新连接。");
    };
    ethereum.on("accountsChanged", reset);
    ethereum.on("chainChanged", reset);
    return () => {
      ethereum.removeListener?.("accountsChanged", reset);
      ethereum.removeListener?.("chainChanged", reset);
    };
  }, []);

  async function addLesson({ title }) {
    setAdding(true);
    setError("");
    try {
      const item = await api("/lessons", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      setLessons((items) => [...items, item]);
      form.resetFields();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function toggleLesson(item) {
    setError("");
    try {
      const updated = await api(`/lessons/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !item.completed }),
      });
      setLessons((items) =>
        items.map((lesson) => (lesson.id === updated.id ? updated : lesson)),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function connectWallet() {
    setWalletError("");
    setBusy(true);
    try {
      if (!window.ethereum)
        throw new Error("请先安装 MetaMask 等兼容以太坊的钱包扩展。");
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const [balance, network] = await Promise.all([
        provider.getBalance(address),
        provider.getNetwork(),
      ]);
      setWallet({
        address,
        balance: formatEther(balance),
        chainId: network.chainId.toString(),
      });
    } catch (err) {
      setWalletError(err.shortMessage || err.message);
    } finally {
      setBusy(false);
    }
  }

  async function switchNetwork() {
    setWalletError("");
    try {
      if (!window.ethereum) throw new Error("请先安装钱包扩展。");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
      setWallet(null);
      setWalletError("已请求切换至 Sepolia，请重新连接读取。");
    } catch (err) {
      setWalletError(
        err.code === 4902
          ? "请先在钱包中启用或添加 Sepolia 测试网。"
          : err.shortMessage || err.message,
      );
    }
  }

  const completed = lessons.filter((item) => item.completed).length;

  return (
    <main>
      <header>
        <Typography.Link className="brand" href="/">
          ◈ Dev Playground
        </Typography.Link>
        <Tag className="badge">学习项目 · JavaScript</Tag>
      </header>
      <div className="test">测试</div>
      <section className="hero">
        <p className="eyebrow">从界面，到接口，再到链上</p>
        <Typography.Title className="hero-title">
          你的第一个
          <br />
          <span>全栈 Web3 项目。</span>
        </Typography.Title>
        <p>
          用 React 构建界面，用 Node.js 提供数据，再用 ethers.js
          连接钱包。每一个操作，都是一个可以读懂的小例子。
        </p>
        <Space className="tags" wrap>
          {["React 18", "Express", "ethers.js", "Vite", "Ant Design"].map(
            (name) => (
              <Tag key={name}>{name}</Tag>
            ),
          )}
        </Space>
      </section>
      <div className="grid">
        <Card className="card">
          <p className="eyebrow">01 / REACT + NODE.JS</p>
          <Typography.Title level={2}>我的 React 学习计划</Typography.Title>
          <p className="muted">
            {status} · 已完成 {completed}/{lessons.length}
          </p>
          <Form
            form={form}
            name="lesson"
            onFinish={addLesson}
            className="lesson-form"
          >
            <Form.Item
              name="title"
              className="lesson-input"
              rules={[
                { required: true, whitespace: true, message: "请输入学习内容" },
                { max: 100, message: "最多输入 100 个字符" },
              ]}
            >
              <Input
                aria-label="学习内容"
                placeholder="下一步想学什么？"
                maxLength={100}
                disabled={adding}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={adding}>
              添加
            </Button>
          </Form>
          {error && (
            <Alert
              className="feedback"
              type="error"
              showIcon
              title={error}
              role="alert"
            />
          )}
          {num && (
            <Alert
              className="feedback"
              type="error"
              showIcon
              title={error}
              role="alert"
            />
          )}
          <div className="lesson-list">
            {lessons.length ? (
              lessons.map((item) => (
                <div className="lesson-row" key={item.id}>
                  <Checkbox
                    checked={item.completed}
                    onChange={() => toggleLesson(item)}
                  >
                    <Typography.Text
                      delete={item.completed}
                      type={item.completed ? "secondary" : undefined}
                    >
                      {item.title}
                    </Typography.Text>
                  </Checkbox>
                </div>
              ))
            ) : (
              <Empty
                description="暂无学习内容"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
          <p className="note">数据暂存在后端内存中，重启服务会恢复初始清单。</p>
        </Card>
        <Card className="card">
          <p className="eyebrow">02 / WEB3</p>
          <Typography.Title level={2}>探索你的钱包</Typography.Title>
          <p className="muted">
            连接浏览器钱包，读取公开地址、网络和 ETH 余额。
          </p>
          <div className="wallet-icon">◈</div>
          <Space wrap>
            <Button type="primary" onClick={connectWallet} loading={busy}>
              {busy ? "读取中…" : wallet ? "刷新钱包信息" : "连接钱包"}
            </Button>
            <Button onClick={switchNetwork} disabled={busy}>
              切换 Sepolia 测试网
            </Button>
          </Space>
          {wallet && (
            <Descriptions
              className="wallet-details"
              column={1}
              layout="vertical"
              size="small"
              items={[
                {
                  key: "address",
                  label: "钱包地址",
                  children: (
                    <Typography.Text copyable>{wallet.address}</Typography.Text>
                  ),
                },
                { key: "balance", label: "ETH 余额", children: wallet.balance },
                {
                  key: "network",
                  label: "Chain ID",
                  children: `${wallet.chainId}${wallet.chainId === "11155111" ? " · Sepolia" : ""}`,
                },
              ]}
            />
          )}
          {walletError && (
            <Alert
              className="feedback"
              type="info"
              showIcon
              title={walletError}
              role="status"
            />
          )}
          <p className="note">本示例只读取公开信息，不发起交易，不索取私钥。</p>
        </Card>
      </div>
      <footer>
        从 client/src/App.jsx 开始阅读，再看看 server/src/app.js 的接口。
      </footer>
    </main>
  );
}
