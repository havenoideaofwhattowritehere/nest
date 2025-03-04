import { Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/createTechnologyDto';
import { UpdateTechnologyDto } from './dto/updateTechnologyDto';
import { TechnologyRepository } from './technology.repository';

@Injectable()
export class TechnologyService {
  constructor(private readonly technologyRepository: TechnologyRepository) {}

  async createTechnology(createTechnologyDto: CreateTechnologyDto) {
    return this.technologyRepository.createTechnology(createTechnologyDto);
  }

  async getTechnologies() {
    return this.technologyRepository.getAllTechnologies();
  }

  async getTechnologyById(id: string) {
    return this.technologyRepository.getTechnologyById(id);
  }

  async updateTechnology(id: string, updateTechnologyDto: UpdateTechnologyDto) {
    return this.technologyRepository.updateTechnology(id, updateTechnologyDto);
  }

  async deleteTechnology(id: string) {
    return this.technologyRepository.deleteTechnology(id);
  }
}
