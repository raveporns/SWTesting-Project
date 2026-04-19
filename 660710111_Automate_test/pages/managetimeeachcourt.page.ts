import { Page, Locator } from '@playwright/test';
import { NavbarComponent } from './navbar-component';

export class ManageCourtTimePage {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly navbar: NavbarComponent;
  readonly startTimeInput: Locator;
  readonly endTimeInput: Locator;
  readonly saveTimeBtn: Locator;
  readonly defaultBtn: Locator;
  readonly durationSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page); 
    
    this.startTimeInput = page.locator('div').filter({ hasText: 'เวลาเริ่มต้น:' }).last().getByRole('textbox');
    this.endTimeInput = page.locator('div').filter({ hasText: 'เวลาสิ้นสุด:' }).last().getByRole('textbox');
    this.saveTimeBtn = page.getByRole('button', { name: 'บันทึกการตั้งค่าเวลา' });
    this.defaultBtn = page.getByRole('button', { name: 'คืนค่าเริ่มต้น' });
    this.durationSelect = page.locator('div').filter({ hasText: 'ระยะเวลา:' }).last().getByRole('combobox');
  }

  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------
async updateStartTime(time: string) {  
    await this.startTimeInput.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.startTimeInput.pressSequentially(time);
    await this.page.keyboard.press('Tab'); 
  }
    async updateEndTime(time: string) {
    await this.endTimeInput.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.endTimeInput.pressSequentially(time);
    await this.page.keyboard.press('Tab');
  }
  async setupNewTimeAndSave(startTime: string, endTime: string) {
    await this.updateStartTime(startTime);
    await this.updateEndTime(endTime);
    await this.saveTimeBtn.click();
  }

  async clickDefault() {
    await this.defaultBtn.click();
  }

  async updateDuration(value: string) {
    await this.durationSelect.selectOption(value);
  }
}