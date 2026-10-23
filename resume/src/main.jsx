import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App.jsx';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#176c55', colorText: '#202d29', colorTextSecondary: '#67736b', colorBorder: '#dce1d9', colorBgContainer: '#ffffff', borderRadius: 12, fontFamily: 'Inter, "Microsoft YaHei", system-ui, sans-serif' } }}><App /></ConfigProvider></React.StrictMode>);
