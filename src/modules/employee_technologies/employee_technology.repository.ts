import { Employee } from '../employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeTechnologyDto } from './dto/createEmployeeTechnologyDto';
import { UpdateEmployeeTechnologyDto } from './dto/updateEmployeeTechnologyDto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeTechnology } from './entities/employee_technology.entity';
import { Technology } from '../technologies/entities/technologies.entity';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class EmployeeTechnologyRepository {
  constructor(
    @InjectRepository(EmployeeTechnology)
    private readonly employeeTechnologyRepository: Repository<EmployeeTechnology>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createEmployeeTechnology(
    createEmployeeTechnologyDto: CreateEmployeeTechnologyDto,
  ) {
    const existingTechnology = await this.technologyRepository.findOne({
      where: { id: createEmployeeTechnologyDto.technology_id },
    });
    const existingUser = await this.employeeRepository.findOne({
      where: { id: createEmployeeTechnologyDto.employee_id },
    });
    if (!existingUser || !existingTechnology) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    const employeeTechnology = this.employeeTechnologyRepository.create({
      employee: existingUser,
      technology: existingTechnology,
    });
    return await this.employeeTechnologyRepository.save(employeeTechnology);
  }

  async getEmployeeTechnologies(employeeId: string) {
    return await this.employeeTechnologyRepository.findOne({
      where: { employee: { id: employeeId } },
      relations: ['technology'],
    });
  }

  async updateEmployeeTechnology(
    id: string,
    updateEmployeeTechnologyDto: Partial<UpdateEmployeeTechnologyDto>,
  ) {
    await this.employeeTechnologyRepository.update(
      id,
      updateEmployeeTechnologyDto,
    );
    return await this.employeeTechnologyRepository.findOne({ where: { id } });
  }

  async removeEmployeeTechnology(id: string): Promise<boolean> {
    const deletedRecord = await this.employeeTechnologyRepository.delete(id);
    if (!deletedRecord.affected) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return true;
  }
}
