import { test, expect } from '@playwright/test';

test('ทดสอบการเลือกสนาม เวลาและดูสรุปการจอง', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/login');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForURL('**/home**', { timeout: 15000 });

  const book = page.getByRole('button', { name: 'จองสนาม' });
  await expect(book).toBeVisible({ timeout: 20000 });
  await book.click();

  await page.waitForTimeout(2000);

  await page.getByText('แบด').first().click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'เลือกเวลา' }).click();

  await page.waitForTimeout(2000);

  await page.getByText('17:30 - 18:30').click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'ยืนยัน' }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText('สรุปการจอง')).toBeVisible();
});

test('ไม่เลือกสนาม', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/login');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForURL('**/home**', { timeout: 15000 });

  const book = page.getByRole('button', { name: 'จองสนาม' });
  await expect(book).toBeVisible({ timeout: 20000 });
  await book.click();

  await page.waitForTimeout(2000);

  const next = page.getByRole('button', { name: 'เลือกเวลา' });
  await expect(next).not.toBeEnabled();
});

test('ไม่เลือกเวลา', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/login');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForURL('**/home**', { timeout: 15000 });

  const book = page.getByRole('button', { name: 'จองสนาม' });
  await expect(book).toBeVisible({ timeout: 20000 });
  await book.click();

  await page.waitForTimeout(2000);

  await page.getByText('แบด').first().click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'เลือกเวลา' }).click();

  const confirm = page.getByRole('button', { name: 'ยืนยัน' });
  await expect(confirm).not.toBeEnabled();
});

test('ไม่ login แล้วเข้า booking', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/booking');

  await expect(page.getByRole('heading', { name: 'Login/เข้าสู่ระบบ' })).toBeVisible();
});

test('ย้อนกลับจากหน้าสรุป', async ({ page }) => {
  await page.goto('https://su-courtbooking.vercel.app/login');

  await page.getByPlaceholder('Username').fill('661211319');
  await page.getByPlaceholder('Password').fill('users002');
  await page.getByPlaceholder('Password').press('Enter');
  await page.waitForURL('**/home**', { timeout: 15000 });

  const book = page.getByRole('button', { name: 'จองสนาม' });
  await expect(book).toBeVisible({ timeout: 20000 });
  await book.click();

  await page.waitForTimeout(2000);

  await page.getByText('แบด').first().click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'เลือกเวลา' }).click();

  await page.waitForTimeout(2000);

  await page.getByText('17:30 - 18:30').click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'ยืนยัน' }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText('สรุปการจอง')).toBeVisible();

  await page.getByRole('button', { name: 'กลับ' }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText('สนามที่เลือก')).toBeVisible();
  await expect(page.getByText('เลือกแล้ว')).toBeVisible();
});