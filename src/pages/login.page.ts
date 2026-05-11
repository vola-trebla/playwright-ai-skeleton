import { Locator, Page, expect } from '@playwright/test';
import { StaticRoutePage } from '@/core/static-route.page';
import { Routes } from '@/constants/routes';
import { LoginLabels } from '@/constants/login';
import { LoginMessages } from '@/constants/messages';
import { OXD } from '@/constants/oxd-selectors';
import { step } from '@/core/step';

export class LoginPage extends StaticRoutePage {
  readonly url = Routes.auth.login;

  private readonly logo: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator(OXD.login.brandingLogo);
    this.usernameInput = page.getByPlaceholder(LoginLabels.username);
    this.passwordInput = page.getByPlaceholder(LoginLabels.password);
    this.loginBtn = page.getByRole('button', { name: LoginLabels.loginButton });
    this.errorMessage = page.getByRole('alert');
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await step('Login with credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginBtn.click();
    });
  }

  async assertLoginFormReady(): Promise<void> {
    await step('Verify login form state', async () => {
      await expect.soft(this.logo).toBeVisible();
      await this.assertUsernameFieldContract();
      await this.assertPasswordFieldContract();
      await this.assertLoginButtonContract();
    });
  }

  async assertInvalidCredentialsShown(): Promise<void> {
    await step('Assert invalid credentials message', async () => {
      await expect(this.page).toHaveURL(/auth\/login/);
      await expect(this.errorMessage).toContainText(LoginMessages.invalidCredentials);
    });
  }

  private async assertUsernameFieldContract(): Promise<void> {
    await expect.soft(this.usernameInput).toBeVisible();
    await expect.soft(this.usernameInput).toBeEnabled();
  }

  private async assertPasswordFieldContract(): Promise<void> {
    await expect.soft(this.passwordInput).toBeVisible();
    await expect.soft(this.passwordInput).toBeEnabled();
    await expect.soft(this.passwordInput).toHaveAttribute('type', 'password');
  }

  private async assertLoginButtonContract(): Promise<void> {
    await expect.soft(this.loginBtn).toBeVisible();
    await expect.soft(this.loginBtn).toBeEnabled();
  }
}
