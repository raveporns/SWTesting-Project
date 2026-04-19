import { Page, Locator } from '@playwright/test';

export class NavbarComponent {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly homeLink: Locator;
  readonly dashboardLink: Locator;
  readonly profileLink: Locator;
  readonly hamburgerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'หน้าแรก' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.profileLink = page.getByRole('link', { name: 'โปรไฟล์' });

    this.hamburgerBtn = page.getByRole('button', { name: 'Toggle navigation' });
  }
  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------
  private async openMenuIfNeeded() {
    // ถ้าปุ่มแซนด์วิชโชว์อยู่ (แสดงว่าจอเล็ก) ให้กดเปิดก่อน
    if (await this.hamburgerBtn.isVisible()) {
      await this.hamburgerBtn.click();
      
      // รอให้เมนูสไลด์ลงมาจนกว่าลิงก์จะพร้อมคลิก
      // (ใช้เวลาหรือเช็ค state จะเสถียรกว่า)
      await this.page.waitForTimeout(500); 
    }
  }

  async clickHome() { await this.openMenuIfNeeded(); await this.homeLink.click(); }
  async clickDashboard() { await this.openMenuIfNeeded(); await this.dashboardLink.click(); }
  async clickProfile() { await this.openMenuIfNeeded(); await this.profileLink.click(); }
}