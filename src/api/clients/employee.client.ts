import { expect } from '@playwright/test';
import {
  Employee,
  CreatedEmployee,
  CreateEmployeeRequest,
  UpdateEmployeeNameRequest,
  employeeResponseEnvelopeSchema,
  createdEmployeeEnvelopeSchema,
} from '@/api/schemas/employee.schema';
import { ApiEndpoints } from '@/constants/api-endpoints';
import { ApiError } from '@/api/api-error';
import { step } from '@/core/step';
import { BaseApiClient } from './base.client';

export class EmployeeApiClient extends BaseApiClient {
  readonly expect = new EmployeeExpectations();

  async create(request: CreateEmployeeRequest): Promise<CreatedEmployee> {
    const response = await this.request.post(ApiEndpoints.pim.employees, { data: request });
    return this.parseResponse(response, createdEmployeeEnvelopeSchema);
  }

  async deleteMultiple(empNumbers: number[]): Promise<void> {
    const response = await this.request.delete(ApiEndpoints.pim.employees, {
      data: { ids: empNumbers },
    });
    if (!response.ok()) {
      const body = await response.text().catch(() => '<unreadable body>');
      throw new ApiError(response.status(), response.url(), body);
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

export class EmployeeExpectations {
  async toBeValidCreatedEmployee(employee: CreatedEmployee): Promise<void> {
    await step('Verify created employee structure', async () => {
      expect(employee.empNumber, 'empNumber should be a positive number').toBeGreaterThan(0);
      expect(employee.employeeId, 'employeeId should match format E#####').toMatch(
        /^E[a-f0-9]{5}$/
      );
    });
  }

  async toHaveDetails(actual: Employee, expected: Partial<Employee>): Promise<void> {
    await step('Verify employee details', async () => {
      if (expected.firstName !== undefined) {
        expect(actual.firstName, 'First name should match').toBe(expected.firstName);
      }
      if (expected.lastName !== undefined) {
        expect(actual.lastName, 'Last name should match').toBe(expected.lastName);
      }
    });
  }
}
