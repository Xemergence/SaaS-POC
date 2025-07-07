import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    // Include dependencies that might be missed in the dependency optimization
    include: [
      "react-router-dom",
      "lucide-react",
      "@/components/ui/button",
      "@/lib/utils",
    ],
  },
  build: {
    // Optimize chunk size for better loading performance
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["lucide-react", "@radix-ui/react-slot"],
          // Group dashboard components
          "dashboard-core": [
            "./src/components/dashboard/DashboardLayout.tsx",
            "./src/components/dashboard/Sidebar.tsx",
            "./src/components/dashboard/Header.tsx",
          ],
        },
      },
    },
    // Enable source map for better debugging
    sourcemap: process.env.NODE_ENV === "development",
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
});
