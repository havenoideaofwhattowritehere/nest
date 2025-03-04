import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    if (!employee) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    return await this.employeeRepository.save(employee);
  }

  async getEmployees() {
    return await this.employeeRepository.find();
  }

  async getEmployee(employee_id: string) {
    return await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
  }

  async getEmployeeExperience(employee_id: string) {
    return await this.employeeRepository.findOne({
      where: { id: employee_id },
      select: ['experiences'],
    });
  }

  async updateEmployee(
    employeeId: string,
    updateEmployeeDto: Partial<UpdateEmployeeDto>,
  ) {
    const existingUser = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!existingUser) {
      throw new BadRequestException(ErrorMap.USER_NOT_FOUND);
    }
    await this.employeeRepository.update(employeeId, updateEmployeeDto);
    return await this.employeeRepository.findOne({ where: { id: employeeId } });
  }

  async removeEmployee(employeeId: string) {
    const deletedObject = await this.employeeRepository.delete(employeeId);
    if (!deletedObject.affected) {
      throw new Error('User was not removed');
    }
    return true;
  }

  async userExists(employee_id: string) {
    const existingUser = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    if (!existingUser) {
      return false;
    }
    return true;
  }
}
