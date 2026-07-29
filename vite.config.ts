import {
    defineConfig
} from 'vite'
import react
    from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    experimental: {
        renderBuiltUrl(filename) {
            return `?a=904377:dist/${filename}`
        },
    },
})
