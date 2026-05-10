import { Locator, Page } from '@playwright/test';
import { UIElement } from './ui-element';

export abstract class BaseComponent {
  protected readonly root: Locator;

  constructor(
    protected readonly page: Page,
    selector: string
  ) {
    this.root = page.locator(selector);
  }

  // Хелпер для создания обернутых элементов внутри компонента
  protected element(selector: string, name: string): UIElement {
    return new UIElement(this.root.locator(selector), name);
  }

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden' });
  }
}
