import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PIMListPage } from '../pages/pim-list.page';
import { TicketsApiClient } from '../api/clients/tickets.client';
import { TicketBuilder } from '../helpers/data-factory';
import { config } from '../config/env.config';

export const test = base.extend<{
  loginPage: LoginPage;
  pimListPage: PIMListPage;
  ticketsApi: TicketsApiClient;
  testTicket: { id: string; title: string };
  authenticatedPage: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  pimListPage: async ({ page }, use) => {
    await use(new PIMListPage(page));
  },
  ticketsApi: async ({ request }, use) => {
    await use(new TicketsApiClient(request));
  },
  testTicket: async ({ ticketsApi }, use) => {
    const data = new TicketBuilder()
      .withTitle(`E2E-test-${Date.now()}`)
      .withPriority('High')
      .build();
    const ticket = await ticketsApi.create(data);
    await use({ id: ticket.id, title: data.title });
    await ticketsApi.delete(ticket.id);
  },
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.navigate();
    await loginPage.login(config.ADMIN_EMAIL, config.ADMIN_PASSWORD);
    await use(page);
  },
});

export { expect };
