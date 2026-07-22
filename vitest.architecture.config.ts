import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: [
      "src/test/product-architecture.test.ts",
      "src/test/presentation-content.test.ts",
      "src/test/partner-deck.test.ts",
    ],
    pool: "threads",
    maxWorkers: 1,
    minWorkers: 1,
  },
});
