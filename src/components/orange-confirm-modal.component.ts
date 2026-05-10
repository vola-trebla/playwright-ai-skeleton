import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@/core/base.component';

/**
 * OrangeHRM-specific confirmation modal (uses role="dialog" + .oxd-button styles).
 */
export class OrangeConfirmModal extends BaseComponent {
  private readonly _title: Locator;
  private readonly _confirmBtn: Locator;
  private readonly _cancelBtn: Locator;

  constructor(page: Page, selector: string = '[role="dialog"]') {
    super(page, selector);
    this._title = this.root.locator('.oxd-dialog-title');
    this._confirmBtn = this.root.locator('button.oxd-button--label-danger');
    this._cancelBtn = this.root.locator('button.oxd-button--text');
  }

  async confirm(): Promise<void> {
    await this._confirmBtn.click();
    await this.waitForHidden();
  }

  async cancel(): Promise<void> {
    await this._cancelBtn.click();
    await this.waitForHidden();
  }

  async getTitle(): Promise<string> {
    return this._title.innerText();
  }
}
