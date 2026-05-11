import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe('Employee PIM - Regression', { tag: [TestTags.regression, TestTags.pim] }, () => {
  test('Full employee edit cycle is reflected in UI', async ({
    testEmployee,
    employeeDetailPage,
  }) => {
    await employeeDetailPage.openEmployee(testEmployee.empNumber);
    await employeeDetailPage.assertName(testEmployee.firstName, testEmployee.lastName);

    await employeeDetailPage.updateName(testEmployee.empNumber, 'Regression', 'Updated');
    await employeeDetailPage.assertName('Regression', 'Updated');

    // Re-verify after navigation
    await employeeDetailPage.openEmployee(testEmployee.empNumber);
    await employeeDetailPage.assertName('Regression', 'Updated');
  });

  test('Deleted employee does not appear in search', async ({ testEmployee, pimListPage, api }) => {
    await api.employee.deleteMultiple([testEmployee.empNumber]);
    await pimListPage.navigate();
    await pimListPage.searchEmployeeById(testEmployee.employeeId);
    await pimListPage.assertEmployeeAbsent(testEmployee.employeeId);
  });
});
