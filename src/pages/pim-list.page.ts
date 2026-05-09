import { Page } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { TableComponent } from '../components/table.component';
import { UIElement } from '../core/ui-element';

export class PIMListPage extends BasePage {
  readonly url = '/web/index.php/pim/viewEmployeeList';
  readonly table: TableComponent;

  readonly employeeIdInput: UIElement;
  readonly searchBtn: UIElement;
  readonly addBtn: UIElement;

  constructor(page: Page) {
    super(page);
    this.table = new TableComponent(page, '.oxd-table');

    this.employeeIdInput = this.element(
      'form .oxd-input-group:has-text("Employee Id") input',
      'Employee Id Input'
    );
    this.searchBtn = this.element('button[type="submit"]', 'Search Button');
    this.addBtn = this.element('button:has-text("Add")', 'Add Button');
  }

  async searchEmployeeById(id: string): Promise<void> {
    await this.employeeIdInput.fill(id);
    await this.searchBtn.click();
    await this.table.waitForData();
  }
}
