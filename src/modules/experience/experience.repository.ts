import { Experience } from './entities/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { AddExperienceDto } from './dto/add-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class ExperienceRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async getExperienceForEmployee(employee_id: string) {
    return await this.experienceRepository.findOne({
      where: { id: employee_id },
      relations: ['experiences'],
    });
  }

  async getExperience(experience_id: string) {
    return await this.experienceRepository.findOne({
      where: { id: experience_id },
    });
  }

  async addExperience(employee_id: string, addExperienceDto: AddExperienceDto) {
    const flag = await this.employeeAndExperienceExist(
      employee_id,
      addExperienceDto,
    );
    if (!flag) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    const experience = this.experienceRepository.create(addExperienceDto);
    if (!experience) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    return await this.experienceRepository.save(experience);
  }

  async updateExperience(
    employee_id: string,
    updateExperienceDto: Partial<UpdateExperienceDto>,
  ) {
    const experienceExists = await this.experienceRepository.findOne({
      where: { id: updateExperienceDto.id },
    });
    const employeeExists = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    if (
      !experienceExists ||
      !employeeExists ||
      updateExperienceDto.id === undefined
    ) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    await this.experienceRepository.update(
      updateExperienceDto.id,
      updateExperienceDto,
    );
  }

  async removeExperience(exp_id: string) {
    const deletedObject = await this.experienceRepository.delete(exp_id);
    if (!deletedObject.affected) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return true;
  }

  private async employeeAndExperienceExist(
    employee_id: string,
    addExperienceDto: AddExperienceDto,
  ): Promise<boolean> {
    const experienceExists = await this.experienceRepository.findOne({
      where: { id: addExperienceDto.employee_id },
    });
    const employeeExists = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });
    return experienceExists !== null && employeeExists !== null;
  }
}
