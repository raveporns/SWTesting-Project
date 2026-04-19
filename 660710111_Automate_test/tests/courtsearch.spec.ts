 // ==========================================
 // นายทศพร เกสรินทร์ 660710111
 //Test Case: ค้นหาข้อมูลสนาม (Court Search & Filter Flow)
 // ==========================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ManageCourtPage } from '../pages/managecourt-page';

test('Court Search & Filter Flow', async ({ page }) => {
  // ==========================================
  // Setup: Login เข้าสู่ระบบและไปที่หน้า "จัดการสนาม"
  // ==========================================
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('650710695', 'admin002');
  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navbar.clickDashboard(); // กดเมนู Dashboard บน Navbar
  await dashboardPage.clickManageCourts();     // กดปุ่มจัดการสนาม

  const manageCourtPage = new ManageCourtPage(page);

  // ==========================================
  // ค้นหาชื่อเต็ม
  // ==========================================
  await manageCourtPage.searchCourtInput.fill('เทนนิส 1');
  
  // Assert: เช็กว่าตารางแสดงแค่เทนนิส 1 (ใช้ exact: true เพื่อให้เป๊ะๆ)
  await expect(page.getByRole('cell', { name: 'เทนนิส 1', exact: true })).toBeVisible();

  // ==========================================
  // ค้นหาคำบางส่วน
  // ==========================================
  await manageCourtPage.searchCourtInput.fill('เทน');
  
  await expect(page.getByRole('cell', { name: 'เทนนิส 1' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'เทนนิส 2' })).toBeVisible();

  // ==========================================
  // ค้นหาชื่อที่ไม่มีในระบบ
  // ==========================================
  await manageCourtPage.searchCourtInput.fill('สนามบิน');
  
  // Assert: เช็กว่าระบบแสดงข้อความ "ไม่พบข้อมูลสนาม"
  // 💡 ทริค: ใช้ getByText จะหาข้อความ error ได้กว้างและชัวร์กว่าแบบ cell ครับ
  await expect(page.getByText('ไม่พบข้อมูลสนาม')).toBeVisible();

  // ==========================================
  // Step 4 (Neg): พิมพ์ติดกัน
  // ==========================================
  await manageCourtPage.searchCourtInput.fill('เทนนิส1');
  
  // Assert: เช็กว่าระบบไม่พบข้อมูล
  await expect(page.getByText('ไม่พบข้อมูลสนาม')).toBeVisible();
});