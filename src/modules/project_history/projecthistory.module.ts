import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectHistory } from './entities/project-history.entity';
import { ProjectService } from './projecthistory.service';
import { ProjectHistoryController } from './projecthistory.controller';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { ProjectHistoryRepository } from './projecthistory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectHistory, Employee])],
  providers: [ProjectService, ProjectHistoryRepository],
  controllers: [ProjectHistoryController],
  exports: [ProjectService],
})
export class ProjectHistoryModule {}
