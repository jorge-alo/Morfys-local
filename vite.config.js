import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/panel/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    historyApiFallback: true, // Habilita el fallback a index.html en desarrollo
  },
   
})
