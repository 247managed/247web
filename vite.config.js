import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dotnet: resolve(__dirname, 'dotnet-development/index.html'),
        blazor: resolve(__dirname, 'blazor-development/index.html'),
        swiftui: resolve(__dirname, 'swiftui-development/index.html'),
        react: resolve(__dirname, 'react-development/index.html'),
        maui: resolve(__dirname, 'maui-development/index.html'),
        apis: resolve(__dirname, 'api-integrations/index.html'),
        modernization: resolve(__dirname, 'application-modernization/index.html'),
        support: resolve(__dirname, 'managed-application-support/index.html'),
        social: resolve(__dirname, 'social-media-engagement/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        process: resolve(__dirname, 'process/index.html'),
        quality: resolve(__dirname, 'quality/index.html'),
        techstack: resolve(__dirname, 'technology-stack/index.html'),
        cases: resolve(__dirname, 'case-studies/index.html'),
        blog: resolve(__dirname, 'blog/index.html')
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
