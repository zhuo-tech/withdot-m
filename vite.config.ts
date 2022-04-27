import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import * as path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni(),vueJsx({}),],
    server: {
        // proxy: {
        //     // @ts-ignore
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: 'http://localhost:8000',
        //         changeOrigin: true,
        //         rewrite: (path: any) => path.replace(new RegExp('^' + process.env.VUE_APP_BASE_API), ''),
        //     },
        // },
    },
    envDir: './env',
    envPrefix: ['VUE_APP_'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },

})
