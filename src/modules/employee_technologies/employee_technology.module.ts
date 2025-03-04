import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTechnologyService } from './employee_technology.service';
import { EmployeeTechnologyController } from './employee_technology.controller';
import { EmployeeTechnology } from './entities/employee_technology.entity';
import { Technology } from 'src/modules/technologies/entities/technologies.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { EmployeeTechnologyRepository } from './employee_technology.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeTechnology, Technology, Employee]),
  ],
  controllers: [EmployeeTechnologyController],
  providers: [EmployeeTechnologyService, EmployeeTechnologyRepository],
  exports: [EmployeeTechnologyService],
})
export class EmployeeTechnologyModule {}
