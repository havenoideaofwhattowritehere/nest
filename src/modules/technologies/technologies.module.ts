import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologyController } from './technologies.controller';
import { TechnologyService } from './technologies.service';
import { Technology } from './entities/technologies.entity';
import { TechnologyRepository } from './technology.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  providers: [TechnologyService, TechnologyRepository],
  controllers: [TechnologyController],
  exports: [TechnologyService],
})
export class TechnologyModule {}
