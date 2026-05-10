import { authTest } from './auth.fixtures';
import { EmployeeApiClient } from '@/api/clients/employee.client';
import { EmployeeBuilder } from '@/helpers/builders/employee.builder';
import type { Employee } from '@/api/schemas/employee.schema';

export type ApiFixtures = {
  employeeApi: EmployeeApiClient;
  testEmployee: Employee;
};

/**
 * API test - extends auth fixtures with API clients and test data.
 * Uses Playwright's built-in `request` fixture (no browser page needed for actual test work).
 */
export const apiTest = authTest.extend<ApiFixtures>({
  employeeApi: async ({ request }, use) => use(new EmployeeApiClient(request)),

  testEmployee: async ({ employeeApi }, use) => {
    const employeeRequest = new EmployeeBuilder().build();
    const created = await employeeApi.create(employeeRequest);

    await use(created);

    try {
      await employeeApi.deleteMultiple([created.empNumber]);
    } catch (err) {
      // Visible cleanup failure - do not swallow silently
      console.error(`[testEmployee cleanup] failed to delete employee #${created.empNumber}:`, err);
    }
  },
});
