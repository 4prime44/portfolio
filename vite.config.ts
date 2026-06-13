import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    //npm run dev  użyj '/', 
    //  npm run build (command === 'build') repo
    base: command === 'serve' ? '/' : '/portfolio/',
    plugins: [react()],
  }
})