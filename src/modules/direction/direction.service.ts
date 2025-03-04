import { Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction';
import { DirectionRepository } from './direction.repository';
import { UpdateDirectionDto } from './dto/update-direction';

@Injectable()
export class DirectionService {
  constructor(private readonly directionRepository: DirectionRepository) {}

  async createDirection(createDirectionDto: CreateDirectionDto) {
    return this.directionRepository.createDirection(createDirectionDto);
  }

  async updateDirection(
    id: string,
    updateDirectionDto: Partial<UpdateDirectionDto>,
  ) {
    return this.directionRepository.updateDirection(id, updateDirectionDto);
  }

  async getAllDirections() {
    return this.directionRepository.getDirections();
  }

  async getDirectionById(id: string) {
    return this.directionRepository.getDirection(id);
  }

  async removeDirectionById(id: string) {
    return this.directionRepository.removeDirection(id);
  }
}
