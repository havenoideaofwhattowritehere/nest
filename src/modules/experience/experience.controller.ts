import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { AddExperienceDto } from './dto/add-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('/employee/:id')
  async getExperiences(@Param('id') employee_id: string) {
    return this.experienceService.getExperienceForEmployee(employee_id);
  }
  @Get(':id')
  async getExperience(@Param('id') exp_id: string) {
    return this.experienceService.getExperienceById(exp_id);
  }

  @Post()
  async addExperience(@Body() addExperienceDto: AddExperienceDto) {
    return this.experienceService.addExperience(addExperienceDto.employee_id, {
      ...addExperienceDto,
    });
  }

  @Patch('/employee/:id')
  async updateExperience(
    @Param('id') emp_id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(emp_id, updateExperienceDto);
  }

  @Delete(':id')
  async removeExperience(@Param('id') exp_id: string) {
    return this.experienceService.deleteExperience(exp_id);
  }
}
