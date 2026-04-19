import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './navbar-component'; 

export class ProfilePage {
  readonly page: Page;
  readonly navbar: NavbarComponent; 
  
  readonly logoutBtn: Locator;
  readonly editPhoneBtn: Locator;
  readonly phoneInput: Locator;
  readonly savePhoneBtn: Locator;
  readonly cancelPhoneBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page); // ประกอบร่าง Navbar
    
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    this.editPhoneBtn = page.getByRole('button', { name: 'แก้ไขเบอร์โทร' });
    this.phoneInput = page.getByRole('textbox', { name: 'กรอกเบอร์โทรศัพท์ 10 หลัก' });
    this.savePhoneBtn = page.getByRole('button', { name: 'บันทึก' });
    this.cancelPhoneBtn = page.getByRole('button', { name: 'ยกเลิก' });
  }

  // --------------------------------------------------------
  // Actions
  // --------------------------------------------------------
  
  async clickLogout() {
    await this.logoutBtn.click();
  }

  async clickEditPhone() {
    await this.editPhoneBtn.click();
  }
}