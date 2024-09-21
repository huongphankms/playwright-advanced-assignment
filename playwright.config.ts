import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 5,
  reporter: 'html',
  use: {
    trace: 'on',
    headless: true,
  },

  projects: [
    {
      name: "setup",
      testDir: "./tests/Exercise",
      testMatch: "dependencies-setup.ts",
      teardown: "teardown",
    },
    {
      name: "teardown",
      testDir: "./tests/Exercise",
      testMatch: "dependencies-teardown.ts",
      use: { storageState: "./auth.json" },
    },
    {
      name: 'chromium',
      dependencies: ["setup"],
      use: { ...devices['Desktop Chrome'], storageState: "./auth.json" },
    },
  ],
});
