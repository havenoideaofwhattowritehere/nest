import { CreateProjectHistoryDto } from './dto/create-project-history.dto';
import { UpdateProjectHistoryDto } from './dto/update-project-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectHistory } from './entities/project-history.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class ProjectHistoryRepository {
  constructor(
    @InjectRepository(ProjectHistory)
    private readonly projectRepository: Repository<ProjectHistory>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getAllRecords() {
    return await this.projectRepository.find();
  }

  async createProjectRecord(createProjectHistoryDto: CreateProjectHistoryDto) {
    const flag = await this.employeeExists(createProjectHistoryDto.employee_id);
    if (!flag) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    const record = this.projectRepository.create(createProjectHistoryDto);
    if (!record) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return await this.projectRepository.save(record);
  }

  async getProjectsForEmployee(emp_id: string) {
    return await this.projectRepository.find({ where: { id: emp_id } });
  }

  async getProjectHistory(project_name: string) {
    return await this.projectRepository.findOne({
      where: { project_name: project_name },
    });
  }

  async updateProjectRecord(
    record_id: string,
    updateProjectHistoryRecordDto: Partial<UpdateProjectHistoryDto>,
  ) {
    return await this.projectRepository.update(
      record_id,
      updateProjectHistoryRecordDto,
    );
  }

  async removeProjectRecord(id: string) {
    const deletedRecord = await this.projectRepository.delete(id);
    if (!deletedRecord.affected) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return true;
  }

  private async employeeExists(employee_id: string) {
    const emp = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    return emp !== null;
  }
}
