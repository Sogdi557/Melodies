import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
})

// vite.config.js
// import { defineConfig } from 'vite'

// export default defineConfig({
// 	build: {
// 		rollupOptions: {
// 			input: './src/app.tsx', // Make sure this path is correct
// 		},
// 	},
// })
