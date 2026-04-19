 // ==========================================
 // นายทศพร เกสรินทร์ 660710111
 //Test Case: ตรวจสอบความถูกต้องของการจัดการเวลาสนาม (Manage Court Time Validation)
 // ==========================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { ManageCourtPage } from '../pages/managecourt-page';
import { ManageCourtTimePage } from '../pages/managetimeeachcourt.page';

test('Manage Court Time Validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('650710695', 'admin002');

  await expect(page).not.toHaveURL(/.*login/, { timeout: 10000 });

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.navbar.clickDashboard(); // กดเมนู Dashboard บน Navbar
  await dashboardPage.clickManageCourts();     // กดปุ่มจัดการสนาม
  const manageCourtPage = new ManageCourtPage(page);
  await manageCourtPage.clickManageTimeOfCourt('เทนนิส 1');
  const timePage = new ManageCourtTimePage(page);

  // ==========================================
  // Setup: Login เข้าสู่ระบบและไปที่หน้า "จัดการสนาม"
  // ==========================================

  // --------------------------------------------------------
  // กรอกเวลาจบก่อนเวลาเริ่ม (16:30 - 16:29)
  // --------------------------------------------------------
  await timePage.updateStartTime('16:30');
  await timePage.updateEndTime('16:29');
  await timePage.saveTimeBtn.click();

  // Assert: เช็กว่าระบบแสดงข้อความ error ว่าไม่สามารถบันทึกได้ และแจ้งว่าเวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น
  await expect(page.getByText('ไม่สามารถบันทึกได้')).toBeVisible();
  await expect(page.getByText('เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await expect(page.getByText('ไม่สามารถบันทึกได้')).not.toBeVisible();

  // --------------------------------------------------------
  // กรอกเวลาที่ถูกต้อง (16:30 - 20:30) รอบละ  30 นาที
  // --------------------------------------------------------
  await timePage.updateStartTime('16:30');
  await timePage.updateEndTime('20:30');
  await timePage.updateDuration('30');
  await timePage.saveTimeBtn.click();

  // Assert: เช็กว่าระบบแสดงข้อความ success ว่าบันทึกข้อมูลสำเร็จ และมีช่วงเวลาปรากฏในตารางครบถ้วน (16:30-17:00, 17:00-17:30, ..., 20:00-20:30)
  await expect(page.getByText('บันทึกสำเร็จ')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await expect(page.getByText('บันทึกสำเร็จ')).not.toBeVisible();

  const timeSlots = page.getByText(/\d{2}:\d{2} - \d{2}:\d{2}/);
  await expect(timeSlots).toHaveCount(8);

  await expect(timeSlots.first()).toContainText('16:30 - 17:00');
  await expect(timeSlots.last()).toContainText('20:00 - 20:30');

  // --------------------------------------------------------
  // คืนค่ากลับเป็น 60 นาที เพื่อรองรับการรันรอบหน้า
  // --------------------------------------------------------
  await timePage.updateDuration('60'); 
  await timePage.saveTimeBtn.click();
  
  await expect(page.getByText('บันทึกสำเร็จ')).toBeVisible();
  await page.getByRole('button', { name: 'ตกลง' }).click();
  await expect(page.getByText('บันทึกสำเร็จ')).not.toBeVisible();
});