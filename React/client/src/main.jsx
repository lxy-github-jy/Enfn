import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={{
      algorithm: theme.darkAlgorithm,
      token: { colorPrimary: '#97b7ff', colorBgContainer: '#151d30', colorText: '#ecf0fa', colorTextSecondary: '#aab6cc', borderRadius: 10, controlHeight: 42, fontFamily: 'system-ui, sans-serif' },
      components: { Card: { borderRadiusLG: 20 } },
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
