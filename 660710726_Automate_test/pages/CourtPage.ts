import { Page, expect } from '@playwright/test';

export class CourtPage {
  constructor(private page: Page) {}

  async addCourt(name: string) {
    await this.page.getByRole('button', { name: '+ เพิ่มสนามใหม่' }).click();
    await this.page.getByRole('textbox', { name: 'เช่น ฟุตบอล' }).fill(name);
    await this.page.getByRole('button', { name: 'บันทึกข้อมูล' }).click();
    await this.page.getByRole('button', { name: 'ตกลง' }).click();

    await expect(this.page.locator('table')).toContainText(name);
  }

  async addCourtWithoutName() {
    await this.page.getByRole('button', { name: '+ เพิ่มสนามใหม่' }).click();
    await this.page.getByRole('button', { name: 'บันทึกข้อมูล' }).click();
  }

  async disableAnyCourt() {
    const checkbox = this.page.locator('tbody input[type="checkbox"]').first();

    if (await checkbox.isVisible()) {
      await checkbox.check();
      await this.page.getByRole('button', { name: 'ปิดใช้งานสนามที่เลือก' }).click();
      await this.page.getByRole('button', { name: 'ตกลง' }).click();
    }
  }
}