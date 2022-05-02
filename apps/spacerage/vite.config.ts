import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "miniplex",
      "miniplex-react",
      "react-trinity",
      "@hmans/controlfreak",
      "@hmans/signal",
      "@hmans/ui"
    ],
    include: ["react/jsx-runtime"]
  }
})
