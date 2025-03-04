import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direction } from './entities/direction.entity';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';
import { DirectionRepository } from './direction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  exports: [DirectionService, DirectionRepository],
  providers: [DirectionService],
  controllers: [DirectionController],
})
export class DirectionModule {}
