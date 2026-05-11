import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@/core/base.component';
import { OXD } from '@/constants/oxd-selectors';
import { step } from '@/core/step';

/**
 * OrangeHRM-specific confirmation modal. Uses role="dialog" as the root and
 * OXD button classes for actions (OXD buttons do not expose semantic role/name
 * pairs that would let us use getByRole reliably).
 */
export class OrangeConfirmModal extends BaseComponent {
  private readonly title: Locator;
  private readonly confirmBtn: Locator;
  private readonly cancelBtn: Locator;

  constructor(page: Page, selector: string = '[role="dialog"]') {
    super(page, selector);
    this.title = this.root.locator(OXD.dialog.title);
    this.confirmBtn = this.root.locator(OXD.dialog.dangerButton);
    this.cancelBtn = this.root.locator(OXD.dialog.textButton);
  }

  async confirm(): Promise<void> {
    await step('Подтверждение модального окна', async () => {
      await this.confirmBtn.click();
      await this.waitForHidden();
    });
  }

  async cancel(): Promise<void> {
    await step('Отмена модального окна', async () => {
      await this.cancelBtn.click();
      await this.waitForHidden();
    });
  }

  async getTitle(): Promise<string> {
    return this.title.innerText();
  }
}
