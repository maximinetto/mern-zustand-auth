import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import * as url from "url";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({ path: path.resolve(dirname, ".env.test") });

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:5173",
  },
});
