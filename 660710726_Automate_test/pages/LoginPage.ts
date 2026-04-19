import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://su-courtbooking.vercel.app/');
  }

  async login(username: string, password: string) {
  await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  await this.page.getByRole('button', { name: 'Login' }).click();

    // ✅ รอให้ระบบพร้อม
    await this.page.waitForLoadState('networkidle');

    // เข้า admin dashboard
    await this.page.goto('https://su-courtbooking.vercel.app/admin/dashboard');

    await this.page.waitForSelector('text=จัดการสนาม', { timeout: 10000 });

    // ✅ รอ element สำคัญ
  
    await expect(this.page).toHaveURL(/dashboard/);
  }
}