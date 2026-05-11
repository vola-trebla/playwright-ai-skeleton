import { test } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';
import { config } from '@/config/env.config';

test.describe('OrangeHRM - Login Smoke', { tag: [TestTags.smoke, TestTags.auth] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Admin can successfully login and reach dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.assertLoginFormReady();
    await loginPage.loginWithCredentials(config.ADMIN_USERNAME, config.ADMIN_PASSWORD);
    await dashboardPage.assertOpen();
  });
});
