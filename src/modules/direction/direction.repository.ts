import { Direction } from './entities/direction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDirectionDto } from './dto/create-direction';
import { UpdateDirectionDto } from './dto/update-direction';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class DirectionRepository {
  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ) {}

  async createDirection(createDirectionDto: CreateDirectionDto) {
    const duplicate = await this.directionRepository.findOneBy({
      name: createDirectionDto.name,
    });
    if (duplicate) {
      throw new BadRequestException(ErrorMap.DIRECTION_EXISTS);
    }
    const direction = this.directionRepository.create(createDirectionDto);
    if (!direction) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    return await this.directionRepository.save(direction);
  }

  async updateDirection(
    id: string,
    updateDirectionDto: Partial<UpdateDirectionDto>,
  ) {
    const direction = await this.directionRepository.update(
      id,
      updateDirectionDto,
    );
    if (!direction) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return await this.directionRepository.findOneBy({ id });
  }

  async getDirections() {
    return await this.directionRepository.find();
  }

  async getDirection(id: string) {
    return await this.directionRepository.findOneBy({ id });
  }

  async removeDirection(id: string) {
    const deleted = await this.directionRepository.delete(id);
    return deleted.affected;
  }
}
