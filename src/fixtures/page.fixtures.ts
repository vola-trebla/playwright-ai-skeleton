import { apiTest } from './api.fixtures';
import { LoginPage } from '@/pages/login.page';
import { PIMListPage } from '@/pages/pim-list.page';
import { EmployeeDetailPage } from '@/pages/employee-detail.page';

export type PageFixtures = {
  loginPage: LoginPage;
  pimListPage: PIMListPage;
  employeeDetailPage: EmployeeDetailPage;
};

/**
 * Full UI test - composes auth + api + page fixtures.
 * Use this for spec files that need page objects.
 */
export const test = apiTest.extend<PageFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  pimListPage: async ({ page }, use) => use(new PIMListPage(page)),
  employeeDetailPage: async ({ page }, use) => use(new EmployeeDetailPage(page)),
});
