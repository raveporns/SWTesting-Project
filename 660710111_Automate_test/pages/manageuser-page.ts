import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './navbar-component';

export class ManageUsersPage {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly navbar: NavbarComponent;

  readonly userTabBtn: Locator;
  readonly adminTabBtn: Locator;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly addAdminBtn: Locator;

  readonly modalFirstNameInput: Locator;
  readonly modalLastNameInput: Locator;
  readonly modalEmailInput: Locator;
  readonly modalPhoneInput: Locator;
  readonly modalCancelBtn: Locator;
  readonly modalSaveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);

    this.userTabBtn = page.getByRole('button', { name: 'User ข้อมูลผู้ใช้งาน' });
    this.adminTabBtn = page.getByRole('button', { name: 'Admin รายชื่อผู้ดูแลระบบ' });
    this.searchInput = page.getByRole('textbox', { name: 'ค้นหาด้วย Email...' });
    this.searchBtn = page.getByRole('button', { name: 'ค้นหา' });

    this.addAdminBtn = page.getByRole('button', { name: '+ เพิ่มข้อมูล Admin' });

    this.modalFirstNameInput = page.locator('input[name="firstName"]'); 
    this.modalLastNameInput = page.locator('input[name="lastName"]');
    this.modalEmailInput = page.locator('input[name="email"]');
    this.modalPhoneInput = page.locator('input[name="phone"]'); // จากรูปที่ 7
    
    this.modalCancelBtn = page.getByRole('button', { name: 'ยกเลิก' });
    this.modalSaveBtn = page.getByRole('button', { name: 'บันทึกข้อมูล' });
  }

  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------

  async switchToUserTab() {
    await this.userTabBtn.click();
  }

  async switchToAdminTab() {
    await this.adminTabBtn.click();
  }

  async searchByEmail(email: string) {
    await this.searchInput.fill(email);
    await this.searchBtn.click();
  }
  
  async changeUserRole(email: string, newRole: 'User' | 'Admin') {

    const roleDropdown = this.page.getByRole('row').filter({ hasText: email }).getByRole('combobox');
    
    await roleDropdown.selectOption(newRole);
  }

  async deleteAdmin(email: string) {
    const deleteBtn = this.page.getByRole('row').filter({ hasText: email }).getByRole('button');
    await deleteBtn.click();
  }

  async clickAddAdmin() {
    await this.addAdminBtn.click();
  }

  async addNewAdmin(firstName: string, lastName: string, email: string, phone: string) {
    await this.modalFirstNameInput.fill(firstName);
    await this.modalLastNameInput.fill(lastName);
    await this.modalEmailInput.fill(email);
    await this.modalPhoneInput.fill(phone);
    await this.modalSaveBtn.click();
  }
}