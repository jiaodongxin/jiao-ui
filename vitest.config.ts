import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      allowOnly: process.env.TEST_MODE === "ui",
      // setupFiles: ["./__tests__/setup.ts"],
      include: ["./__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      environment: "jsdom",
      reporters: ["verbose", "junit", "vitest-sonar-reporter"],
      coverage: {
        enabled: true,
        reportsDirectory: ".coverage",
        provider: "istanbul",
        reporter: [
          // print test coverage report to terminal
          "text",
          // print test coverage summary to terminal
          "text-summary",
          // generate html report
          "html",
          // generate lcov report
          "lcov",
        ],
        all: true,
        include: ["src/**/*.{js,ts,vue}"],
        exclude: [
          "src/locales/**",
          "src/**/*.d.ts",
          "src/index.ts",
          "src/types/**",
        ],
      },
    },
  })
)