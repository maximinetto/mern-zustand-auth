import path from "path";
import { defineConfig } from "vitest/config";

const setupEnv = path.resolve(
  __dirname,
  "tests",
  "utils",
  "setup-after-env.ts"
);

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    setupFiles: [setupEnv],
  },
});
