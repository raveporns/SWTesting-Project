import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CourtPage } from '../pages/CourtPage';

test.describe('Admin Stable Test (Clean Version)', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('650710695', 'admin002');
  });

  test('TC-01: Dashboard แสดงผล', async ({ page }) => {
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('TC-02: เพิ่มสนาม', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const court = new CourtPage(page);

    await dashboard.goToManageCourt();

    const name = 'สนาม-' + Date.now();
    await court.addCourt(name);
  });

  test('TC-03: ปิดใช้งานสนาม', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const court = new CourtPage(page);

    await dashboard.goToManageCourt();
    await court.disableAnyCourt();
  });

  test('TC-04: ไม่กรอกชื่อสนาม', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const court = new CourtPage(page);

    await dashboard.goToManageCourt();
    await court.addCourtWithoutName();

    await expect(
      page.getByText(/กรุณาใส่ชื่อสนาม/)
    ).toBeVisible({ timeout: 7000 });
  });

  test('TC-05: ค้นหาวันที่ผิดเงื่อนไข', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goToHistory();

  await page.getByRole('textbox').first().fill('2030-01-01');
  await page.getByRole('textbox').nth(1).fill('2000-01-01');

  await page.getByRole('button', { name: 'ค้นหา' }).click();

  // ✅ รอ error element โดยตรง (กัน strict mode + timing)
  const error = page.locator('.date-error');

  await expect(error).toBeVisible({ timeout: 7000 });
  await expect(error).toContainText('วันที่เริ่มต้นต้องไม่มากกว่าวันที่สิ้นสุด');
});

});