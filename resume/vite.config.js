import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ base: './', plugins: [react()], publicDir: false, build: { rollupOptions: { output: { manualChunks(id) { if (id.includes('node_modules')) return id.includes('antd') || id.includes('@ant-design') || id.includes('@rc-component') ? 'ui' : 'vendor'; } } } } });
