import { APIRequestContext, APIResponse } from '@playwright/test';
import { z, ZodType } from 'zod';

export type ApiCallResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; body: unknown };

export abstract class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  /**
   * Parse a happy-path response and throw on non-2xx.
   * Use for create/get/update flows where errors should fail the test setup.
   */
  protected async parseResponse<S extends ZodType<{ data: unknown }>>(
    response: APIResponse,
    schema: S
  ): Promise<z.infer<S>['data']> {
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}: ${await response.text()}`);
    }
    return schema.parse(await response.json()).data;
  }

  /**
   * Parse a response without throwing on non-2xx.
   * Use in negative tests that need to assert on status/body without exception.
   */
  protected async tryParseResponse<S extends ZodType<{ data: unknown }>>(
    response: APIResponse,
    schema: S
  ): Promise<ApiCallResult<z.infer<S>['data']>> {
    const status = response.status();
    if (!response.ok()) {
      const body = await response.json().catch(() => null);
      return { ok: false, status, body };
    }
    return { ok: true, status, data: schema.parse(await response.json()).data };
  }
}
