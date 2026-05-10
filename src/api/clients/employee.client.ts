import { APIRequestContext } from '@playwright/test';
import { Employee } from '@/helpers/builders/employee.builder';
import { employeeResponseSchema, EmployeeResponse } from '@/api/schemas/employee.schema';
import { ApiEndpoints } from '@/constants/api-endpoints';
import { BaseApiClient } from './base.client';

export class EmployeeApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async create(employee: Employee): Promise<EmployeeResponse> {
    const response = await this.request.post(ApiEndpoints.pim.employees, {
      data: {
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId: employee.employeeId,
      },
    });
    return this.parseResponse(response, employeeResponseSchema);
  }

  async deleteMultiple(empNumbers: number[]): Promise<void> {
    const response = await this.request.delete(ApiEndpoints.pim.employees, {
      data: { ids: empNumbers },
    });
    if (!response.ok()) {
      throw new Error(`Failed to delete employees [${empNumbers}]: ${response.status()}`);
    }
  }

  async updateName(
    empNumber: number,
    firstName: string,
    lastName: string
  ): Promise<EmployeeResponse> {
    const response = await this.request.put(ApiEndpoints.pim.personalDetails(empNumber), {
      data: { firstName, lastName, middleName: '' },
    });
    return this.parseResponse(response, employeeResponseSchema);
  }

  async getById(empNumber: number): Promise<EmployeeResponse> {
    const response = await this.request.get(ApiEndpoints.pim.employee(empNumber));
    return this.parseResponse(response, employeeResponseSchema);
  }
}
