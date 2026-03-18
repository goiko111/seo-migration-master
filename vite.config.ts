import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller output
    target: "es2020",
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed
          "vendor-react": ["react", "react-dom"],
          // Router — always needed but separate from React core
          "vendor-router": ["react-router-dom"],
          // Framer Motion — heavy, used everywhere but can load async
          "vendor-motion": ["framer-motion"],
          // Supabase client
          "vendor-supabase": ["@supabase/supabase-js"],
          // React Query
          "vendor-query": ["@tanstack/react-query"],
          // UI primitives — lazy loaded with components
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tabs",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
          ],
          // Recharts — only used on admin/analytics pages
          "vendor-charts": ["recharts"],
          // Markdown — only used on article pages
          "vendor-markdown": ["react-markdown", "remark-gfm"],
        },
      },
    },
    // Increase chunk size warning limit (we're optimizing manually)
    chunkSizeWarningLimit: 200,
  },
}));
