 // ==========================================
 // นายทศพร เกสรินทร์ 660710111
 // Test Case: ตรวจสอบการแก้ไขข้อมูลโปรไฟล์ (Profile Edit Flow)
 // ==========================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ProfilePage } from '../pages/profile-page';

test('Admin Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const profilePage = new ProfilePage(page);
  const validPhone = `0924925024`;
  await loginPage.goto();
  await loginPage.login('650710695', 'admin002'); 
  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });
  
  await dashboardPage.navbar.clickProfile();
  await page.waitForURL(/.*profile/);

  await profilePage.clickEditPhone();

  // --------------------------------------------------------
  // พิมพ์ตัวเลขไม่ครบ 10 หลัก (เช่น "1")
  // --------------------------------------------------------
  await profilePage.phoneInput.fill('1');
  await profilePage.savePhoneBtn.click();
  const errorMsg = (page.getByText('** กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก ตัวเลขเท่านั้น)'));
  await expect(errorMsg).toBeVisible();
  // --------------------------------------------------------
  // พิมพ์ตัวอักษรผสมตัวเลข (เช่น "S1lpak0rn_")
  // --------------------------------------------------------
  await profilePage.phoneInput.fill('S1lpak0rn_');
  await profilePage.savePhoneBtn.click();
  await expect(errorMsg).toBeVisible();

  // --------------------------------------------------------
  // Step 3 (Pos): พิมพ์เบอร์ 10 หลักที่ถูกต้อง
  // --------------------------------------------------------
  await profilePage.phoneInput.fill(validPhone);
  await profilePage.savePhoneBtn.click();
  await expect(page.getByText('บันทึกสำเร็จ')).toBeVisible();
  await expect(page.getByText(validPhone)).toBeVisible();
});