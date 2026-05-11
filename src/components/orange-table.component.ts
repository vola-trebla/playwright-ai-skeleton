import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '@/core/base.component';
import { OXD } from '@/constants/oxd-selectors';
import { step } from '@/core/step';

/**
 * OrangeHRM-specific table component. Owns OXD-class locators for table parts.
 */
export class OrangeTable extends BaseComponent {
  private readonly rows: Locator;

  constructor(page: Page, containerSelector: string = OXD.table.root) {
    super(page, containerSelector);
    this.rows = this.root.locator(OXD.table.row);
  }

  async waitForData(): Promise<void> {
    await this.rows.first().waitFor({ state: 'visible' });
  }

  async getRowCount(): Promise<number> {
    return step('Get table row count', () => this.rows.count());
  }

  getRowByText(text: string): Locator {
    return this.rows.filter({ hasText: text });
  }

  getFirstRow(): Locator {
    return this.rows.first();
  }

  async getCellValue(row: number, column: number): Promise<string> {
    return this.rows.nth(row).locator(OXD.table.cell).nth(column).innerText();
  }

  async sortByColumn(columnName: string): Promise<void> {
    await step(`Sort by column: ${columnName}`, async () => {
      await this.root.locator(OXD.table.columnHeader).filter({ hasText: columnName }).click();
    });
  }
}
