import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe(
  'OrangeHRM - Employee Management (PIM)',
  { tag: [TestTags.smoke, TestTags.pim] },
  () => {
    test('Searching by ID finds a specific employee', async ({ testEmployee, pimListPage }) => {
      await pimListPage.navigate();
      await pimListPage.searchEmployeeById(testEmployee.employeeId);
      await pimListPage.assertEmployeeVisible(testEmployee);
    });
  }
);
