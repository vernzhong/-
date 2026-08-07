import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts",  // 你的 schema 文件路径
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});