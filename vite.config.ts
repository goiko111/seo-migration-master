import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

const nonBlockingBuildCss = () => ({
  name: "winerim-non-blocking-build-css",
  enforce: "post" as const,
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"([^>]*?)href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
      (_match, before: string, href: string, after: string) => {
        const attrs = `${before}${after}`;
        const crossorigin = /\bcrossorigin\b/.test(attrs) ? " crossorigin" : "";
        return [
          `<link rel="preload" as="style"${crossorigin} href="${href}" />`,
          `<link rel="stylesheet"${crossorigin} href="${href}" media="print" onload="this.media='all'" />`,
          `<noscript><link rel="stylesheet"${crossorigin} href="${href}" /></noscript>`,
        ].join("");
      },
    );
  },
});

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), nonBlockingBuildCss(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller output
    target: "es2020",
    // Keep first-page preload focused on the shell. Route-only/vendor chunks still load
    // when their lazy imports execute, but they no longer compete with FCP/LCP.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !/vendor-(charts|markdown|motion|radix|supabase)/.test(dep)),
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — always needed
          "vendor-react": ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
          // Tiny shared UI helpers used by the shell; keep them out of heavy feature chunks.
          "vendor-ui-utils": ["clsx", "tailwind-merge", "class-variance-authority"],
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
