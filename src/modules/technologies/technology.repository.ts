import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technologies.entity';
import { Repository } from 'typeorm';
import { CreateTechnologyDto } from './dto/createTechnologyDto';
import { UpdateTechnologyDto } from './dto/updateTechnologyDto';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class TechnologyRepository {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}
  async createTechnology(
    createTechnologyDto: CreateTechnologyDto,
  ): Promise<Technology> {
    const technology = this.technologyRepository.create(createTechnologyDto);
    if (!technology) {
      throw new Error('Failed to create technology');
    }
    return await this.technologyRepository.save(technology);
  }

  async getAllTechnologies(): Promise<Technology[]> {
    return await this.technologyRepository.find();
  }

  async getTechnologyById(id: string): Promise<Technology | null> {
    return await this.technologyRepository.findOne({ where: { id } });
  }

  async updateTechnology(
    id: string,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology | null> {
    await this.technologyRepository.update(id, updateTechnologyDto);
    return await this.getTechnologyById(id);
  }

  async deleteTechnology(id: string): Promise<boolean> {
    const deletedRecord = await this.technologyRepository.delete(id);
    if (!deletedRecord.affected) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return true;
  }
}
