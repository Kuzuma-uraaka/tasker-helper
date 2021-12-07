import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  includeAssets: ['index.html','favicon.ico'], 
  plugins: [
    vue()
  ]
})
