import { Injectable } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ExperienceRepository } from './experience.repository';
import { AddExperienceDto } from './dto/add-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepository: ExperienceRepository) {}

  async getExperienceForEmployee(id: string) {
    return this.experienceRepository.getExperienceForEmployee(id);
  }

  async getExperienceById(id: string) {
    return this.experienceRepository.getExperience(id);
  }

  async addExperience(employee_id: string, addExperienceDto: AddExperienceDto) {
    return this.experienceRepository.addExperience(
      employee_id,
      addExperienceDto,
    );
  }

  async updateExperience(id: string, updateExperienceDto: UpdateExperienceDto) {
    return this.experienceRepository.updateExperience(id, updateExperienceDto);
  }

  async deleteExperience(id: string) {
    return this.experienceRepository.removeExperience(id);
  }
}
