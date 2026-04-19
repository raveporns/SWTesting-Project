import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 📁 โฟลเดอร์ที่เก็บ Test Files
  testDir: './tests',


  timeout: 30_000,


  retries: 1,


  reporter: 'html',


  use: {

    baseURL: 'http://localhost:3000',


    screenshot: 'only-on-failure',
    video: 'retain-on-failure',


    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        actionTimeout: 10000,
        navigationTimeout: 20000,
      },

    },
  ],
});