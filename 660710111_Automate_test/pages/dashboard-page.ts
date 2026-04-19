// ไฟล์ dashboard.page.ts
import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './navbar-component';

export class DashboardPage {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly navbar: NavbarComponent;
  
  readonly manageCourtsBtn: Locator;
  readonly manageTimeBtn: Locator;
  readonly manageUsersBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page); 
    
    this.manageCourtsBtn = page.getByRole('button', { name: 'จัดการสนาม' });
    this.manageTimeBtn = page.getByRole('button', { name: 'จัดการเวลา' });
    this.manageUsersBtn = page.getByRole('button', { name: 'จัดการผู้ใช้' });
  }

  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------
  async clickManageCourts() { 
    await this.manageCourtsBtn.click(); 
    }
  async clickManageTime() { 
    await this.manageTimeBtn.click(); 
    }
  async clickManageUsers() { 
    await this.manageUsersBtn.click(); 
    }
}