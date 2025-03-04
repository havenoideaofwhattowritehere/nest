import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { ExperienceRepository } from './experience.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, Employee])],
  providers: [ExperienceService, ExperienceRepository],
  controllers: [ExperienceController],
  exports: [ExperienceService],
})
export class ExperienceModule {}
