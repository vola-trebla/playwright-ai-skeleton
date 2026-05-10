import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe(
  'OrangeHRM - Employee Management (PIM)',
  { tag: [TestTags.smoke, TestTags.pim] },
  () => {
    test('должен искать сотрудника по ID', async ({ pimListPage }) => {
      await pimListPage.navigate();
      await pimListPage.searchEmployeeById('0001');
      await pimListPage.assertSearchHasResults();
    });
  }
);
