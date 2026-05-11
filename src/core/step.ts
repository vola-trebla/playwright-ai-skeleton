import { test } from '@playwright/test';

/**
 * Wrapper for test.step to reduce visual noise.
 */
export async function step<T>(name: string, action: () => Promise<T>): Promise<T> {
  return await test.step(name, action);
}
