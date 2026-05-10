import { apiTest as test, expect } from '@/fixtures';
import { TestTags } from '@/constants/test-tags';

test.describe('Employee API', { tag: [TestTags.api, TestTags.pim] }, () => {
  test('создание сотрудника возвращает валидную структуру', async ({ testEmployee }) => {
    expect(testEmployee.empNumber).toBeGreaterThan(0);
    expect(testEmployee.firstName).toBe('Test');
    expect(testEmployee.lastName).toMatch(/^Employee-[a-f0-9]{8}$/);
    expect(testEmployee.employeeId).toMatch(/^E[a-f0-9]{5}$/);
  });

  test('обновление имени через API отражается в GET запросе', async ({
    testEmployee,
    employeeApi,
  }) => {
    await employeeApi.updateName(testEmployee.empNumber, 'ApiUpdated', 'ApiName');

    const updated = await employeeApi.getById(testEmployee.empNumber);
    expect(updated.firstName).toBe('ApiUpdated');
    expect(updated.lastName).toBe('ApiName');
  });
});
