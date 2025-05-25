import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // using swc
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Jenie-travel/', // this is CRUCIAL for GitHub Pages
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
