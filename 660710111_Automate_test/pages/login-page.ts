import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // --------------------------------------------------------
  // 1. Properties (Locators)
  // --------------------------------------------------------
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    
    this.errorMessage = page.locator('.error-msg');
  }
  // --------------------------------------------------------
  // 2. Actions
  // --------------------------------------------------------
  async goto() {
    await this.page.goto('https://su-courtbooking.vercel.app/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // --------------------------------------------------------
  // 3. Assertions
  // --------------------------------------------------------
 async expectLoginPageVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
  async expectErrorMessageVisible(expectedText: string = 'invalid username or password') {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}