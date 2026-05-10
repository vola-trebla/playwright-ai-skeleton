import { APIRequestContext, APIResponse } from '@playwright/test';
import { z, ZodType } from 'zod';

export abstract class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async parseResponse<S extends ZodType<{ data: unknown }>>(
    response: APIResponse,
    schema: S
  ): Promise<z.infer<S>['data']> {
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}: ${await response.text()}`);
    }
    return schema.parse(await response.json()).data;
  }
}
