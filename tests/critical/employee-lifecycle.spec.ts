import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe('Employee Lifecycle', { tag: [TestTags.critical, TestTags.pim] }, () => {
  test('Created employee via API is visible in PIM list', async ({ testEmployee, pimListPage }) => {
    await pimListPage.navigate();
    await pimListPage.searchEmployeeById(testEmployee.employeeId);
    await pimListPage.assertEmployeeVisible(testEmployee);
  });

  test('Can update employee name via UI', async ({ testEmployee, employeeDetailPage }) => {
    await employeeDetailPage.openEmployee(testEmployee.empNumber);
    await employeeDetailPage.updateName(testEmployee.empNumber, 'Updated', 'Name');
    await employeeDetailPage.assertName('Updated', 'Name');
  });

  test('Can delete employee via UI with confirmation', async ({ testEmployee, pimListPage }) => {
    await pimListPage.navigate();
    await pimListPage.searchEmployeeById(testEmployee.employeeId);
    await pimListPage.assertEmployeeVisible(testEmployee);
    await pimListPage.deleteEmployeeById(testEmployee.employeeId);
    await pimListPage.assertEmployeeAbsent(testEmployee.employeeId);
  });
});
