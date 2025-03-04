import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.createEmployee(createEmployeeDto);
  }

  async getEmployees() {
    return this.employeeRepository.getEmployees();
  }

  async getEmployee(employee_id: string) {
    return this.employeeRepository.getEmployee(employee_id);
  }

  async getEmployeeExperience(employee_id: string) {
    return this.employeeRepository.getEmployeeExperience(employee_id);
  }

  async updateEmployee(
    employeeId: string,
    updateEmployeeDto: Partial<UpdateEmployeeDto>,
  ) {
    return this.employeeRepository.updateEmployee(
      employeeId,
      updateEmployeeDto,
    );
  }

  async removeEmployee(employeeId: string) {
    return this.employeeRepository.removeEmployee(employeeId);
  }
}
