 // ==========================================
 // นายทศพร เกสรินทร์ 660710111
 // Test Case: ตรวจสอบการจัดการผู้ใช้ (Admin Management Flow)
 // ==========================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ManageUsersPage } from '../pages/manageuser-page';

test('Admin Management', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('650710695', 'admin002');

  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });
  
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navbar.clickDashboard(); 
  await dashboardPage.clickManageUsers();
  await page.waitForURL(/.*manageusers/);
  
  const userPage = new ManageUsersPage(page);
  await userPage.switchToAdminTab();
  
  const uniqueId = Date.now().toString().slice(-4);
  const testAdmin = {
    firstName: 'Test',
    lastName: `Admin-${uniqueId}`,
    email: `admin${uniqueId}@test.com`,
    phone: `081234${uniqueId}` 
  };
  
  // --------------------------------------------------------
  // สร้าง Admin ใหม่
  // --------------------------------------------------------
  await userPage.clickAddAdmin();
  await userPage.addNewAdmin(testAdmin.firstName, testAdmin.lastName, testAdmin.email, testAdmin.phone);
  
  await expect(page.getByText('เพิ่ม Admin สำเร็จ')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();

  await expect(page.getByRole('row').filter({ hasText: testAdmin.email })).toBeVisible();

  // --------------------------------------------------------
  // ใส่ Email ซ้ำ
  // --------------------------------------------------------
  await userPage.clickAddAdmin();
  // ใช้ Email เดิม แต่เปลี่ยนชื่อและเบอร์
  await userPage.addNewAdmin('Duplicate', 'Email', testAdmin.email, '0999999999');
  
  // Assert: เช็ก Pop-up เตือน Email ซ้ำ (อ้างอิงจาก Logic เว็บคุณ)
  await expect(page.getByText('เกิดข้อผิดพลาด')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await userPage.modalCancelBtn.click(); // ปิด Modal

  // --------------------------------------------------------
  // เปลี่ยน Email แต่ใช้เบอร์โทรซ้ำ
  // --------------------------------------------------------
  await userPage.clickAddAdmin();
  await userPage.addNewAdmin('Duplicate', 'Phone', `new${uniqueId}@test.com`, testAdmin.phone);
  
  // เช็ก Pop-up เตือนเบอร์ซ้ำ
  await expect(page.getByText('เกิดข้อผิดพลาด')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await userPage.modalCancelBtn.click(); 

  // --------------------------------------------------------
  // ลบ Admin ที่สร้างใน Step 1
  // --------------------------------------------------------
  await userPage.deleteAdmin(testAdmin.email);
  
  // ยืนยันการลบ
  await page.getByRole('button', { name: 'ยืนยัน' }).click(); 

  // เช็กว่าชื่อหายไปจากตาราง
  await expect(page.getByText(testAdmin.email)).not.toBeVisible();
});