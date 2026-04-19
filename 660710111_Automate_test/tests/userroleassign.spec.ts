 // ==========================================
 // นายทศพร เกสรินทร์ 660710111
 // Test Case: การเปลี่ยนสิทธิ์ผู้ใช้งาน (User Role Assignment Flow)
 // ==========================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ManageUsersPage } from '../pages/manageuser-page';
import { ProfilePage } from '../pages/profile-page';

//กันรันขนานแล้วชน
test.describe.configure({ mode: 'serial' });

test('User Role Assignment Flow)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const adminAccount = {u: '650710695', p: 'admin002'};
  const userAccount = {u: '661211319', p: 'users002', email: 'sukjaroen_p2@silpakorn.edu'};
  await loginPage.login(adminAccount.u, adminAccount.p === '650710695' ? adminAccount.p : 'admin002');
  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });

  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navbar.clickDashboard(); 
  await page.waitForURL(/.*dashboard/, { timeout: 10000 });
  await dashboardPage.clickManageUsers();
  await page.waitForURL(/.*manageusers/);
  
  const userPage = new ManageUsersPage(page);
  const profilePage = new ProfilePage(page);

  // --------------------------------------------------------
  // Step 1: ค้นหา User ด้วย Email
  // --------------------------------------------------------
  await userPage.searchByEmail(userAccount.email);
  const userRow = page.getByRole('row').filter({ hasText: userAccount.email });
  await expect(userRow).toBeVisible();

  // --------------------------------------------------------
  // Step 2 (Pos): เปลี่ยนจาก User -> Admin
  // --------------------------------------------------------
  const currentRole = await userRow.getByRole('combobox').inputValue();

  if (currentRole !== 'admin') {
    await userRow.getByRole('combobox').selectOption('Admin');
    await userRow.getByRole('button').click();
    await expect(page.getByText('อัพเดทสิทธิ์สำเร็จ')).toBeVisible();
    await page.getByRole('button', { name: 'ตกลง' }).click();
  } else {
    console.log('User is already an Admin, skipping assignment step.');
  }
  await expect(userRow.getByRole('combobox')).toHaveValue('admin');
  // Logout จาก Admin หลัก
  await dashboardPage.navbar.clickProfile();
  await profilePage.clickLogout();

  // Login ด้วย User ที่เพิ่งได้สิทธิ์ 
  await loginPage.login(userAccount.u, userAccount.p);
  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });

  // Assert: ตรวจสอบว่ามีเมนู Dashboard โผล่มา (ซึ่ง User ปกติจะไม่มี)
  await expect(dashboardPage.navbar.dashboardLink).toBeVisible();
  
  // ลองกดเข้า Dashboard เพื่อดูว่าเข้าได้จริง
  await dashboardPage.navbar.clickDashboard();
  await expect(page).toHaveURL(/.*admin\/dashboard/);

  // Logout เพื่อกลับไปคืนค่า
  await dashboardPage.navbar.clickProfile();
  await profilePage.clickLogout();

  //login ด้วย Admin หลักอีกครั้งเพื่อเปลี่ยนสิทธิ์กลับ
  await loginPage.login(adminAccount.u, adminAccount.p);
  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });
  await dashboardPage.navbar.clickDashboard(); 
  await page.waitForURL(/.*dashboard/, { timeout: 10000 });
  await dashboardPage.clickManageUsers();
  await page.waitForURL(/.*manageusers/);

  // --------------------------------------------------------
  // Step 3 (Pos): เปลี่ยนสิทธิ์กลับ Admin -> User
  // --------------------------------------------------------
  await userPage.searchByEmail(userAccount.email);
  await expect(userRow).toBeVisible();
  const updatedRole = await userRow.getByRole('combobox').inputValue();
  if (updatedRole !== 'user') {
  await userRow.getByRole('combobox').selectOption('User');
  await userRow.getByRole('button').click();
  await expect(page.getByText('อัพเดทสิทธิ์สำเร็จ')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  } else {
    console.log('User is already a User, skipping assignment step.');
  }
  await expect(userRow.getByRole('combobox')).toHaveValue('user');
});