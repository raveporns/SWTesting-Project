import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 📁 โฟลเดอร์ที่เก็บ Test Files
  testDir: './tests',

  // ⏱️ Timeout สำหรับแต่ละ Test (30 วินาที)
  timeout: 30_000,

  // 🔄 ลอง Run ซ้ำกี่ครั้งถ้า Test Fail (สำหรับ CI)
  retries: 0,

  // 📊 ใช้ Reporter แบบไหน
  reporter: 'html',

  // 🔧 ตั้งค่าเริ่มต้นสำหรับทุก Test
  use: {
    // 🌐 Base URL สำหรับ page.goto('/')
    baseURL: 'http://localhost:3000',

    // 📸 ถ่าย Screenshot เมื่อ Fail
    screenshot: 'only-on-failure',

    // 🎬 บันทึก Trace เมื่อ Retry ครั้งแรก
    trace: 'on-first-retry',
  },

  // 🖥️ กำหนด Browser ที่จะทดสอบ
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
      use: { ...devices['Desktop Safari'] },
    },
  ],
});