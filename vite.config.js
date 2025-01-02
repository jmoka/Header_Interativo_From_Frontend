import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["jwt-decode"],
  },
  plugins: [vue()],
  base: './', // Isso garante que os caminhos no build sejam relativos
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    hmr: {
        overlay: false, // Desabilita a sobreposição de erros HMR no navegador
    },
  },
  resolve: {
    alias: {
      '@': '/src',  // Ajuste o alias conforme necessário para corresponder à sua estrutura de diretórios
      url: 'url',    // Confirme se você realmente precisa disso. Se não, pode ser removido
    },
  },
})
