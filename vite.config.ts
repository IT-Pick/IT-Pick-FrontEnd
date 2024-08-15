import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://itpick.store',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/auth')
      },
      '/user': {
        target: 'https://itpick.store',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/user/, '/user')
      },
    },
  },
})
