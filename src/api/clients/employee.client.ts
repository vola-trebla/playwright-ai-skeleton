import { APIRequestContext } from '@playwright/test';
import { Employee } from '../../helpers/builders/employee.builder';
import { employeeResponseSchema, EmployeeResponse } from '../schemas/employee.schema';

export class EmployeeApiClient {
  private readonly baseUrl = '/web/index.php/api/v2';

  constructor(private readonly request: APIRequestContext) {}

  async create(employee: Employee): Promise<EmployeeResponse> {
    const response = await this.request.post(`${this.baseUrl}/pim/employees`, {
      data: {
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        employeeId: employee.employeeId,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to create employee: ${response.status()} ${await response.text()}`);
    }

    const body = await response.json();
    return employeeResponseSchema.parse(body).data;
  }

  async delete(empNumber: number): Promise<void> {
    const response = await this.request.delete(`${this.baseUrl}/pim/employees`, {
      data: { ids: [empNumber] },
    });

    if (!response.ok()) {
      throw new Error(`Failed to delete employee ${empNumber}: ${response.status()}`);
    }
  }

  async getById(empNumber: number): Promise<EmployeeResponse> {
    const response = await this.request.get(`${this.baseUrl}/pim/employees/${empNumber}`);

    if (!response.ok()) {
      throw new Error(`Failed to get employee ${empNumber}: ${response.status()}`);
    }

    const body = await response.json();
    return employeeResponseSchema.parse(body).data;
  }
}
