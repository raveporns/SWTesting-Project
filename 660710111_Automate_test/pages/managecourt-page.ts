
import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './navbar-component';

export class ManageCourtPage {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly navbar: NavbarComponent;
  
  readonly addCourtBtn: Locator;
  readonly searchCourtInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page); 
    
    this.addCourtBtn = page.getByRole('button', { name: 'เพิ่มสนามใหม่' });
    this.searchCourtInput = page.getByRole('textbox', { name: 'ค้นหาชื่อสนาม' });
    
  }

  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------
  async clickAddCourtBtn() { 
    await this.addCourtBtn.click(); 
    }
  async clickSearchCourtInput() { 
    await this.searchCourtInput.click(); 
    }
    async clickManageTimeOfCourt(courtName: string) { 
    await this.page
      .getByRole('row')
      .filter({ hasText: courtName })
      .getByRole('link', { name: 'จัดการเวลา' })
      .click(); 
  }
}