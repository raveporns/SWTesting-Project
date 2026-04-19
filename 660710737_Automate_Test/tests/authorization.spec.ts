import 'dotenv/config';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const generalUser = {
  username: process.env.GENERAL_USERNAME ?? '661211319',
  password: process.env.GENERAL_PASSWORD ?? 'users002',
};

const adminUser = {
  username: process.env.ADMIN_USERNAME ?? '650710695',
  password: process.env.ADMIN_PASSWORD ?? 'admin002',
};

const wrongPassword = process.env.WRONG_PASSWORD ?? 'wrong_password_123';

const invalidUser = {
  username: process.env.INVALID_USERNAME ?? 'user_not_exists_999999',
  password: process.env.INVALID_PASSWORD ?? 'wrong_password_123',
};

test.describe('Authorization - SU Court Booking', () => {
// [Positive Cases]
  test('AUTH-001 [Positive] Login สำเร็จด้วย Username และ Password ที่ถูกต้องของผู้ใช้ทั่วไป', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(generalUser.username, generalUser.password);
  });

  test('AUTH-002 [Positive] Login สำเร็จด้วย Username และ Password ที่ถูกต้องของผู้ดูแลระบบ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(adminUser.username, adminUser.password);
  });

// [Negative Cases]
  test('AUTH-003 [Negative] Login ไม่สำเร็จเมื่อกรอก Username ถูกต้องแต่ Password ไม่ถูกต้อง', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(generalUser.username, wrongPassword);
  });

  test('AUTH-004 [Negative] Login ไม่สำเร็จเมื่อกรอก Username ที่ไม่มีอยู่ในระบบ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(invalidUser.username, invalidUser.password);
  });

  test('AUTH-005 [Negative] Validation เมื่อไม่กรอก Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoginPageVisible();
  });
});