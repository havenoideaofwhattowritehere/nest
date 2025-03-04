import { Injectable } from '@nestjs/common';
import { CreateProjectHistoryDto } from './dto/create-project-history.dto';
import { UpdateProjectHistoryDto } from './dto/update-project-history.dto';
import { ProjectHistoryRepository } from './projecthistory.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectHistoryRepository: ProjectHistoryRepository,
  ) {}

  async getAllRecords() {
    return this.projectHistoryRepository.getAllRecords();
  }

  async createProjectRecord(createProjectHistoryDto: CreateProjectHistoryDto) {
    return this.projectHistoryRepository.createProjectRecord(
      createProjectHistoryDto,
    );
  }
  async updateProjectRecord(
    record_id: string,
    updateProjectHistoryDto: UpdateProjectHistoryDto,
  ) {
    return this.projectHistoryRepository.updateProjectRecord(
      record_id,
      updateProjectHistoryDto,
    );
  }

  async getProjectsForEmployee(employee_id: string) {
    return this.projectHistoryRepository.getProjectsForEmployee(employee_id);
  }

  async getProjectHistory(project_name: string) {
    return this.projectHistoryRepository.getProjectHistory(project_name);
  }

  async removeProjectRecord(id: string) {
    return this.projectHistoryRepository.removeProjectRecord(id);
  }
}
