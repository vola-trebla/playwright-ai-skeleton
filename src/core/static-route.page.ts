import { BasePage } from './base.page';
import { step } from './step';

/**
 * Page Object with a fixed URL. Provides navigate() for opening the page.
 * Pages that require parameters (e.g. EmployeeDetailPage) should extend BasePage directly
 * and expose explicit open*() methods.
 *
 * URL is relative - Playwright resolves it against `use.baseURL` from the config.
 */
export abstract class StaticRoutePage extends BasePage {
  abstract readonly url: string;

  async navigate(): Promise<void> {
    await step(`Переход на страницу: ${this.url}`, async () => {
      await this.page.goto(this.url);
      await this.waitForPageLoad();
    });
  }
}
