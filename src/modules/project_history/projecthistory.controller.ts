import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './projecthistory.service';
import { UpdateProjectHistoryDto } from './dto/update-project-history.dto';
import { CreateProjectHistoryDto } from './dto/create-project-history.dto';

@Controller('project')
export class ProjectHistoryController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllRecords() {
    return this.projectService.getAllRecords();
  }

  @Get(':name')
  async getProjectRecords(@Param('name') project_name: string) {
    return this.projectService.getProjectHistory(project_name);
  }

  @Post()
  async createRecord(@Body() createProjectHistoryDto: CreateProjectHistoryDto) {
    return this.projectService.createProjectRecord(createProjectHistoryDto);
  }

  @Get('/employee/:id')
  async getProjectsHistoryForEmployee(@Param('id') emp_id: string) {
    return this.projectService.getProjectsForEmployee(emp_id);
  }

  @Patch(':id')
  async updateRecord(
    @Param('id') record_id,
    @Body() updateProjectHistoryDto: UpdateProjectHistoryDto,
  ) {
    return this.projectService.updateProjectRecord(
      record_id,
      updateProjectHistoryDto,
    );
  }

  @Delete(':id')
  async removeRecord(@Param('id') record_id: string) {
    return this.projectService.removeProjectRecord(record_id);
  }
}
