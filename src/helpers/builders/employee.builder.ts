import { randomUUID } from 'crypto';
import { CreateEmployeeRequest, createEmployeeRequestSchema } from '@/api/schemas/employee.schema';

export class EmployeeBuilder {
  private request: CreateEmployeeRequest = {
    firstName: 'Test',
    middleName: '',
    lastName: `Employee-${randomUUID().slice(0, 8)}`,
    employeeId: `E${randomUUID().replace(/-/g, '').slice(0, 5)}`,
  };

  withFirstName(firstName: string): this {
    this.request.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.request.lastName = lastName;
    return this;
  }

  withMiddleName(middleName: string): this {
    this.request.middleName = middleName;
    return this;
  }

  withEmployeeId(employeeId: string): this {
    this.request.employeeId = employeeId;
    return this;
  }

  build(): CreateEmployeeRequest {
    return createEmployeeRequestSchema.parse({ ...this.request });
  }
}
