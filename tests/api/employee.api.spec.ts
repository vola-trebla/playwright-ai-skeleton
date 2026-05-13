import { apiTest as test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe('Employee API', { tag: [TestTags.api, TestTags.pim] }, () => {
  test('Employee creation returns valid structure', async ({ testEmployee, api }) => {
    await api.employee.expect.toBeValidCreatedEmployee(testEmployee);
  });

  test('Updating name via API is reflected in GET response', async ({ testEmployee, api }) => {
    await api.employee.updateName(testEmployee.empNumber, 'ApiUpdated', 'ApiName');

    const updated = await api.employee.getById(testEmployee.empNumber);
    await api.employee.expect.toHaveDetails(updated, {
      firstName: 'ApiUpdated',
      lastName: 'ApiName',
    });
  });
});
