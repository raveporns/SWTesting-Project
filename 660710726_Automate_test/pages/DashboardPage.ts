import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) { }

  async goToManageCourt() {
    await this.page.getByText('จัดการสนาม').waitFor({ state: 'visible' });
    await this.page.getByText('จัดการสนาม').click();
  }

  async goToHistory() {
    await this.page.getByText('รายการจองในอดีต').waitFor({ state: 'visible' });
    await this.page.getByText('รายการจองในอดีต').click();
  }
}