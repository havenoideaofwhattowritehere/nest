import { Injectable } from '@nestjs/common';
import { CreateEmployeeTechnologyDto } from './dto/createEmployeeTechnologyDto';
import { UpdateEmployeeTechnologyDto } from './dto/updateEmployeeTechnologyDto';
import { EmployeeTechnologyRepository } from './employee_technology.repository';

@Injectable()
export class EmployeeTechnologyService {
  constructor(
    private readonly employeeTechnologyRepository: EmployeeTechnologyRepository,
  ) {}

  async createEmployeeTechnology(
    createEmployeeTechnologyDto: CreateEmployeeTechnologyDto,
  ) {
    return this.employeeTechnologyRepository.createEmployeeTechnology(
      createEmployeeTechnologyDto,
    );
  }

  async getEmployeeTechnologies(employeeId: string) {
    return this.employeeTechnologyRepository.getEmployeeTechnologies(
      employeeId,
    );
  }

  async updateEmployeeTechnology(
    id: string,
    updateEmployeeTechnologyDto: Partial<UpdateEmployeeTechnologyDto>,
  ) {
    return this.employeeTechnologyRepository.updateEmployeeTechnology(
      id,
      updateEmployeeTechnologyDto,
    );
  }

  async removeEmployeeTechnology(id: string): Promise<boolean> {
    return this.employeeTechnologyRepository.removeEmployeeTechnology(id);
  }
}
