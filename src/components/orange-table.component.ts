import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@/core/base.component';
import { step } from '@/core/step';

/**
 * OrangeHRM-specific table component (uses .oxd-table selectors).
 */
export class OrangeTable extends BaseComponent {
  private readonly rows: Locator;

  constructor(page: Page, containerSelector: string = '.oxd-table') {
    super(page, containerSelector);
    this.rows = this.root.locator('tbody tr, .oxd-table-body .oxd-table-card');
  }

  async shouldNotBeEmpty(): Promise<void> {
    await this.rows.first().waitFor({ state: 'visible' });
  }

  async getRowCount(): Promise<number> {
    return await step('Получение количества строк в таблице', () => this.rows.count());
  }

  getRowByText(text: string): Locator {
    return this.rows.filter({ hasText: text });
  }

  async getCellValue(row: number, column: number): Promise<string> {
    return this.rows.nth(row).locator('.oxd-table-cell, td').nth(column).innerText();
  }

  async sortByColumn(columnName: string): Promise<void> {
    await this.root
      .locator(`.oxd-table-header [role="columnheader"]:has-text("${columnName}")`)
      .click();
  }

  async waitForData(): Promise<void> {
    await this.rows.first().waitFor({ state: 'visible' });
  }
}
