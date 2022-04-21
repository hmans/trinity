import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["react-trinity"],
    include: ["react/jsx-runtime"]
  },
  plugins: [react()]
})
