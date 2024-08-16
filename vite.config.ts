import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@images': '/src/assets/images',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@apis': '/src/apis',
    }
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://itpick.store',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/auth')
      },
    },
  },
})
