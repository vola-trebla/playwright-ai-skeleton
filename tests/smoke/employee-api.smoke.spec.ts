import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe(
  'Employee API fixture - smoke',
  { tag: [TestTags.smoke, TestTags.api, TestTags.pim] },
  () => {
    test('Creates employee via API and finds them in list', async ({
      testEmployee,
      pimListPage,
    }) => {
      await pimListPage.navigate();
      await pimListPage.searchEmployeeById(testEmployee.employeeId);
      await pimListPage.assertEmployeeVisible(testEmployee);
    });
  }
);
