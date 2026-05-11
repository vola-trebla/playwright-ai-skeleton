import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@/core/base.page';
import { Routes } from '@/constants/routes';
import { step } from '@/core/step';

export class DashboardPage extends BasePage {
  private readonly _heading: Locator;

  constructor(page: Page) {
    super(page);
    this._heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async assertOpen(): Promise<void> {
    await step('Проверка что Dashboard открыт', async () => {
      await this.page.waitForURL(new RegExp(Routes.dashboard.index));
      await expect(this._heading).toBeVisible();
    });
  }
}
