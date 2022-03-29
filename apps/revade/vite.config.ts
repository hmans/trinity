import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "miniplex",
      "miniplex-react",
      "react-trinity",
      "@hmans/controlfreak",
      "@hmans/signal"
    ],
    include: ["react/jsx-runtime"]
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "stats.html",
          template: "treemap"
        })
      ]
    }
  }
})
