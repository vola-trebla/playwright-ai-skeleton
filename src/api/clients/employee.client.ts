import { APIRequestContext } from '@playwright/test';
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeNameRequest,
  employeeResponseEnvelopeSchema,
} from '@/api/schemas/employee.schema';
import { ApiEndpoints } from '@/constants/api-endpoints';
import { BaseApiClient } from './base.client';

export class EmployeeApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async create(request: CreateEmployeeRequest): Promise<Employee> {
    const response = await this.request.post(ApiEndpoints.pim.employees, { data: request });
    return this.parseResponse(response, employeeResponseEnvelopeSchema);
  }

  async deleteMultiple(empNumbers: number[]): Promise<void> {
    const response = await this.request.delete(ApiEndpoints.pim.employees, {
      data: { ids: empNumbers },
    });
    if (!response.ok()) {
      throw new Error(`Failed to delete employees [${empNumbers}]: ${response.status()}`);
    }
  }

  async updateName(empNumber: number, firstName: string, lastName: string): Promise<Employee> {
    const request: UpdateEmployeeNameRequest = { firstName, lastName, middleName: '' };
    const response = await this.request.put(ApiEndpoints.pim.personalDetails(empNumber), {
      data: request,
    });
    return this.parseResponse(response, employeeResponseEnvelopeSchema);
  }

  async getById(empNumber: number): Promise<Employee> {
    const response = await this.request.get(ApiEndpoints.pim.employee(empNumber));
    return this.parseResponse(response, employeeResponseEnvelopeSchema);
  }
}
